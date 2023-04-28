import { Link } from "react-router-dom";
import { Badge } from "antd";

const ProductListItems = ({ product }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right">
          ${product.price}
        </span>
      </li>

      {product.category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/category/${product.category.slug}`}
            className="label label-default label-pill pull-xs-right"
            style={{ textDecoration: "none" }}
          >
            {product.category.name}
          </Link>
        </li>
      )}

      {product.subs && (
        <li className="list-group-item">
          Sub Categories
          {product.subs.map((sub) => (
            <Link
              key={sub._id}
              to={`/sub/${sub.slug}`}
              className="label label-default label-pill pull-xs-right"
              style={{ textDecoration: "none" }}
            >
              {sub.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {product.shipping}
        </span>
      </li>

      <li className="list-group-item">
        Brand
        <span className="label label-default label-pill pull-xs-right">
          {product.brand}
        </span>
      </li>

      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {product.color}
          {"   "}
          <Badge
            color={product.color}
            style={{ marginRight: "-2rem" }}
            className="shadow"
          />
        </span>
      </li>

      <li className="list-group-item">
        Available
        <span className="label label-default label-pill pull-xs-right">
          {product.quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {product.sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
