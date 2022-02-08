gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

gendifftest:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

gendifftest2:
	node bin/gendiff __fixtures__/file3.yaml __fixtures__/file4.yml

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install:
	npm ci