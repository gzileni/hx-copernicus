'use strict'

const config = require('../config.js')["postgres"]
const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {

    const url = `postgres://${config.username}:${config.password}@${config.url}:${config.port}/${config.db}`;
    
    fastify.register(require('@fastify/postgres'), {
        connectionString: url
    })
    
})