

start: clear node

node:
	@node index.js;

clear:
	@killall node || true;