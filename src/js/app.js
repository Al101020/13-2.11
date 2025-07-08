import {
  Observable,
  Subject,
  fromEvent, from, of,
  // range, merge, interval, combineLatest,
  takeUntil,
} from 'rxjs';
import {
  map, pluck, filter,
  //  startWith,
  debounceTime, distinctUntilChanged, catchError,
  switchMap, exhaustMap,
  startWith,
  scan, share,
  // mergeMap, cancatMap,
} from 'rxjs/operators'; // или
// import { map, pluck } from 'rxjs/operators'; // или

const email = document.querySelector('.email');
// const hello = document.querySelector('.hello');

function getRequest(url) {
  return new Observable((observer) => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch((err) => observer.error(err));

    return () => controller.abort();
  });
}

const stream$ = fromEvent(email, 'input')
  .pipe(
    debounceTime(300), // пауза при вводе, задерживает запросы на 300 мс, на случай быстрого ввода
    // меньше запросов если событие input возникает чаще указаного времени
    // map((event) => event.target.value), // или (работает и тот и этот вариант), но...
    pluck('target', 'value'),
    map((value) => value.trim()),
    filter(Boolean),
    distinctUntilChanged(),
    switchMap((value) => getRequest(`http://localhost:7070/api/check-email?email=${value}`)
      .pipe(
        catchError((err) => {
          console.log(err);

          return of({ available: false });
        }),
      )),
    map((value) => value.available),
  );

const checkSubject$ = new Subject();

checkSubject$.subscribe((value) => {
  console.log(value);
});

setTimeout(() => {
  console.log('2nd subscription');
  checkSubject$.subscribe((value) => {
    console.log(value);
  });
}, 10000);

stream$.subscribe(checkSubject$);

const fetchStream$ = from(fetch('http://localhost:9001/'));//

fetchStream$.subscribe((value) => {
  console.log(value);
});

// --------------------------------------------------------------------------------
console.log('--- операторы объединения потока ---');
console.log('--- 1 оператор merge ---');
// merge(
//   interval(1000),
//   interval(2000)
// ).subscribe(console.log)
// --------------------------------------------------------------------------------
console.log('--- 2 оператор combineLatest ---');
// combineLatest(
//   interval(1000),
//   interval(2000)
// ).subscribe(console.log)
// --------------------------------------------------------------------------------
console.log('--- операторы высшего порядка ---');
console.log('--- 1 оператор switchMap ---');
// from([1, 2, 3, 4])
//   .pipe(
//     switchMap(value => {
//       return getRequest(`http://localhost:7070/api/check-email?email=${value}`)
//       .pipe(
//         catchError(err => {
//           console.log(err);

//           return of({ available: false });
//         })
//       )
//     })
//   ).subscribe(console.log)
// --------------------------------------------------------------------------------
console.log('--- 2 оператор mergeMap ---');
// from([1, 2, 3, 4])
//   .pipe(
//     mergeMap(value => {
//       return getRequest(`http://localhost:7070/api/check-email?email=${value}`)
//       .pipe(
//         catchError(err => {
//           console.log(err);

//           return of({ available: false });
//         })
//       )
//     })
//   ).subscribe(console.log)
// --------------------------------------------------------------------------------
console.log('--- 3 оператор cancatMap, не получилось ---');
// from([1, 2, 3, 4])
//   .pipe(
//     cancatMap(value => {
//       return getRequest(`http://localhost:7070/api/check-email?email=${value}`)
//       .pipe(
//         catchError(err => {
//           console.log(err);

//           return of({ available: false });
//         })
//       )
//     })
//   ).subscribe(console.log)
// --------------------------------------------------------------------------------
console.log('--- 4 оператор cancatMap, не получилось ---');
from([1, 2, 3, 4])
  .pipe(
    exhaustMap((value) => getRequest(`http://localhost:7070/api/check-email?email=${value}`)
      .pipe(
        catchError((err) => {
          console.log(err);

          return of({ available: false });
        }),
      )),
  ).subscribe(console.log);
// --------------------------------------------------------------------------------

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

// ------------------- 5 video ----------------------------------------------------
const draggable = (el) => {
  const startDrag$ = fromEvent(el, 'mousedown');
  const moveDrag$ = fromEvent(document, 'mousemove');
  const endDrag$ = fromEvent(el, 'mouseup');

  return startDrag$.pipe(
    switchMap((event) => {
      event.stopPropagation(); // для отмены всплытия на событии
      const diffX = el.offsetLeft - event.clientX;
      const diffY = el.offsetTop - event.clientY;
      return moveDrag$.pipe(
        map((event_) => {
          const { clientX, clientY } = event_;
          return {
            x: clientX + diffX,
            y: clientY + diffY,
          };
        }),
        takeUntil(endDrag$),
      );
    }),
  );
};

draggable(email).subscribe((coord) => {
  email.style.top = `${coord.y}px`;
  email.style.left = `${coord.x}px`;
});

const ACTIONS = {
  Increment: 'INCREMENT',
  Decrement: 'DECREMENT',
  Reset: 'RESET',
};

/**
 * {
 * type: ACTIONS.Increment,
 * payload: 5
 * }
 */
// console.log(ACTIONS);

function reduce(state, action) {
  switch (action.type) {
    case ACTIONS.Reset:
      return { ...state, counter: 0 };
    case ACTIONS.Increment:
      return {
        ...state,
        counter: state.counter + (action.payload || 1),
      };
    case ACTIONS.Decrement:
      return {
        ...state,
        counter: state.counter - (action.payload || 1),
      };
    default:
      return state;
  }
}

// ---
const source$ = of(1, 2, 3, 4, 5);
const result$ = source$.pipe(scan((acc, curr) => acc + curr, 0));
console.log(result$);
// ---

class Store {
  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: ' INITIALIZATION ' }),
      scan((state, action) => reduce(state, action), { counter: 0 }),
      share(),
    );
  }

  dispatch(type, payload = null) {
    this.actions$.next({ type, payload });
  }

  inc(value = null) {
    this.dispatch(ACTIONS.Increment, value);
  }

  dec(value = null) {
    this.dispatch(ACTIONS.Decrement, value);
  }

  reset() {
    this.dispatch(ACTIONS.Reset);
  }
}
// console.log(Store);
// const sSS = new Store();
// console.log(sSS);

const store = new Store();
console.log(store);

const incButton = document.querySelector('.increment');
const decButton = document.querySelector('.decrement');
// const decButton = document.querySelector('.decrement');

incButton.addEventListener('click', () => {
  store.inc();
});

decButton.addEventListener('click', () => {
  store.dec();
});

store.state$
  .pipe(
    pluck('counter'),
    distinctUntilChanged(),
  // ).subscribe(console.log)
  ).subscribe((value) => {
    const counter = document.querySelector('.counter');

    counter.textContent = value;
  });
