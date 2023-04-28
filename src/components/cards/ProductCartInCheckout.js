import ModalImage from "react-modal-image";
import labtop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCartInCheckout = ({ product }) => {
  const { title, images, count, price, color, brand, shipping, _id, quantity } =
    product;
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === _id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > quantity) {
      toast.error(`Max available quantity: ${quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == _id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === _id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {images.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={labtop} large={labtop} />
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>{price}</td>
        <td>{brand}</td>
        <td>
          <select
            name="color"
            id=""
            onChange={(e) => handleColorChange(e)}
            className="form-control"
          >
            {color ? (
              <option value={color}>{color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center" style={{ width: "10%" }}>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleCountChange}
          />
        </td>
        <td className="text-center ">
          {shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            className="text-danger pointer"
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;
