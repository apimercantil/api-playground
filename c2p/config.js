const dotenv = require('dotenv').config();

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    MERCHANTID: process.env.MERCHANTID,
    CLIENTID: process.env.CLIENTID,
    SECRETKEY: process.env.SECRETKEY,
    INTEGRATORID: process.env.INTEGRATORID,
    TERMINALID: process.env.TERMINALID,
    PHONE_NUMBER: process.env.PHONE_NUMBER
}