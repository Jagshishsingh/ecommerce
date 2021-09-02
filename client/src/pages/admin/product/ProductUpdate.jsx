import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { ProductUpdateForm, FileUpload } from '../../../components/forms';


const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Silver", "White", "Grey"],
    brands: ["Apple", "HP", "Microsoft"],
    color: "",
    brand: "",
};

const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;
    const loadCategories = () => {
        getCategories()
            .then((res) => setCategories(res.data));
    }
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
    };

    const loadProduct = () => {
        getProduct(slug).then(async (p) => {
            console.log("single product", p.data);
            // setValues({ ...values, ...p.data });
            const subIds = await p.data.subs.map((sub) => sub._id);

            setValues({ ...values, ...p.data, subs: subIds });
            // console.log(values);

            getCategorySubs(p.data.category._id)
                .then((res) => {
                    // console.log("SUB", res);
                    setSubOptions(res.data);
                })
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
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value)
            .then((res) => {
                console.log("SUB", res);
                setSubOptions(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Product update</h4>

                    )}
                    <hr />
                    {/* {values.subs} */}
                    {/* {JSON.stringify(values.images)} */}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    {/* <FileUpload/> */}
                    <ProductUpdateForm handleChange={handleChange} handleSubmit={handleSubmit}
                        handleCategoryChange={handleCategoryChange}
                        values={values}
                        categories={categories}
                        setValues={setValues}
                        subOptions={subOptions} />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
