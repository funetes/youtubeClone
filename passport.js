import passport from 'passport';
import User from './models/User';
import {Strategy} from 'passport-github';
import dotenv from 'dotenv';
import routes from './routes';
dotenv.config();
const GitHubStrategy = Strategy;

passport.use(User.createStrategy());
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://localhost:4000${routes.githubCallback}`
}, async (_, __, profile, cb) => {
  const {_json:{
    id,avatar_url,html_url,email
  }} = profile;
  try {
    const user = await User.findOne({email})
    console.log(user.avatarUrl);
    if(user){
      user.githubId = id;
      if(user.avatarUrl == undefined){
        user.avatarUrl = avatar_url
      }
      if(user.htmlUrl == undefined){
        user.htmlUrl = html_url
      }
      user.save();
      return cb(null,user);
    }else{
      const newUser = await User.create({
        email,
        avatarUrl:avatar_url,
        htmlUrl:html_url,
        githubId:id
      });
      return cb(null,newUser);
    }
  } catch (error) {
    return cb(error);
  }
  }
));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());