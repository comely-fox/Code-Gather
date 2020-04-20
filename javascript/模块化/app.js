const mockjs = require('mockjs');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/data', (ctx) => {
  const data = mockjs.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|1': [
      [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/],
      [/[4-5]/, /[1-3]/, /1[0-1]/, /[6-7]/, /[8-9]/],
      [/1[0-1]/, /[8-9]/, /[1-2]/, /[3-5]/, /[6-7]/],
      [/[7-9]/, /[6]/, /[1-3]/, /1[0-1]/, /[4-5]/],
      [/[5-6]/, /1[0-1]/, /[4]/, /[7-9]/, /[1-3]/],
    ],
  });

  ctx.body = data;
});

function def(sec, data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), sec);
  });
}

router.get('/await', async (ctx) => {
  ctx.body = await def(2000, { url: '/await', method: 'GET', data: [1, 2, 3] });
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(80);
