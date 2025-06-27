import './videoGeolocation.css';

const body = document.querySelector('body');

const video1 = document.createElement('div');
video1.classList.add('V1');
body.appendChild(video1);

const h1Video1 = document.createElement('h1'); // долгота
h1Video1.textContent = 'Видео-1: Geolocation';
video1.appendChild(h1Video1);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (data) => {
      const { latitude, longitude } = data.coords;

      const komp = document.createElement('h3'); // долгота
      komp.textContent = `Комп находится(координаты): широта - ${latitude}, долгота - ${longitude}.`;
      video1.appendChild(komp);

      const result = document.createElement('h3'); // долгота
      result.classList.add('resultV1');
      result.textContent = 'Геолокация по ip может определить что я в Хабаровске(гугл или яндекс карты определили что ПК по этим координатам находится в Комсомольске), короче определяет по ip очень приблезительно.';
      video1.appendChild(result);
    },
    (err) => {
      console.log(err);
    },
    { enableHighAccuracy: true },
  );
}
