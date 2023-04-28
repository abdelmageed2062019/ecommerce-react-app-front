import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);

    count === 0 && navigate("/");

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirect in {count} second</p>
      <LoadingOutlined />
    </div>
  );
};

export default LoadingToRedirect;
