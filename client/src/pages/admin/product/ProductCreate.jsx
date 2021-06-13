import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import {ProductCreateForm} from '../../../components/forms';

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const loadCategories = () => {
    getCategories()
    .then((res) => setValues({...values,categories : res.data}))
  }
  useEffect(()=>{
    loadCategories();
  },[]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success('product created');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleCategoryChange = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues({...values,subs:[],category:e.target.value})
    getCategorySubs(e.target.value)
    .then((res) =>{
      console.log(res);
      setSubOptions(res.data);
      setShowSubs(true);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        
            <ProductCreateForm handleChange = {handleChange} handleSubmit={handleSubmit} 
            handleCategoryChange = {handleCategoryChange} showSubs = {showSubs} subOptions = {subOptions}
            values={values}
            setValues={setValues}/>
        </div>
    </div>

  );
};

export default ProductCreate;
