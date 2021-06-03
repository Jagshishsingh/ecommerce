const admin = require('../firebase'); 
const authCheck = async (req,res,next) => {
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

module.exports = authCheck;