const router=require('express').Router();
const {verify}=require('../utils/verify');
const productController=require('../controller/productController');

router.post('/add-product',verify,productController.addProduct);
router.get('/all-products',productController.getAllProducts);
router.put('/edit-products/:id',verify,productController.editProduct);
router.get('/get-each-category-product',productController.getEachCategoryProduct)



module.exports=router;