import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "./../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "antd";
import { MailOutlined, SyncOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const centerBtn = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const roleBaseRedirect = (res) => {
    const intended = location.state;
    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBaseRedirect(res);
        })
        .catch((error) => console.log(error));

      // navigate("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, provider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBaseRedirect(res);
          })
          .catch();
        // navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const { user } = useSelector((state) => {
    return { ...state };
  });

  useEffect(() => {
    const intended = location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) {
        navigate("/");
      }
    }
  }, [user]);

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
          autoFocus
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
        style={centerBtn}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">
              Loading <SyncOutlined spin />
            </h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="primary"
            className="mb-3"
            danger
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            disabled={!email || password.length < 6}
            style={centerBtn}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forget Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
