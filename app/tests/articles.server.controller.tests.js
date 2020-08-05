'use strict';

const app = require( '../../server' );
const should = require( 'should' );
const request = require( 'supertest' );
const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );
const Article = mongoose.model( 'Article' );

let user, article;

describe( 'Articles Controller Unit Tests:', function() {
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

      article.save( function( err ) {
        done();
      });
    });
  });

  describe( 'Testing the GET methods', function() {
    it( 'Should be able to get the list of articles', function( done ){
      request( app )
        .get( '/api/articles/' )
        .set( 'Accept', 'application/json' )
        .expect( 'Content-Type', /json/ )
        .expect( 200 )
        .end( function( err, res )  {
          //res.body.should.be.an.Array.and.have.lengthOf( 1 );
          res.body[0].should.have.property( 'title', article.title );
          res.body[0].should.have.property( 'content', article.content );
          done();
        })
      ;
    });
    it( 'Should be able to get the specific article', function( done ) {
      request( app )
        .get( `/api/articles/${article.id}` )
        .set( 'Accept', 'application/json' )
        .expect( 'Content-Type', /json/ )
        .expect( 200 )
        .end( function( err, res ) {
          //res.body.should.be.an.Object.and.have.property( 'title', article.title );
          res.body.should.have.property( 'content', article.content );
          done();
        })
      ;
    });
  });

  afterEach( function( done ) {
    Article.deleteOne().exec();
    User.deleteOne().exec();
    done();
  });
});

