// TODO: write code here

import { Observable } from 'rxjs';

const stream$ = new Observable((observer) => {
  const interval = setInterval(() => {
    const value = performance.now();

    console.log('-----------------------------');
    console.log(`in observer - ${value}`);

    observer.next(`${value} - in observer`);
  }, 5000);

  setTimeout(() => {
    observer.complete(); // complete()-закрвает, да не всё
  }, 10500);

  return () => { // убиваем процес вывода в консоль через 10,5 секунды
    clearInterval(interval);
  };
});

stream$.subscribe((value) => {
  console.log(value);
});

setTimeout(
  () => {
    stream$.subscribe((value) => {
      console.log(value);
    });
  }, 1000,
);
