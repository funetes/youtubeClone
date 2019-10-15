import routes from "../routes";
import User from '../models/User';
import passport from 'passport';
export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "join"
  })
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "join"
    });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl:"http://www.colegiodepadua.com.br/img/user.png"
      });
      await User.register(user,password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", {
  pageTitle: "login"
});

export const postLogin = 
  passport.authenticate('local',{
    successRedirect: routes.home,
    failureRedirect: routes.login
  })

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const userHome = (req, res) => res.render("users", {
  pageTitle: "userHome"
});
export const getChangePassword = (req, res) => res.render("changePassword", {
  pageTitle: "changePassword"
});
export const postChangePassword = async (req, res) => {
  const {
    body: {
      oldPasswod,
      newPassword,
      newPassword1
  }} = req;
  try {
    if(newPassword !== newPassword1){
      throw Error("password error");
    }
    await req.user.changePassword(oldPasswod,newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
}
export const getEditProfile = (req, res) => res.render("editProfile", {
  pageTitle: "editProfile"
});

export const postEditProfile = async (req, res) => {
  const { 
    body:{name},
    file
  } = req;
  await User.findByIdAndUpdate(req.params.id,{
    name,
    avatarUrl : file ? file.path : req.user.avatarUrl
  })
  res.redirect(routes.me);
}
// 다른사람 프로필 볼때 사용
export const userDetail = async (req, res) => {
  const {params:{id}} = req;
  const user = await User.findById(id).populate('videos');
  res.render("userDetail", {
    pageTitle: "userDetail",
    user
  });
}
export const getMe = async(req,res) => {
  const user = await User.findById(req.user.id).populate('videos');
  res.render("userDetail", {
    pageTitle: "userDetail",
    user
  });
}