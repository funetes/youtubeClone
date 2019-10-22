import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';
export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    res.render("home", {
      pageTitle: "home",
      videos
    })
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "home",
      videos: []
    })
  }
};
export const search = async (req, res) => {
  const {
    query: {
      search: searchTerm
    }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: {
        $regex: searchTerm,
        $options: "i"
      }
    })
  } catch (error) {
    console.log(error);
  }

  res.render("search", {
    pageTitle: "search",
    searchTerm,
    videos
  });
}
export const videoHome = (req, res) => res.render("videos", {
  pageTitle: "videoHome"
});
export const getUploadVideo = (req, res) => res.render("uploadVideo", {
  pageTitle: "uploadVideo"
});
export const postUploadVideo = async (req, res) => {
  const {
    body: {
      title,
      description
    },
    file: {
      location: fileUrl
    }
  } = req;
  try {
    const uploadedVideo = await Video.create({
      title,
      description,
      fileUrl,
      creator: req.user.id
    })
    req.user.videos.push(uploadedVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(uploadedVideo.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }

}
export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const video = await Video.findById(id).populate('creator').populate({
      path: 'comments',
      populate: {
        path: 'creator',
        model: 'User'
      }
    });

    res.render("videoDetail", {
      pageTitle: "videoDetail",
      video
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
}
export const getEditVideo = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: "editVideo",
        video
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
}
export const postEditVideo = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      title,
      description
    }
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description
    });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }

}
export const deleteVideo = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    }
    await Video.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
}
export const addViewCount = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  console.log(id);
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
}
export const addComment = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      comment
    },
    user
  } = req;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    const video = await Video.findById(id);
    video.comments.push(newComment.id);
    video.save();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
}
export const deleteComment = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    await Comment.findByIdAndRemove(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
}