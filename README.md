# git-ex

[![npm version](https://badge.fury.io/js/@yasukotelin%2Fgit-ex.svg)](https://www.npmjs.com/package/@yasukotelin/git-ex) [![npm](https://img.shields.io/npm/dt/@yasukotelin/git-ex.svg)](https://www.npmjs.com/package/@yasukotelin/git-ex) [![prettier workflow](https://github.com/yasukotelin/git-ex-js/actions/workflows/prettier.yml/badge.svg)](https://github.com/yasukotelin/git-ex-js/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

git-ex is git extensions tool.

## Install

### from npm

```
npm i -g @yasukotelin/git-ex
```

### from local code (dev version)

```bash
git clone https://github.com/yasukotelin/git-ex-js
npm install
npm run localInstall
```

> If you can't use `git ex` , you need to restart terminal.

## Commands

```
Usage: git-ex [options] [command]

git-ex is git extensions tool

you can see more information
=> https://github.com/yasukotelin/git-ex-js

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  switch [options]     switch branch
  stage [options]      stage files
  unstage [options]    unstage files
  diff [options]       show diff with selector
  stash [options]      stash actions
  discard [options]    discard files
  rm-merged [options]  remove merged branch
  help [command]       display help for command
```

### How to use multiselector

```
? Pick stage files ›  
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   README.md
◯   src/index.js
◯   src/command/diff.js
```

You can see Instructions with `--instructions` option.

### git ex switch

Switch branch with selector.

when use `--remote` , create new branch with selected remote it. Initial value is remote branch name.

```
Usage: git-ex switch [options]

switch branch

Options:
  -r, --remote  switch remote branch
  -h, --help    display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147957478-6171990f-09e7-40e1-8205-5e71231ebb79.gif)

![img](https://user-images.githubusercontent.com/31115673/147957589-53bce884-75c7-4111-8ad5-73014ba68e60.gif)

### git ex stage

Add (Stage) with multiselector.

```
Usage: git-ex stage [options]

stage files

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147958652-d54852e8-5c15-4414-8bd4-11d5faa23927.gif)

### git ex unstage

Reset (Unstage) with multiselector.

```
Usage: git-ex unstage [options]

unstage files

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147958658-6ebc182a-a2b8-4dd7-a4fc-6eab510b9eb5.gif)

### git ex diff

Display diff files with multiselector. If you use `--cached` option, you can select from staged files.

You can use `--staged` instead of `--cached` .

```
Usage: git-ex diff [options]

show diff with selector

Options:
  -c, --cached        show diff cached(staged) files (default: false)
  -s, --staged        --cached alias (default: false)
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147961425-8943f514-38a6-49b4-be4e-ea170c7a564a.gif)

### git ex stash

Stash actions (show list, new stash save and clear all stash.).
You can select a stash from list. And do action to stash (show diff, pop, apply and drop).

```
Usage: git-ex stash [options]

stash actions

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147911812-a627034a-7175-4b20-a403-ba224e43163c.gif)

![img](https://user-images.githubusercontent.com/31115673/147911937-37b26c08-dcff-49e4-af0c-3d6d339163a9.gif)

### git ex discard

Discard selected files.

If modified files, discard means `git checkout {file}` . If untracked files, execute `git clean -df {files}` .

```
Usage: git-ex discard [options]

discard files

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147961313-ed382494-95af-4918-b255-8b975fb1c451.gif)

### git ex rm-merged

Remove merged branches with multiselector.

```
Usage: git-ex rm-merged [options]

remove merged branch

Options:
  -i, --instructions  display instructions (default: not display)
  -h, --help          display help for command
```

![img](https://user-images.githubusercontent.com/31115673/147961419-6e620680-cb65-4411-b081-98c62b7731ad.gif)

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
