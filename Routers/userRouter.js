import express from 'express';
import routes from '../routes';
import {
  userHome,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from '../controllers/userController';
import { uploadAvatar } from '../middlewares';
const userRouter = express.Router();

userRouter.get(routes.home, userHome);
userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile,uploadAvatar , postEditProfile);

userRouter.get(routes.userDetail(), userDetail);


export default userRouter;