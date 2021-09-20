const submitButton = document.getElementById('submit');
/** @type {HTMLInputElement} */
const videoUrlElement = document.getElementById('video-url');
/** @type {HTMLVideoElement} */
const videoElement = document.getElementById('video');

submitButton.addEventListener('click', loadVideo);

function loadVideo() {
  const url = videoUrlElement.value;
  videoElement.src = url;
}
