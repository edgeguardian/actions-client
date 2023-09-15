all:
	@export NODE_OPTIONS=--openssl-legacy-provider
	npm install && npm run all
