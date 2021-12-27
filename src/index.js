#! /usr/bin/env node

import { program } from 'commander'
import { RmMerged } from './command/rmMerged.js'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version, description } = require("../package.json")

const rmMerged = new RmMerged()

program
    // git-ex
    .version(version)
    .description(description)
    // git-ex rm-merged
    .command('rm-merged')
    .description('remove merged branch')
    .option('-ni, --no-instructions', 'not display instructions')
    .action((options) => rmMerged.action(options.instructions))

// Run program
program.parse(process.argv);