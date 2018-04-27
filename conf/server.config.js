/**
 * 配置服务端口，以及代理
 */
const constants = require('./constants');
const common = 'test';
module.exports = {
    appPort: 7001,
    proxy: {
        '/v3/assistant': 'http://restapi.amap.com/v3/',
        // '/api/portal/login': 'http://192.168.0.101:10303/',
        // '/api': 'http://192.168.0.101:10303',
        '/api': 'http://10.176.156.95:10200',
        '/mockLoginSc': 'http://10.176.155.47:7001/ui/',
    },
};
