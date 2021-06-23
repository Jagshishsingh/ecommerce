const express = require('express');
const router = express.Router();

const {create, listAll, remove, read, update, list, productsCount} = require('../controllers/product');
const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/product',authCheck,adminCheck,create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.get("/product/:slug", read);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

module.exports = router;