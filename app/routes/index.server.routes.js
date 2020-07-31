'use strict';

module.exports = function( app ) {
  const index = require( '../controllers/index.server.controller' );
  app.use( '/', index.render );
};
