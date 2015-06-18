var ldap = require( 'ldapjs' );

var controller = require( '../controller' );
var search = require( './search' );

var server = ldap.createServer();

server.bind( 'cn=root', function ( req, res, next ){

	console.log( 'req.credentials: ', req.credentials );

	if( req.dn.toString() !== 'cn=root' || req.credentials !== 'secret' ){
		return next( new ldap.InvalidCredentialsError() );
	}

	res.end();
	return next();
});

server.listen( 1389, function() {
	console.log( '[FDAP SERVER] Listening: %s', server.url );

	// MYSQL AUTHENTICATION

	/*
	server.bind( 'cn=bruno', function ( req, res, next ) {

		controller.verify.call( this, arguments );

		var credentials = {
			name: req.dn.toString().replace( 'cn=', '' ),
			password: req.credentials,
		};

		controller.mysql( res, credentials, controller.login );

	});
	*/

	// JSON AUTHENTICATION

	/*
	server.bind( 'cn=bruno', function ( req, res, next ) {
		var credentials = {
			name: req.dn.toString().replace( 'cn=', '' ),
			password: req.credentials,
		};

		controller.json( res, credentials, controller.login );

	});
	*/

});

module.exports = server;

