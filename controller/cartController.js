const Cart=require('../model/cartSchema');
const {errorHandler}=require('../utils/errorHandler');
const mongoose=require('mongoose');

module.exports.addToCart=async(req,res,next)=>{
    try {

        const userId=req.user.id;
        const {productId}=req.body;

        const isAlreadyInCart=await Cart.findOne({userId,productId});

        if(isAlreadyInCart){
            return next(errorHandler(401,"Product already in cart"));
        }

        const newCart=new Cart({
            userId,productId,quantity:1
        })
        await newCart.save();

        res.status(201).json({message:"Product added to cart"});
        
    } catch (error) {
        next(error);
    }
}

module.exports.getCartCount=async(req,res,next)=>{
    try {
        const userId=req.user.id;

        const cartCount=await Cart.countDocuments({userId});

        res.status(200).json({count:cartCount});
        
    } catch (error) {
        next(error);
    }
}

module.exports.getUserCart=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const cartItems=await Cart.find({userId}).populate("productId");
        res.status(200).json({cart:cartItems});
        
    } catch (error) {
        next(error);
    }
}

module.exports.IncreaseQuantity=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const productId=req.params.id;
        
        const cartItem=await Cart.findOne({userId,productId}).populate("productId");

        cartItem.quantity++;
        await cartItem.save();

        res.status(200).json({cartItem});

    } catch (error) {
        next(error);
    }
}

module.exports.DecreaseQuantity=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const productId=req.params.id;
        
        const cartItem=await Cart.findOne({userId,productId}).populate("productId");

        if(cartItem.quantity>1){
            cartItem.quantity--;
        }
        await cartItem.save();

        res.status(200).json({cartItem});
        
    } catch (error) {
        next(error);
    }
}

module.exports.removeItem=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const productId=req.params.id;

        const cartItem=await Cart.findOne({userId,productId:new mongoose.Types.ObjectId(productId)});

        await cartItem.deleteOne();

        res.status(200).json({message:"product removed from cart"});
        
    } catch (error) {
        next(error);
    }
}