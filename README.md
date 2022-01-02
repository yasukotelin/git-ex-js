# git-ex

![prettier workflow](https://github.com/yasukotelin/git-ex-js/actions/workflows/prettier.yml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

git-ex is git extensions tool.  

## Install

### from npm

not yet.

### from local code

```bash
git clone https://github.com/yasukotelin/git-ex-js
npm install
npm run build
npm install -g ./
```

## Commands

```
Usage: git-ex [options] [command]

git-ex is git extensions tool

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  switch [options]     switch branch
  stage [options]      stage files
  unstage [options]    unstage files
  diff [options]       show diff with selector
  rm-merged [options]  remove merged branch
  help [command]       display help for command
```

### git ex switch

```
Usage: git-ex switch [options]

switch branch

Options:
  -r, --remote  switch remote branch
  -h, --help    display help for command
```

### git ex stage

```
Usage: git-ex stage [options]

stage files

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

### git ex unstage

```
Usage: git-ex unstage [options]

unstage files

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

### git ex diff

```
Usage: git-ex diff [options]

show diff with selector

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

### git ex rm-merged

```
Usage: git-ex rm-merged [options]

remove merged branch

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

## Development

```bash
git clone https://github.com/yasukotelin/git-ex-js
cd git-ex-js
npm install
node src/index.js
```

### Formatter

use prettier default setting.

```
npm run format
```

recommend use vscode auto save.

```setting.json
{
  "editor.formatOnSave" : true
}
```

## Author

yasukotelin
