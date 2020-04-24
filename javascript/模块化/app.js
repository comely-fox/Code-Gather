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
  ctx.body = {
    url: '/await',
    method: 'GET',
    data: [1, 2, 3],
    name: '天天',
  };

  ctx.set('Content-Type', 'application/json; charset=utf-888');
});

router.get('/api.php', (ctx) => {
  const query = ctx.request.query;

  switch (query.mod) {
    case 'cat':
      ctx.body =
        ctx.request.query['callback'] +
        `([{"catid":"4","upid":"1","catname":"test","articles":"0","allowcomment":"0","displayorder":"0","notinheritedarticle":"0","notinheritedblock":"0","domain":"","url":"","uid":"1","username":"admin","dateline":"1587116396","closed":"1","shownav":"0","description":"","seotitle":"","keyword":"","primaltplname":".\/template\/default:portal\/list","articleprimaltplname":".\/template\/default:portal\/view","disallowpublish":"0","foldername":"","notshowarticlesummay":"0","perpage":"15","maxpages":"1000","noantitheft":"0","lastpublish":"0","level":1,"topid":"1","caturl":"http:\/\/bbs.com:4080\/portal.php?mod=list&catid=4","fullfoldername":""},{"catid":"5","upid":"1","catname":"\u4e16\u754c\u89c2","articles":"0","allowcomment":"0","displayorder":"0","notinheritedarticle":"0","notinheritedblock":"0","domain":"","url":"","uid":"1","username":"admin","dateline":"1587116426","closed":"1","shownav":"0","description":"","seotitle":"","keyword":"","primaltplname":".\/template\/default:portal\/list","articleprimaltplname":".\/template\/default:portal\/view","disallowpublish":"0","foldername":"","notshowarticlesummay":"0","perpage":"15","maxpages":"1000","noantitheft":"0","lastpublish":"0","level":1,"topid":"1","caturl":"http:\/\/bbs.com:4080\/portal.php?mod=list&catid=5","fullfoldername":""}])`;
      break;
    case 'news':
      console.log(query['catid']);
      switch (query['catid']) {
        case '4':
          var res = {
            data: [
              {
                aid: 1,
                title: '1.第一条信息',
                dateline: '行信息',
              },
              {
                aid: 2,
                title: '2.第二条信息',
                dateline: '行信息',
              },

              {
                aid: 3,
                title: '3.第三条信息',
                dateline: '行信息',
              },
              {
                aid: 4,
                title: '4.第三条信息',
                dateline: '行信息',
              },
            ],
          };
          ctx.body = query['callback'] + `(${JSON.stringify(res)})`;
          break;
        case '5':
          var res = {
            data: [
              {
                aid: 5,
                title: '5.第一条信息',
                dateline: '行信息',
              },
              {
                aid: 6,
                title: '6.第二条信息',
                dateline: '行信息',
              },

              {
                aid: 7,
                title: '7.第三条信息',
                dateline: '行信息',
              },
            ],
          };
          ctx.body = query['callback'] + `(${JSON.stringify(res)})`;
          break;
      }

      switch (query['aid']) {
        case '1':
          var res = {
            title: '第一篇文章',
            content:
              '第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章',
          };
          ctx.body = query['callback'] + `(${JSON.stringify(res)})`;
          break;
      }
      break;
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(80);
