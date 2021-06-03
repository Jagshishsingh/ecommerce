const express = require("express");
const router = express.Router();

const authCheck = require('../middlewares/auth');
const {createOrUpdateUser, currentUser} = require('../controllers/user');

router.post("/create-or-update-user", authCheck,createOrUpdateUser);
router.post("/current-user", authCheck,currentUser);

module.exports = router;
