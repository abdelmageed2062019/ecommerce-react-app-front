import { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import Labtop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const items = [
    {
      key: "1",
      label: `Description`,
      children: `${product.description && product.description}`,
    },
    {
      key: "2",
      label: `More`,
      children: `Call use on xxx xxxxxxxx to learn more about this product.`,
    },
  ];

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {product.images && product.images.length ? (
          <Carousel autoPlay infiniteLoop autoFocus showStatus={false}>
            {product.images &&
              product.images.map((image) => (
                <img src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card cover={<img src={Labtop} className="mb-3" />} />
        )}

        <Tabs type="card" items={items} />
      </div>

      <div className="col-md-5">
        <h1
          className="p-3 text-center"
          style={{
            background: "#d9d9d9",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {product.title}
        </h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet.</div>
        )}

        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-success" /> <br /> Add
                  to cart
                </a>
              </Tooltip>
            </>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Withlist
            </a>,
            <RatingModal>
              <StarRating
                name={product._id}
                numberOfStars={5}
                rating={star}
                isSelectable={true}
                starRatedColor="red"
                changeRating={onStarClick}
              ></StarRating>
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
