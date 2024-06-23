const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { connection } = require('./model/connection');
const cookieParser=require('cookie-parser');

const authRouter = require('./router/authRouter');
const userRouter=require('./router/userRouter');
const productRouter=require('./router/productRouter');
const cartRouter=require('./router/cartRouter');

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "internal server error",
        success: false,
        error: true
    })
})


connection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server running successfully");
})