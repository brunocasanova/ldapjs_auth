var ldap = require( 'ldapjs' );
var fs = require( 'fs' );

var database = require( '../database' );

module.exports = {

	table: 'users',

	select: 'SELECT * FROM ',

	pre: [
		this.json,
		this.load
	],

	verify: function ( req, res, next ){
		if( ! req.connection.ldap.bindDN.equals( 'cn=root' ) ){
			return next( new ldap.InsufficientAccessRightsError() );
		}

		return next();
	},

	mysql: function ( res, o, cb ){
		var query = this.query( o );

		console.log( 'query: ', query );
		
		database.mysql.connect();
		database.mysql.query( query, function ( err, rows, fields ) {
			if( err ){
				console.log( 'mysql: ', err.stack );
				return;
			}

			if( ! rows.length ){
				cb( false );
				return;
			}

			cb( res, { id: rows[ 0 ].id } );

		});

		database.mysql.end();
	},

	query: function ( o ){
		return [
			this.select,
			this.table,
			' WHERE name=\'',
			o.name,
			'\' AND password=\'',
			o.password,
			'\'',
		].join( '' )
	},

	json: function ( req, res, next ){
		fs.readFile( './lib/virtualDb.json', 'utf8', function ( err, data ){
			if( ! data ) return next( new ldap.OperationsError() );

			try{ req.data = JSON.parse( data ); }

			catch( e ){ req.users = {}; }

			req.users = req.data.users || {};

			return next();
		});
	},

	login: function ( res, login ){
		if( ! login ){
			next( new ldap.InvalidCredentialsError() );
			return;
		}

		if( login.id ){
			console.log( 'Logged successfull' );
			res.end();
		}

		else{
			next( login.error );
			return
		}
	  
	},

	clientBind: function ( err, res ) {
		console.log( 'client log' );

		if( err ){
			console.log( 'bind error: ', err.stack );
			return;
		}

		console.log( 'login ok' );
	},

};