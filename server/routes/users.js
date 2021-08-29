const {Router}=require('express');
const router=Router();
const {postUser,postRegisterUser}=require('../controller/user.controller');
const END_POINT_USER_LOGIN='/api/usuarios/login';
const END_POINT_USER_REGISTER='/api/usuarios/register';

//router.post(END_POINT_LOGIN,postUser);
//router.get(END_POINT,getUser);
router.post(END_POINT_USER_LOGIN,postUser);
router.post(END_POINT_USER_REGISTER,postRegisterUser);




module.exports={
    router
}
