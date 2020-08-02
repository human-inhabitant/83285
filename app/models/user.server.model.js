'use strict';

const crypto = require( 'crypto' );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nameGiven: String,
  nameFamily: String,
  email: {
    type: String,
    index: true,
    match: [/.+\@.+\..+/, 'Please fill a valid e-mail address']
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required'
  },
  password: {
    type: String,
    validate: [
      function( password ) {
        return password && password.length > 6;
      },
      'Password should be longer'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
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
  .pre( 'save', function( next ) {
    if ( this.password ) {
      this.salt = new Buffer( crypto.randomBytes( 16 ).toString( 'base64' ), 'base64' );
      this.password = this.hashPassword( this.password );
    }
    next();
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
  .statics
  .findUniqueUsername = function( username, suffix, callback ) {
    const _this = this;
    const possibleUsername = username + ( suffix || '' );
    _this.findOne({ username: possibleUsername }, function( err, user ) {
      if ( !err ) {
        if ( !user ) {
          callback( possibleUsername );
        } else {
          return _this.findUniqueUsername( username, ( suffix || 0 ) + 1, callback );
        }
      } else {
        callback( null );
      }
    });
};

UserSchema
  .methods
  .authenticate = function( password ) {
    return this.password === this.hashPassword( password );
};

UserSchema
  .methods
  .hashPassword = function( password ) {
    return crypto.pbkdf2Sync( password, this.salt, 10000, 64, 'sha512' ).toString( 'base64' );
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
