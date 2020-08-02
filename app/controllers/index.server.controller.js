'use strict';

exports.render = function( req, res ) {
  if ( req.session.lastVisit ) {
    console.info( req.session.lastVisit );
  }

  req.session.lastVisit = new Date();

  res.render( 'index', {
    title: 'Wurd...',
    userFullName: req.user ? req.user.fullName : ''
  });
};