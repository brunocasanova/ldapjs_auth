var mysql = require( 'mysql' );

var connection = mysql.createConnection({
	database : 'ldap_test',
	host     : 'localhost',
	user     : 'root',
	password : 'findhit'
});

module.exports = connection;