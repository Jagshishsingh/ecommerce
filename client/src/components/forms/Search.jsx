import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from 'antd';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // const [form] = Form.useForm();

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <Form name="search_form" layout="inline" onFinish={handleSubmit} className="form-inline" >
      {/* <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}> */}
      <Form.Item>
        <Input style={{ width: 400 }}
          size="large"
          onChange={handleChange}
          type="search"
          value={text}
          className="form-control mr-sm-2"
          placeholder="Search"
        />
      </Form.Item>
      <Form.Item>
        <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer",fontSize: '150%' }}/>
        {/* </form> */}
      </Form.Item>
    </Form>
  );
};

export default Search;
