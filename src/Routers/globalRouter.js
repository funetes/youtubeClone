import express from 'express';
import routes from '../routes';
import {
  home,
  search
} from '../controllers/videoController';
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
  getMe
} from '../controllers/userController';
import passport from 'passport';
const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.me, getMe);

globalRouter.get('/auth/github',
  passport.authenticate('github'))

globalRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect(routes.home);
  });

export default globalRouter;