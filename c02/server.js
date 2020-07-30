const connect = require( 'connect' );
const app = connect();

const logger = function( req, res, next ) {
  console.info( req.method, req.url );
  next();
};
app.use( logger );

const wurd = function( req, res, next ) {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.end( 'Wurd...' );
};
app.use( '/wurd', wurd );

const wurdNot = function( req, res, next ) {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.end( 'Wurd... NOT!' );
};
app.use( '/not', wurdNot );

app.listen( 3000 );

console.info('Server running at http://localhost:3000/' );