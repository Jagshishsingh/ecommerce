import React from 'react'
import { Select } from "antd";
const { Option } = Select;


const ProductUpdateForm = (props) => {

    const { handleChange, handleSubmit, handleCategoryChange, values, setValues, categories, subOptions } = props;
    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;

    return (
        <form onSubmit={handleSubmit} onKeyPress={(e) => { e.key === "Enter" && e.preventDefault() }}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    value={shipping}
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Color</label>
                <select
                    name="color"
                    className="form-control"
                    value={color}
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <select
                    name="brand"
                    className="form-control"
                    value={brand}
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Category</label>
                <select name="category" value={category._id} className="form-control" onChange={handleCategoryChange}>
                    <option value="">Select One</option>
                    {categories.length > 0 &&
                        categories.map((category) =>
                            (<option key={category._id} value={category._id}>{category.name}</option>))}
                </select>
            </div>
            <div>
                <label>Sub Categories</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                >
                    {subOptions.length &&
                        subOptions.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>

            <br />

            <button className="btn btn-outline-info">Save</button>
        </form>
    )
}

export default ProductUpdateForm

