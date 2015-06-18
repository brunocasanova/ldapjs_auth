var ldap = require( 'ldapjs' );
var server = require( './' );

/*
server.search( 'o=findhit', auth.pre, function ( req, res, next ){
	
	Object.keys( req.users ).forEach(function ( k ){
		console.log( 'users findhit: ', k );

		if( req.filter.matches( req.users[ k ].attributes ) ){
			res.send( req.users[ k ] );
		}

	});

	res.end();
	return next();

});

*/

module.exports = server;