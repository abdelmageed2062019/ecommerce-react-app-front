import { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => {
    return { ...state };
  });
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login", { state: { from: `/product/${slug}` } });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "leave rating" : "Login to leave rating"}
      </div>

      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review, it will apper soon.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
