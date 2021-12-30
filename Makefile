gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

gendifftest:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install:
	npm install