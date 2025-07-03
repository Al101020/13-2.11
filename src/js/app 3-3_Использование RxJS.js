// --------------------------------------------------------------------------------
import { Observable } from 'rxjs';

const email = document.querySelector('.email');
const hello = document.querySelector('.hello');

const stream$ = new Observable((observer) => {
  const handler = (event) => {
    observer.next(event.target.value);
  };

  email.addEventListener('input', handler);

  return () => {
    email.removeEventListener('input', handler);
  };
});

stream$.subscribe((value) => {
  hello.textContent = `Привет, ${value || 'Guest'}`;
});

stream$.subscribe(((name, value) => {
  console.log(`input event in - ${name}, value - ${value}, time - ${performance.now()}`);
}).bind(null, 'email'));

stream$.subscribe((value) => {
  fetch(`http://localhost:7070/email/check/${value}`);
});

// --------------------------------------------------------------------------------
// import { Observable } from 'rxjs';

// const email = document.querySelector('.email');
// // const hello = document.querySelector('.hello');

// const stream$ = new Observable((observer) => {
//   const interval = setInterval(() => {
//     const value = performance.now();
//                 console.log('-----------------------------');
//     console.log(`in observer - ${value}`);

//     observer.next(`${value} - in observer`);
//   }, 5000);

//   const handler = () => {
//     const value = performance.now();

//     console.log('in handler ' + value);
//     observer.next(value);
//   }

//   email.addEventListener('input', handler);

//   setTimeout(() => {
//     observer.complete(); // complete()-закрвает, да не всё
//   }, 10500);

//   return () => { // убиваем процес вывода в консоль через 10,5 секунды
//     clearInterval(interval);

//     email.removeEventListener('input', handler);
//   };
// });

// stream$.subscribe((value) => {
//   console.log(value);
// });

// setTimeout(
//   () => {
//     stream$.subscribe((value) => {
//       console.log(value);
//     });
//   }, 1000,
// );
