# git-ex

git-ex is git extensions tool.
port of [git-ex](https://github.com/yasukotelin/git-ex) with Node.js.

## Commands

| command | action | implements |
| -- | -- | -- |
| git ex diff | diff with selecter |  ❌ |
| git ex discard | discard all files | ❌ |
| git ex rm-merged | delete merged branch | ❌ |
| git ex switch | switch branch |  ❌ |
| git ex stage | stage files |  ❌ |
| git ex unstage | unstage files | ❌ |

## Install

### from npm

not yet.

### from local code

```bash
git clons https://github.com/yasukotelin/git-ex-js
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
