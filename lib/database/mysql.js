var mysql = require( 'mysql' );

var connection = mysql.createConnection({
	database : process.env.NAMEDB,
	host     : process.env.HOSTDB,
	user     : process.env.USERDB,
	password : process.env.PASSDB,
});

module.exports = connection;