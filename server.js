'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require( './config/mongoose' );
const db = mongoose();

const express = require( './config/express' );
const app = express();

app.listen( 3000 );
module.exports = app;

console.info( 'Running...', 3000 );
