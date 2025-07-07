// const http = require('http');
// const Koa = require('koa');
// const Router = require('koa-router');
// // const { koaBody } = require('koa-body');
// // const koaBody = require('koa-body');
// const app = new Koa();

// // app.use(koaBody({
// //   urlencoded: true,
// // }));

// app.use(async (ctx, next) => {   // ctx.response.body = 'Hello!';
//   const origin = ctx.request.get('Origin');  // console.log(origin);
//   if (!origin) {
//     return await next();
//   }

//   const headers = { 'Access-Control-Allow-Origin': '*', };

//   if (ctx.request.method !== 'OPTIONS') {
//     ctx.response.set({ ...headers });
//     try {
//       return await next();
//     } catch (e) {
//       e.headers = { ...e.headers, ...headers };
//       throw e;
//     }
//   }

//   if (ctx.request.get('Access-Control-Request-Method')) {
//     ctx.response.set({
//       ...headers,
//       'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH',
//     });

//     if (ctx.request.get('Access-Control-Request-Headers')) {
//       ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
//     }

//     ctx.response.status = 204;
//   }
// });

// let subscriptions = [];

// app.use((ctx, next) => {
//   if (ctx.request.method !== 'POST') {
//     next();

//     return;
//   }

//   console.log(ctx.request.body);

//   const { name, phone } = ctx.request.body;

//   ctx.response.set('Access-Control-Allow-Origin', '*');

//   if (subscriptions.some(sub => sub.phone === phone)) {
//     ctx.response.status = 400;
//     ctx.response.body = '{ "status": "subscription exists" }'; 

//     return;
//   }

//   subscriptions.push({ name, phone });

//   ctx.response.body = '{ "status": "OK" }'; 

//   next();
// });

// app.use((ctx, next) => {
//   if (ctx.request.method !== 'DELETE') {
//     next();

//     return;
//   }

//   console.log(ctx.request.query);

//   const { phone } = ctx.request.query;

//   ctx.response.set('Access-Control-Allow-Origin', '*');

//   if (subscriptions.every(sub => sub.phone !== phone)) {
//     ctx.response.status = 400;
//     ctx.response.body = '{ "status": "subscription doesn\'t exists" }'; // 'subscription doesn\'t exists'; 

//     return;
//   };

//   subscriptions = subscriptions.filter(sub => sub.phone !== phone);

//   ctx.response.body = 'OK'; //'{ "status": "OK" }';

//   next();
// });

// const router = new Router();

// //TODO: write code here

// router.get('/index', async (ctx) => { 
//   ctx.response.body = 'hello';
// });

// app.use(router.routes()).use(router.allowedMethods());

// const port = process.env.PORT || 7070;
// const server = http.createServer(app.callback());

// // server.listen(port);
// server.listen(port, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Server is listening to ' + port);
// });













































































// // - 2025.07.03 - 21:36
// const Router = require('koa-router');

const http = require('http');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');

const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const uuid = require('uuid');
const app = new Koa();

const public = path.join(__dirname, '/public')
app.use(koaStatic(public));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = {'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({...headers});
    try {
      return await next();
    } catch (e) {
      e.headers = {...e.headers, ...headers};
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      // 'Access-Control-Allow-Methods': 'GET', 'POST', 'PUT', 'DELETE', 'PATCH',
      'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH',
    });
    
    if (ctx.request.get('Access-Control-Request-Headers')) {
      // ctx.response.set('Access-Control-Allow-Headers', ctx.request.),
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }
    
    ctx.response.status = 204;  
  }
});

// app.use(koaBody({
//   text: true,
//   urlencoded: true,
//   miltipart: true,
//   json: true,
// }));

// app.use(koaBody({ text: true, urlencoded: true, json: true, multipart: false }));

const Router = require('koa-router');
const router = new Router();

router.get('/api/check-email', async (ctx, next) => {
  const { email } = ctx.request.query;
  
  // if (Math.random() > 0.5) {
  //   ctx.response.status = 500;

  //   return;
  // }

  ctx.response.body = {
    available: email.includes('@') && !email.startsWith('admin')
  }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback())
  .listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Server is listening to ' + port);
  });
  