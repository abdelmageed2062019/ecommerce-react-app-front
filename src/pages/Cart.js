import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userCart } from "../functions/user";

import ProductCartInCheckout from "../components/cards/ProductCartInCheckout";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart, COD } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((curr, next) => {
      return curr + next.count * next.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart post res", res.data.ok);
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart post res", res.data.ok);
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => (
    <table className="table table-ordered table-fixed">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((product) => (
        <ProductCartInCheckout key={product._id} product={product} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4> Cart/ {cart.length} Product</h4>

          {!cart.length ? (
            <h4>
              No products added. <Link to="/shop">Continue Shopping.</Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                ({c.title}) x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mb-2"
                disabled={!cart.length}
              >
                Process to checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mb-2"
                disabled={!cart.length}
              >
                Pay cash on delivery
              </button>
            </>
          ) : (
            <Link
              to={navigate("/login", { state: { from: "/cart" } })}
              className="btn btn-sm btn-primary mb-2"
            >
              login to checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
