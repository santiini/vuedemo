/**
 * mock服务;
 */

//  mock
import jsonServer from 'json-server'
import db from './db'
import routes from './routes'

const port = 3000,
  server = jsonServer.create(),
  router = jsonServer.router(db),
  middlewares = jsonServer.defaults(),
  rewriter = jsonServer.rewriter(routes);

server.use(middlewares);

// 将 POST 请求转为 GET
server.use(( request, res, next) => {
  request.method = 'GET';
  next();
})

server.use(rewriter); // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router);

server.listen(port, () => {
  console.log(`open mock server at port ${port}`)
})
