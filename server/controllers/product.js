const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    req.body.slug = slugify(req.body.title);
    res.json(await new Product(req.body).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};

exports.read = async (req,res) => {
  const data = await Product.find({});
  res.json(data);
}