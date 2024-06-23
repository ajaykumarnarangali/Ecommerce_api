const jwt=require('jsonwebtoken');

const generateToken=(user,res)=>{
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.secret);
    res.cookie("access_token",token,{
        maxAge:3600000 
    });
}

module.exports={generateToken}