
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
get('/api/getUrl').to.handle(ctx => {
  ctx.body = {
    type: 'get',
    data: {}
  }
})
get('/api/getCyData').to.handle(ctx => {
  let roots = [
    {
      data: {
        id: Random.id(),
        label: Random.cword(3, 3),
        is_root: true,
      }
    },
    {
      data: {
        id: Random.id(),
        label: Random.cword(3, 3),
        is_root: true,
      }
    }
  ]
  let base = 50
  let nodes = Array(base * 2).fill(0).map(() => ({
    data: {
      id: Random.id(),
      label: Random.cword(3, 3),
    }
  }))
  let edges = Array(base).fill(0).map((d, i) => ({
    data: {
      id: roots[0].data.id + '-' + nodes[i].data.id,
      source: roots[0].data.id,
      target: nodes[i].data.id,
    }
  })).concat(Array(base).fill(0).map((d, i) => {
    i += base
    return {
      data: {
        id: roots[1].data.id + '-' + nodes[i].data.id,
        source: roots[1].data.id,
        target: nodes[i].data.id,
      }
    }
  }), {
    data: {
      id: roots[0].data.id + '-' + roots[1].data.id,
      source: roots[0].data.id,
      target: roots[1].data.id
    }
  })
  ctx.body = {
    data: [ roots[1], roots[0], ...nodes,  ...edges]
  }
})