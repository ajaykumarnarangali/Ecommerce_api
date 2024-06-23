const router=require('express').Router();
const cartController=require('../controller/cartController');
const {verify}=require('../utils/verify');

router.post('/add-to-cart',verify,cartController.addToCart);
router.get('/cart-count',verify,cartController.getCartCount);
router.get('/user-cart',verify,cartController.getUserCart);
router.put('/increse-quantity/:id',verify,cartController.IncreaseQuantity);
router.put('/decrease-quantity/:id',verify,cartController.DecreaseQuantity);
router.delete('/remove-item/:id',verify,cartController.removeItem);



module.exports=router;