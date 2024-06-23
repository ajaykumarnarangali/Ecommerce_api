const router=require('express').Router();
const { verify } = require('../utils/verify');
const userController=require('../controller/userController');

router.get('/get-user',verify,userController.getUser);
router.get('/all-user',verify,userController.allUser);
router.put('/change-role/:id',verify,userController.changeRole);


module.exports=router;