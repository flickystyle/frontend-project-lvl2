### Hexlet tests and linter status:
[![Actions Status](https://github.com/flickystyle/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/flickystyle/frontend-project-lvl2/actions)
[![github-actions](https://github.com/flickystyle/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/flickystyle/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/flickystyle/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/71aa804270a1649a7ca5/maintainability" /></a>
<a href="https://codeclimate.com/github/flickystyle/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/71aa804270a1649a7ca5/test_coverage" /></a>

**Gendiff** compares configuration of two files and shows a difference.

### Utility features:

+ **Support formats**: yaml, json
+ **Generating a report in different formats**:plain text, stylish and json
+ **Support relative and absolute paths to files**

### Installation
```
 This program is for the Node.js v16.x.x and later
```
**For installation:**
```
1. Clone this repository.
2. Type command: _make install_
```

### Help :

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

### Input formats

Utility supports two input formats: `yaml`, `json`.


### Formatters


Stylish is the default formatter .

To use `stylish` formatter:

```bash
gendiff -f stylish file1.json file2.json
```

or

```bash
gendiff file1.json file2.json
```

**Example of stylish:**

[![asciicast](https://asciinema.org/a/487781.svg)](https://asciinema.org/a/487781)


To use `plain` formatter:

```bash
gendiff -f plain file1.json file2.json
```

**Example of plain:**

[![asciicast](https://asciinema.org/a/487782.svg)](https://asciinema.org/a/487782)


To use `json` formatter:

```bash
gendiff -f json file1.json file2.json
```

**Example of json:**

[![asciicast](https://asciinema.org/a/487783.svg)](https://asciinema.org/a/487783)