import './videoMedia.css';

const body = document.querySelector('body');

const video3 = document.createElement('div');
video3.classList.add('V3');
body.appendChild(video3);

const h1Video3 = document.createElement('h1');
h1Video3.textContent = 'Видео-3.1: Media - video';
video3.appendChild(h1Video3);

const videoPlayer = document.createElement('video');
videoPlayer.classList.add('video');
videoPlayer.controls = true;
video3.appendChild(videoPlayer);

const buttonsDiv = document.createElement('div');
buttonsDiv.classList.add('buttons');
const buttonRecord = document.createElement('button');
buttonRecord.classList.add('btnRecord');
buttonRecord.textContent = 'Запись';
const buttonStop = document.createElement('button');
buttonStop.classList.add('btnStop');
buttonStop.textContent = 'Остановить';
buttonsDiv.appendChild(buttonRecord);
buttonsDiv.appendChild(buttonStop);
video3.appendChild(buttonsDiv);

const record = document.querySelector('.btnRecord');
console.log(record);
console.log(buttonRecord);
const stop = document.querySelector('.btnStop');
console.log(stop);

record.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  // console.log(stream);

  // videoPlayer.srcObject = stream; // увидел видео(себя)

  // videoPlayer.addEventListener('canplay', () => {
  //   videoPlayer.play();
  // });

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener('start', () => {
    console.log('start');
  });

  recorder.addEventListener('dataavailable', (event) => {
    chunks.push(event.data);
  });

  recorder.addEventListener('stop', () => {
    const blob = new Blob(chunks);

    // videoPlayer.srcObject = blob; // здесь srcObject не подходит
    videoPlayer.src = URL.createObjectURL(blob);
  });

  recorder.start();

  stop.addEventListener('click', () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  });
});

// ()();
