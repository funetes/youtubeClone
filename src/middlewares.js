import routes from './routes'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import multer from 'multer';
import dotenv from 'dotenv';


dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
})

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'metubes3/video'
  })
});


const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'metubes3/avatar'
  })
});
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.userFromMiddleware = req.user;
  next();
}