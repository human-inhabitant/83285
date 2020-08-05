'use strict';

const app = require( '../../server' );
const should = require( 'should' );
const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );
const Article = mongoose.model( 'Article' );

let user, article;

describe( 'Article Model Unit Tests', function() {
  beforeEach( function( done ) {
    user = new User({
      nameGiven: 'Full',
      nameFamily: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });
    user.save( function() {
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user: user
      });
      done();
    });
  });

  describe( 'Testing the save method', function() {
    it( 'Should be able to save without problems', function() {
      article.save( function( err ) {
        should.not.exist( err );
      });
    });
    it( 'Should not be able to save an article without a title', function() {
      article.title = '';
      article.save( function( err ) {
        should.exist( err );
      });
    });
  });

  afterEach( function( done ) {
    Article.deleteOne( function() {
      User.deleteOne( function() {
        done();
      });
    });
  });

});

