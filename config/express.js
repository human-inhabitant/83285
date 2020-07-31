'use strict';

const express = require( 'express' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const compress = require( 'compression' );
const methodOverride = require( 'method-override' );
const session = require( 'express-session' );
const ejs = require( 'ejs' );
const config = require( './config' );

module.exports = function() {
  const app = express();

  if ( process.env.NODE_ENV === 'development' ) {
    app.use( morgan( 'dev' ) );
  } else if ( process.env.NODE_ENV === 'production' ) {
    app.use( compress() );
  }

  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );
  app.use( methodOverride() );

  app.use( session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.engine('html', ejs.renderFile );
  app.set( 'views', './app/views' );
  app.set( 'view engine', 'ejs' );

  app.use( express.static( './public' ) );

  require( '../app/routes/index.server.routes' )( app );

  return app;
};