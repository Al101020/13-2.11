import './videoMedia.css';

const body = document.querySelector('body');

const video3 = document.createElement('div');
video3.classList.add('V3');
body.appendChild(video3);

const h1Video3 = document.createElement('h1');
h1Video3.textContent = 'Видео-3.2: Media - audio';
video3.appendChild(h1Video3);

const audioPlayer = document.createElement('audio');
audioPlayer.classList.add('audio');
audioPlayer.controls = true;
video3.appendChild(audioPlayer);

const buttonsDiv = document.createElement('div');
buttonsDiv.classList.add('buttons');
const buttonRecord = document.createElement('button');
buttonRecord.classList.add('btnRecord-audio');
buttonRecord.textContent = 'Запись';
const buttonStop = document.createElement('button');
buttonStop.classList.add('btnStop-audio');
buttonStop.textContent = 'Остановить';
buttonsDiv.appendChild(buttonRecord);
buttonsDiv.appendChild(buttonStop);
video3.appendChild(buttonsDiv);

const recordAudio = document.querySelector('.btnRecord-audio');
// console.log(buttonRecord);
// console.log(recordAudio);
const stopAudio = document.querySelector('.btnStop-audio');
console.log(stopAudio);

recordAudio.addEventListener('click', async () => {
  console.log('start-1');
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
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
    audioPlayer.src = URL.createObjectURL(blob);
  });

  recorder.start();

  stopAudio.addEventListener('click', () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  });
});
