'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: "'dev'",
  //  BASE_API: "'http://192.168.2.90:8077/admin'",
  //  BASE_API: "'http://192.168.1.90:18077/admin'", // mzf
  //BASE_API: "'http://192.168.1.104:8077/admin'",
  //  BASE_API: "'http://212.64.108.240:8077/admin'",
   BASE_API: "'http://212.64.108.240:18077/admin'",


})
