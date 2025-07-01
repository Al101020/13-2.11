// в локальном варианте не получится нужно подключать библиотеку 'rxjs'
// а для webpack установим: npm install rxjs
// !!!!!!!!!!, получилось.

const stream$ = new rxjs.Observable((observer) => {
    setInterval(()  => {
        const value = performance.now();

        observer.next(value);
    }, 5000);
});

stream$.subscribe((value) => {
    console.log(value);
});


//---------------------------------------------------
// подключаем глобально через CDN - не получается

// import { Observable } from 'rxjs';
// console.log(Observable);

// import { Observable } from 'rxjs';

// const stream$ = new Observable((observer) => {
//     setInterval(()  => {
//         const value = performance.now();

//         observer.next(value);
//     }, 5000);
// });

// stream$.subscribe((value) => {
//     console.log(value);
// });

// console.log(Observervable);




// TODO: write code here

// import { Observable } from 'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js';

// console.log(Observable);
// // console.log();rxjs

// console.log(rxjs);

// // import { observable } from 'core-js/es6/symbol';
// import { Observable } from 'rxjs';

// const stream$ = new Observable((observer) => {
//     setInterval(()  => {
//         const value = performance.now();

//         observer.next(value);
//     }, 5000);
// });

// stream$.subscribe((value) => {
//     console.log(value);
// });

// console.log(Observervable);


// в локальном варианте не получится нужно подключать библиотеку 'rxjs'
// а для webpack установим: npm install rxjs
// !!!!!!!!!!
// подключаем глобально через CDN