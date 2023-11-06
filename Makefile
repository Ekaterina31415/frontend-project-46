install:
	npm ci

lint:
	npx eslint .

test:
	npx jest

gendiff:
	node ./bin/gendiff.js