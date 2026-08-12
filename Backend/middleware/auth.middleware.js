const jwt = require("jsonwebtoken");

const auth = async(req, res, next)=>{
    const header = req.header("authorization");

    //token missing
    if(!header){
        return res.status(400).json({message:"Token Missing"});
    }

    const token = header.split(" ")[1];
    try{
        //verifying the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(400).json({mesdsage:"Invalid Token"});
    }
}
module.exports = {auth};