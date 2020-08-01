'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nameGiven: String,
  nameFamily: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: [
      function( password ) {
        return password.length >= 6;
      },
      'Password should be longer'
    ]
  },
  website: {
    type: String,
    get: function( url ) {
      if ( !url ) {
        return url;
      } else {
        if ( url.indexOf( 'http://' ) !== 0 && url.indexOf( 'https://' ) !== 0 ) {
          url = `http://${url}`;
        }
        return url;
      }
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema
  .statics
  .findOneByUsername = function( username, callback ) {
    this.findOne({
        username: new RegExp( username, 'i' )
      }, callback
    )
  ;
};

UserSchema
  .methods
  .authenticate = function( password ) {
    return this.password === password;
};

UserSchema
  .virtual( 'fullName' )
  .get( function() {
    return `${this.nameGiven} ${this.nameFamily}`;
  })
  .set( function( fullName ) {
    const splitName = fullName.split( ' ' );
    this.nameGiven = splitName[0] || '';
    this.nameFamily = splitName[1] || '';
  })
;

UserSchema.set( 'toJSON', { getters: true, virtuals: true } );

mongoose.model( 'User', UserSchema );
