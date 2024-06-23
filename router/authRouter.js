const router=require('express').Router();
const { verify } = require('../utils/verify');
const authController=require('../controller/authController');

router.post('/sign-up',authController.Register);
router.post('/sign-in',authController.Login);
router.get('/sign-out',authController.Signout);


module.exports=router;