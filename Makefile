install:
	npm ci

lint:
	npx eslint .

test:
	npx jest

gendiff:
	nodejs ./bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json