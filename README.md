# git-ex

git-ex is git extensions tool.
port of [git-ex](https://github.com/yasukotelin/git-ex) with Node.js.

## Commands

| command | action | implements |
| -- | -- | -- |
| git ex diff | diff with selecter | :x: |
| git ex discard | discard all files |:x:|
| git ex rm-merged | remove merged branch | :heavy_check_mark: |
| git ex switch | switch branch | :heavy_check_mark: |
| git ex stage | stage files | :heavy_check_mark: |
| git ex unstage | unstage files | :heavy_check_mark:|

### git ex switch

```bash
git ex switch
```

You can switch a branch.

If you use `--remote` option, create local branch from remote branch and switch to it.

```bash
git ex switch --remote
```

### git ex stage

```bash
git ex stage
```

You can select unstage and untracked files for staging.

### git ex unstage

```bash
git ex unstage
```

You can select stage files for unstaging.

### git ex rm-merged

```bash
git ex rm-merged
```

You can select to remove merged branches.

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

## Author

yasukotelin
