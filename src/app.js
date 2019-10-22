import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import userRouter from './Routers/userRouter';
import videoRouter from './Routers/videoRouter';
import globalRouter from './Routers/globalRouter';
import apiRouter from './Routers/apiRouter';
import routes from './routes';
import path from 'path';
import {
  localsMiddleware
} from './middlewares';
import './passport';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

const Store = MongoStore(session);

app.set("view engine", "pug");
app.set('views', path.join(__dirname, '/views/pages'));
app.use('/static', express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new Store({
    mongooseConnection: mongoose.connection
  })

}))
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;