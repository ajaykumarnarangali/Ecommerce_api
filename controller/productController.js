const Product = require('../model/productSchema');
const { errorHandler } = require('../utils/errorHandler');

module.exports.addProduct = async (req, res, next) => {
    try {

        if (!req.user.isAdmin) {
            return next(errorHandler(401, "admin can only add product"));
        }

        const { productName, brandName, category, description, productImage, price, sellingPrice } = req.body;

        if (!productName || !brandName || !category || !description || !price || !sellingPrice) {
            return next(errorHandler(401, "enter all the fields"));
        }

        const product = new Product({
            productName,
            brandName,
            category,
            description,
            price,
            sellingPrice,
            productImage: [...productImage]
        });

        await product.save();

        res.status(200).json({ product });

    } catch (error) {
        next(error);
    }
}

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            ...(req.query.id && { _id: req.query.id }),
            ...(req.query.searchTerm &&
                {
                    $or:[
                        {productName:{$regex:req.query.searchTerm,$options:'i'}},
                        {brandName:{$regex:req.query.searchTerm,$options:'i'}}
                    ]
                }
            ),
            ...(req.query.category && { category: req.query.category })
        }).sort({ createdAt: -1 });
        res.status(200).json({ products });

    } catch (error) {
        next(error);
    }
}

module.exports.editProduct = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(401, "you are not an admin");
        }
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return next(401, "product not found");
        }

        await Product.findByIdAndUpdate(id, {
            $set: {
                productName: req.body.productName,
                brandName: req.body.brandName,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                sellingPrice: req.body.sellingPrice,
                productImage: [...req.body.productImage]
            }
        }, { new: true });

        res.status(200).json({ message: "update product successfully" });

    } catch (error) {
        next(error)
    }
}

module.exports.getEachCategoryProduct = async (req, res, next) => {
    try {

        const allCategories = await Product.distinct('category');
        const products = [];

        for (let category of allCategories) {
            let result = await Product.findOne({ category });
            if (result) {
                products.push(result);
            }
        }

        res.status(200).json({ products })

    } catch (error) {
        next(error)
    }
}