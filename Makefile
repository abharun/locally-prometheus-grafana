## Variables ##

export dist_folder := ./build

knexfile := ./build/src/config/knexfile.js

## Rules ##

setup:
	npm install

run-dev:
	npm run start

run-metrics:
	docker-compose --file ./deployment/docker-compose.metrics.yml up --build