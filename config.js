"use strict";

const path = require('path');

let mailConfig = {from: '"Feminism India" <mail@desioutsiders.com>'};
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    mailConfig.transport = 'SMTP';
    mailConfig.options = {
        host: 'smtp.zoho.com',
        secureConnection: true,
        port: 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    };
}

let storageConfig = {
    active: 'ghost-s3',
    'ghost-s3': {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || 'AKIAIUUNYYJATFSE5QOQ',
        secretAccessKey: process.env.S3_ACCESS_SECRET_KEY || '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',
        bucket: 'files.feminismindia.com',
        region: 'us-east-1',
        assetHost: 'https://files.feminismindia.com/'
    }
};

let databaseConfig = {
    client: 'mysql',
    connection: {
        host: 'ankita.ca6rywqjxynj.eu-west-1.rds.amazonaws.com',
        user: process.env.MYSQL_USER || 'ghost_read_only',
        password: process.env.MYSQL_PASS || 'Y38DERBGDGWK5CUFFFNDL55DJ5BT6QR6Q99HYZE2J7Y7EJJX',
        database: 'feminismindia',
        charset: 'utf8',
        ssl: "Amazon RDS"
    },
    debug: false
};

let ghostConfig = {
    url: process.env.GHOST_URL || process.env.HEROKU_URL || 'http://localhost:2368/',
    mail: mailConfig,
    fileStorage: true,
    storage: storageConfig,
    database: databaseConfig,
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || '2368'
    },
    paths: {
        contentPath: path.join(__dirname, '/content/')
    }
};

module.exports = {production: ghostConfig};
