// TODO: write code here
// import '../component/videoGeolocation';

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  next(value) {
    this.observers.forEach((observer) => observer(value));
  }
}

const emailStream$ = new Subject();
// console.log(emailStream$);

const email = document.querySelector('.email');

email.addEventListener('input', (event) => {
    emailStream$.next(event.target.value);
});

function updateHello(value) {
    const hello = document.querySelector('.hello');
    // console.log(hello);

    hello.textContent = 'Привет, ' + (value || 'Guest')
}

function logTextInput(name, value) {
    const time = performance.now();

    console.log('Input in ' + name + ' : ' + value + ' ' + time);
};

function fetchEmailIsAvailable(value) {
//   fetch('http://localhost:7070/check/email/' + value);
// ошибка в статусе сервера порт: 7070 -нет

  fetch('http://localhost:3000/' + value);
  //в статусе: 404, ответ от сервера не настроен (server.js)
}

// console.log(emailStream$);
emailStream$.subscribe(updateHello); // - выводит на страницу при каждом нажатиии на клавиатуру
emailStream$.subscribe(logTextInput.bind(null, 'email')); // - выводит в консоль
// emailStream$.subscribe(fetchEmailIsAvailable); // - этот обзёрвер отправляет fetch-запросы на сервер
// - отправляет запрос на сервер(пака типа не важно куда)
