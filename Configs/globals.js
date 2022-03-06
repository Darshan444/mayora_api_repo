// FOR COLORED CONSOLES
global.CHALK = require('chalk');

global.STATUS_CODES = require('./constants').STATUS_CODES;

global.STATUS_MESSAGES = require('./constants').STATUS_MESSAGES;

global.STATUS = require('./constants').STATUS;


global.SEQUELIZE = require('sequelize');

global.MOMENT = require('moment');

global.PAGINATION_PAGE_SIZE = parseInt(process.env.PAGINATION_PAGE_SIZE);

global.DATABASE = require('./database').database;

