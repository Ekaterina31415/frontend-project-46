install:
	npm ci

lint:
	npx eslint .

test:
	npx jest

gendiff:
	bin/gendiff.js