install:
	npm ci

lint:
	npx eslint .

test:
	npx jest

gendiff:
	nodejs ./bin/gendiff.js