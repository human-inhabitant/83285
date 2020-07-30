const fs = require( 'fs' );
fs.readFile( '/etc/hosts', 'utf8', function( err, data ) {
  if ( err ) {
    return console.error( err );
  }
  console.info( data );
});