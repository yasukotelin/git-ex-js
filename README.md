# git-ex

git-ex is git extensions tool.
port of [git-ex](https://github.com/yasukotelin/git-ex) with Node.js.

## Commands

| command | action | implements |
| -- | -- | -- |
| git ex diff | diff with selecter | :x: |
| git ex discard | discard all files |:x:|
| git ex rm-merged | remove merged branch | :heavy_check_mark: |
| git ex switch | switch branch | :x: |
| git ex stage | stage files | :heavy_check_mark: |
| git ex unstage | unstage files | :heavy_check_mark:|

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
npm run build
node dist/index.js
```

## Author

yasukotelin
