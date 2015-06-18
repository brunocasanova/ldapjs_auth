var controller = require( '../controller' );
var fdap = require( '../controller/fdap' );

var client = fdap.createClient({
	url: 'ldap://127.0.0.1:1389',
});


client.bind( 'cn=bruno', 'bruno', controller.clientBind );

module.exports = 'client';