import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "./../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete registeration.`
    );
    window.localStorage.setItem("emailforRegisteration", email);
    setEmail("");
  };

  const { user } = useSelector((state) => {
    return { ...state };
  });

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
