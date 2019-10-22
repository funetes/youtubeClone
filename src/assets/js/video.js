const videoContainer = document.getElementById("jsVideoContainer");
const video = document.getElementById("jsVideo");
const handleRegisterView = async () => {
  video.currentTime = 0;
  const videoId = window.location.href.split("/videos/")[1];
  try {
    await fetch(`/api/${videoId}/view`);
  } catch (error) {
    console.log(error);
  }
}

function init(){
  video.addEventListener("ended",handleRegisterView);
}

if(videoContainer){
  init();
}