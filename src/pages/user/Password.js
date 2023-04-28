import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updatePassword(auth.currentUser, password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Passwrod updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-2"
          placeholder="Enter New Password"
          disabled={loading}
        />
        <div class="form-text">never share your password with anyone else.</div>
        <button
          className="btn btn-primary mt-4"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col p-3">
          {loading ? (
            <h4 className="text-danger">
              Loading <SyncOutlined spin />
            </h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
