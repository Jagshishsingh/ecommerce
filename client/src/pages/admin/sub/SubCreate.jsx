import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createSub,
  getSub,
  removeSub,
  getSubs
} from "../../../functions/sub";
import { getCategories } from '../../../functions/category';
import { CategoryForm, LocalSearch } from '../../../components/forms';


const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('')
  const [subs, setSubs] = useState([]);

  useEffect(async() => {
    await loadCategories();
    await loadSubs();
    
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadSubs = () =>
    getSubs().then((sub) => setSubs(sub.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        loadSubs();
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadSubs();
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create Sub category</h4>
          )}
          <div className="form-group">
            <label>Category</label>
            <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
              <option value="">Select One</option>
              {categories.length > 0 &&
                categories.map((category) =>
                  (<option key={category._id} value={category._id}>{category.name}</option>))}
            </select>
          </div>
          {category}
          <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />
          <hr />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            
          {subs.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-secondary" key={sub._id}>
              {sub.name}
              <span
                onClick={() => handleRemove(sub.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${sub.slug}`}>
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
