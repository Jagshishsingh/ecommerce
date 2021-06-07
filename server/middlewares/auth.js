const admin = require('../firebase'); 
const User = require('../models/user');

exports.authCheck = async (req,res,next) => {
    // console.log(req.headers);
    try{
        const firebaseUser = await admin.auth()
        .verifyIdToken(req.headers.authtoken);
        // console.log(firebaseUser);
        req.user = firebaseUser;
        next();
    }
    catch(err){
        res.status(401).json({
            err:"Invalid token"
        });
        console.log('EERROR: ',err);
    }

}

exports.adminCheck = async (req,res,next) => {
    const data = await User.findOne({email:req.user.email},{role:1});
    console.log(data.role);
    if (data.role !== 'admin'){
        res.status(403).json({
            err:'Admin resource. Access denied'
        });
    }else{
        next()
    }
} 

