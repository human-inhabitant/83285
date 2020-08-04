'use strict';

exports.render = function( req, res ) {
  res.render( 'index', {
    title: 'Wurd...',
    user: JSON.stringify( req.user )
  });
};