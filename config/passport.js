'use strict';

const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

module.exports = function() {
  const User = mongoose.model( 'User' );
  passport.serializeUser( function( user, done ) {
    done( null, user.id );
  });
  passport.deserializeUser( function( id, done ) {
    User.findOne({ _id: id }, '-password -salt', function( err, user ) {
      done( err, user );
    });
  });
  require( './strategies/local.js' )();
};
