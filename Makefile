gendiff:
	node bin/gendiff.js 
publish:
	npm publish --dry-run
gendifftest:
	node bin/gendiff file1.json file2.json