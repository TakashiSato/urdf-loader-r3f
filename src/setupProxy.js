const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyTable = {
    'localhost:3000/resources': 'http://localhost:80',
};

const options = {
    router: proxyTable,
};

const myProxy = createProxyMiddleware(options);

module.exports = function(app) {
  app.use(
    '/resources',
    myProxy
  );
}
