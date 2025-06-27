import './videoMedia.css';

const body = document.querySelector('body');

const video3 = document.createElement('div');
video3.classList.add('V3');
body.appendChild(video3);

const h1Video3 = document.createElement('h1');
h1Video3.textContent = 'Видео-3: Media';
video3.appendChild(h1Video3);

const videoPlayer = document.createElement('video');
videoPlayer.classList.add('video');
video3.appendChild(videoPlayer);

(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  console.log(stream);

  videoPlayer.srcObject = stream;

  videoPlayer.addEventListener('canplay', () => {
    videoPlayer.play();
  });
})();
