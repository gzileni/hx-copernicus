'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports = async (fastify, opts) => {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.decorate('sql', require('./utils/sql'));
  fastify.decorate('utils', require('./utils/utils'));
  
  /**
   * This loads all plugins defined in plugins
   * those should be support plugins that are reused
   * through your application
   */
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });
  
  /**
   * This loads all plugins defined in routes
   * define your routes in one of these
   */
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

}
