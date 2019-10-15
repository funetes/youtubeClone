import axios from 'axios';
const commentForm = document.getElementById('jsAddCommentForm');
const videoComments = document.querySelector('.video__comments');
const deleteButton = document.querySelectorAll('.deleteButton');

let videoId = window.location.href.split("/videos/")[1];
const hanldeSubmit = async (e) => {
  e.preventDefault();
  const commentInput = commentForm.querySelector('#jsAddCommentInput');
  const comment = commentInput.value;
  commentInput.value = "";
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method:"POST",
    data:{ comment }
  });
  location.reload();
   
}

const deleteReply = async(e) => {
  const response = await axios({
    url: `/api/${e.target.dataset.commentid}/delete`,
    method:"POST"
  })
  setTimeout(() => {
    location.reload();
   }, 1000);
}
function init(){
  commentForm.addEventListener("submit",hanldeSubmit);
  deleteButton.forEach(e=> e.addEventListener('click',deleteReply));
}

if(videoComments){
  init();
}