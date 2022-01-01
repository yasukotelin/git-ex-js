# git-ex

git-ex is git extensions tool.  
port of [git-ex](https://github.com/yasukotelin/git-ex) with Node.js.

## Commands

```
Usage: git-ex [options] [command]

git-ex is git extensions tool

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  switch [options]     switch branch
  rm-merged [options]  remove merged branch
  stage [options]      stage files
  unstage [options]    unstage files
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

### git ex rm-merged

```
Usage: git-ex rm-merged [options]

remove merged branch

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

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

## Development

```bash
git clone https://github.com/yasukotelin/git-ex-js
cd git-ex-js
npm install
node src/index.js
```

### Formatter

use prettier

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
