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

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
