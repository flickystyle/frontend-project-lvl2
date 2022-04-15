publish:
	npm publish --dry-run

gendifftest:
	gendiff __fixtures__/file1.json __fixtures__/file2.json 

gendifftest1:
	gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json

gendifftest3:
	gendiff -f json __fixtures__/file3.yaml __fixtures__/file4.yml 

gendifftest2:
	gendiff -f plain __fixtures__/file3.yaml __fixtures__/file4.yml 

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install:
	npm ci
