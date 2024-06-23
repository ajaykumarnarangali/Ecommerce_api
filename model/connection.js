const mongoose=require('mongoose');


const connection=async()=>{
    try {

        await mongoose.connect('mongodb://0.0.0.0:27017/e_commerce');
        console.log("database connection success");
        
    } catch (error) {
        console.log("connection failed");
    }
}

module.exports={connection}