
import express from 'express';
import {
   deleteUser, forgotPasswordApi,
    getAllUsers,
    getCurrentUser,
    getUser,
    getUserById,
    getUserInfo, login, loginWithEmail, logout, register, resendOTP,
    resetPasswordApi, socialLogin, updatePassword,
    updateUserInfo,
    updateUserProfile,
    upDateUserRole,
    verifyLoginOTP, verifyOTP
} from '../controlers/user.controler';
import { authenticate, authorize } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register-user', register);
userRouter.post('/verify-otp', verifyOTP);

userRouter.post('/login', login)
userRouter.post('/resent-otp', resendOTP)
userRouter.get('/get-user-info/:userId', authenticate, getUserInfo)
userRouter.post('/login-with-email-only', loginWithEmail)
userRouter.post('/login-with-email-only-otp', verifyLoginOTP)
userRouter.post('/reset-password', resetPasswordApi);
userRouter.post('/forgot-password', forgotPasswordApi);
userRouter.post('/social-login', socialLogin);
userRouter.get('/get-users', getAllUsers)
userRouter.put('/user/:userId/password', authenticate, updatePassword)
userRouter.post('/logout', authenticate, logout);
userRouter.get('/user', authenticate, getUser);
userRouter.put('/update-user-info', authenticate, updateUserInfo)
userRouter.put('/update-user-avatar', authenticate, updateUserProfile)
userRouter.get('/users/:userId', authenticate, getUserById)
userRouter.delete('/delete-user/:id', authenticate, deleteUser)
userRouter.put('/update-user-role', authenticate, upDateUserRole);

// test for chat 
userRouter.get('/current', authenticate, getCurrentUser);

export default userRouter;
