//global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const ME = "/me";

//users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//videos
const VIDEOS = "/videos";
const UPLOAD_VIDEO = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//github

const GITHUB = "/auth/github";
const GITHUB_CALL_BACK = "/auth/github/callback";

//api

const API = "/api";
const ADD_VIEW_COUNT =  "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  uploadVideo: UPLOAD_VIDEO,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id)=>{
    if(id){
      return `/videos/${id}/edit`;
    }else{
      return EDIT_VIDEO;
    }

  },
  deleteVideo: id => {
    if(id){
      return `/videos/${id}/delete`;
    }else{
      return DELETE_VIDEO;
    }
  },
  github: GITHUB ,
  githubCallback: GITHUB_CALL_BACK,
  me:ME,
  api:API,
  addViewCount:ADD_VIEW_COUNT,
  addComment:ADD_COMMENT,
  deleteComment:DELETE_COMMENT
}

export default routes;