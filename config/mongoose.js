'use strict';

const mongoose = require( 'mongoose' );
const config = require( './config' );

module.exports = function() {
  const db = mongoose.connect( config.db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    function() {
      console.info( 'Mongo connected...' );
    });
  require( '../app/models/user.server.model' );
  require( '../app/models/article.server.model' );
  return db;
};