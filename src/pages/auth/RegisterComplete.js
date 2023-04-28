import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "./../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({}) => {
  const [email, setEmail] = useState("abdelmageedhamdi@gmail.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailforRegisteration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required");
    }
    try {
      const res = await signInWithEmailLink(auth, email, window.location.href);

      if (res.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailforRegisteration");
        //get user id token
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        //store redux

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
        //redirect
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { user } = useSelector((state) => {
    return { ...state };
  });

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Please enter your password"
      />
      <br />

      <button type="submit" className="btn btn-raised">
        Complete Registeration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
