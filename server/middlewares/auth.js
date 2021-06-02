const admin = require('../firebase'); 
const authCheck = (req,res,next) => {
    next();

}

module.exports = authCheck;