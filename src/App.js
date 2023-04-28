import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import SideDrawer from "./components/drawer/SideDrawer";

// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import History from "./pages/user/History";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";

// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";

// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";

// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";

// use lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
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
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ React Redux EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >
      <Router>
        <SideDrawer />
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route exact path="/product/:slug" element={<Product />} />
          <Route exact path="/category/:slug" element={<CategoryHome />} />
          <Route exact path="/sub/:slug" element={<SubHome />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/payment" element={<Payment />} />

          <Route
            path="/user/history"
            element={
              <UserRoute>
                <History />
              </UserRoute>
            }
          />
          <Route
            path="/user/password"
            element={
              <UserRoute>
                <Password />
              </UserRoute>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <UserRoute>
                <Wishlist />
              </UserRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/category"
            element={
              <AdminRoute>
                <CategoryCreate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/category/:slug"
            element={
              <AdminRoute>
                <CategoryUpdate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/sub"
            element={
              <AdminRoute>
                <SubCreate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/sub/:slug"
            element={
              <AdminRoute>
                <SubUpdate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/product"
            element={
              <AdminRoute>
                <ProductCreate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/product/:slug"
            element={
              <AdminRoute>
                <ProductUpdate />
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/coupon"
            element={
              <AdminRoute>
                <CreateCouponPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
