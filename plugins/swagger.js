'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {

    fastify.register(require('@fastify/swagger'), {
        mode: 'static',
        exposeRoute: true,
        specification: {
            path: 'yaml/hx-copernicus.yaml'
        }
    }).ready(err => {
        if (err) throw err
        fastify.swagger()
    })
    
})