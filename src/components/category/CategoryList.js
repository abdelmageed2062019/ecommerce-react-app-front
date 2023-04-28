import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    getCategories().then((c) => {
      setLoading(false);
      setCategories(c.data);
    });
  };

  const showCategory = () =>
    categories.map((c) => (
      <Link
        to={`/category/${c.slug}`}
        style={{ textDecoration: "none" }}
        key={c._id}
        className="col btn btn-outline-info waves-effect btn-block btn-raised m-2"
      >
        {c.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showCategory()}
      </div>
    </div>
  );
};

export default CategoryList;
