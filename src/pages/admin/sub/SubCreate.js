import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";

import { createSub, getSubs, removeSub } from "../../../functions/sub";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((sub) => setSubs(sub.data));

  const { user } = useSelector((state) => {
    return { ...state };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
            <h4>Create Sub Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>

              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <hr />
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((s) => (
            <div key={s._id} className="alert alert-primary">
              {s.name}
              <span
                onClick={() => handleDelete(s.slug)}
                className="btn btn-sm float-right text-danger"
              >
                <DeleteOutlined />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
