import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const { user } = useSelector((state) => {
    return { ...state };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) {
          toast.error(error.response.data);
        }
      });
  };

  const handleDelete = async (slug) => {
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (cat) =>
    cat.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((c) => (
            <div key={c._id} className="alert alert-primary">
              {c.name}
              <span
                onClick={() => handleDelete(c.slug)}
                className="btn btn-sm float-right text-danger"
              >
                <DeleteOutlined />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
