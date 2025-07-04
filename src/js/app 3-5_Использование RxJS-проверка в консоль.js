import {
  // Observable,
  fromEvent, from,
  //  of, range,
} from 'rxjs';
import {
  map, pluck, filter,
  // startWith,
  debounceTime, distinctUntilChanged, switchMap,
} from 'rxjs/operators'; // или
// import { map, pluck } from 'rxjs/operators'; // или

const email = document.querySelector('.email');
// const hello = document.querySelector('.hello');

const stream$ = fromEvent(email, 'input')
  .pipe(
    debounceTime(300), // пауза при вводе, задерживает запросы на 300 мс, на случай быстрого ввода
    // меньше запросов если событие input возникает чаще указаного времени
    // map((event) => event.target.value), // или (работает и тот и этот вариант), но...
    pluck('target', 'value'),
    map((value) => value.trim()),
    filter(Boolean),
    distinctUntilChanged(),
    switchMap((value) => fetch(`http://localhost:7070/api/check-email?email=${value}`)
      .then((response) => response.json())),
    map((value) => value.available),
  );

stream$.subscribe((value) => {
  console.log(value);
});

const fetchStream$ = from(fetch('http://localhost:9001/'));//

fetchStream$.subscribe((value) => {
  console.log(value);
});

// // --------------------------------------------------------------------------------

// const arrayStream$ = from([1, 2, 3]) // 0, 6
//   .pipe(
//     map((x) => x * 2),
//     filter((x) => x > 5),
//     startWith(0),
//   );

// arrayStream$.subscribe((value) => {
//   console.log(value);
// });
// // --------------------------------------------------------------------------------
// console.log('--- from ---');
// const arrayStream1$ = from([1, 2, 3]) // 0, 1, 2, 3
//   .pipe(
//     startWith(0),
//   );

// arrayStream1$.subscribe((value) => {
//   console.log(value);
// });
// // --------------------------------------------------------------------------------
// console.log('--- of - в видео сказал что типа разницы нет ---');
// const arrayStream2$ = of([1, 2, 3]) // 0, [1, 2, 3] - а на экране есть
//   .pipe(
//     startWith(0),
//   );

// arrayStream2$.subscribe((value) => {
//   console.log(value);
// });
// // --------------------------------------------------------------------------------
// console.log('--- range ---');
// const arrayStream3$ = range(1, 10);

// arrayStream3$.subscribe({
//   next: (value) => { console.log(value); },
// });

// console.log('--- range-2 ---');
// const numbers = range(1, 3);
// numbers.subscribe({
//   next: (value) => { console.log(value); },
//   complete: () => { console.log('Complete!'); },
// });
