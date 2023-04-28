import { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";
import { Menu, Slider, Checkbox, Radio, Badge } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  BgColorsOutlined,
  RocketOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const formatter = (value) => `$${value}`;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, stLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState();
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [shipping, setShipping] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, [text]);

  const loadAllProducts = () => {
    stLoading(true);
    getProductsByCount(20).then((p) => {
      setProducts(p.data);
      stLoading(false);
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts({ price: price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setBrand("");
    setSub("");
    setStar("");
    setColor("");
    setShipping("");

    // console.log(e.target.value, e.target.checked);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInState = inTheState.indexOf(justChecked);

    if (foundInState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setSub("");
    setColor("");
    setShipping("");

    setStar(num);
    fetchProducts({ stars: num });
  };

  const handleSubmit = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");

    setSub(sub);
    fetchProducts({ sub: sub });
  };

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub([]);
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub([]);
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub([]);
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const showCategories = () =>
    categories.map((c) => (
      <Item key={c._id} style={{ padding: "0" }}>
        <Checkbox
          onChange={handleCheck}
          className="p-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </Item>
    ));

  const showStars = () => (
    <>
      <Item key="a" className="pl-4 pr-4 ">
        <Star starClick={handleStarClick} numberOfStars={5} />
      </Item>
      <Item key="b" className="pl-4 pr-4 ">
        <Star starClick={handleStarClick} numberOfStars={4} />
      </Item>
      <Item key="c" className="pl-4 pr-4 ">
        <Star starClick={handleStarClick} numberOfStars={3} />
      </Item>
      <Item key="d" className="pl-4 pr-4 ">
        <Star starClick={handleStarClick} numberOfStars={2} />
      </Item>
      <Item key="e" className="pl-4 pr-4 ">
        <Star starClick={handleStarClick} numberOfStars={1} />
      </Item>
    </>
  );

  const showSubs = () =>
    subs.map((s) => (
      <span
        key={s._id}
        onClick={() => handleSubmit(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </span>
    ));

  const showBrands = () =>
    brands.map((b, i) => (
      <Item key={i + 10}>
        <Radio value={b} name={b} checked={b === brand} onChange={handleBrand}>
          {b}
        </Radio>
      </Item>
    ));

  const showColors = () =>
    colors.map((c, i) => (
      <Item key={i + 20}>
        <Radio value={c} name={c} checked={c === color} onChange={handleColor}>
          {c} <Badge color={c} style={{ float: "left", padding: " 0 10px" }} />
        </Radio>
      </Item>
    ));

  const showShipping = () => (
    <Item key="yes-no">
      <Checkbox
        onChange={handleShipping}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        onChange={handleShipping}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </Item>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <Item style={{ padding: "0" }} key="slider">
                <Slider
                  className="ml-4 mr-4"
                  tooltip={{ formatter }}
                  range
                  value={price}
                  onChange={handleSlider}
                  label="price"
                  max={10000}
                />
              </Item>
            </SubMenu>

            {/* categories */}
            <SubMenu
              key="2"
              title={
                <span>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              {showCategories()}
            </SubMenu>

            {/* ratings */}
            <SubMenu
              key="3"
              title={
                <span>
                  <StarOutlined /> Rating
                </span>
              }
            >
              {showStars()}
            </SubMenu>

            {/* subs */}
            <SubMenu
              key="4"
              title={
                <span>
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div className="pl-4 pr-4 pt-4"> {showSubs()}</div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span>
                  <LaptopOutlined /> Brands
                </span>
              }
            >
              {showBrands()}
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span>
                  <BgColorsOutlined /> Colors
                </span>
              }
            >
              {showColors()}
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span>
                  <RocketOutlined /> Shipping
                </span>
              }
            >
              {showShipping()}
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
