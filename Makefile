

start: clear node

node:
	@export NAMEDB=ldap_test && \
	export HOSTDB=localhost && \
	export USERDB=root && \
	export PASSDB=findhit && \
	node index.js

clear:
	@killall node || true;