
const bodyParser = require('./node_modules/koa-bodyparser');
const Mock = require('./node_modules/mockjs');
const Random = Mock.Random;

post('/api/postUrl').to.handle(bodyParser()).handle((ctx) => {
  let data = ctx.request.body;
  ctx.body = {
    type: 'post',
    data: data,
  };
})

post('/api/getUrl').to.handle(ctx => {
  ctx.body = {
    type: 'get',
    data: {}
  }
})