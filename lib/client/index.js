var controller = require( '../controller' );

var client = require( 'ldapjs' ).createClient({
	url: 'ldap://127.0.0.1:1389',
});

client.bind( 'cn=bruno', 'bruno', controller.clientBind );

module.exports = client;