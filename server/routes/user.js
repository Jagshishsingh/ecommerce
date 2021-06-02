const express = require("express");
const router = express.Router();
const {createOrUpdateUser} = require('../controllers/user');


router.get("/user", createOrUpdateUser);

module.exports = router;
