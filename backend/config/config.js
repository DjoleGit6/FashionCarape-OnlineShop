'use strict';

require('dotenv').config();

var nconf = require('nconf');

nconf.env(['PORT', 'NODE_ENV'])
  .argv({
    'e': {
      alias: 'NODE_ENV',
      describe: 'Set production or development mode.',
      demand: false,
      default: 'development'
    },
    'p': {
      alias: 'PORT',
      describe: 'Port to run on.',
      demand: false,
      default: 4000
    },
    'n': {
      alias: "neo4j",
      describe: "Use local or remote neo4j instance",
      demand: false,
      default: "local"
    }
  })
  .defaults({
    'USERNAME': 'neo4j',
    'PASSWORD' : 'Barcelona#6',
    'neo4j': 'local',
    'neo4j-local': 'bolt://localhost:7687',
    'base_url': 'http://localhost:4000',
    'api_path': '/api/v0'
  });

module.exports = nconf;