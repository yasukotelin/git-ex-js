#! /usr/bin/env node

import { Option, program } from 'commander'
import { RmMerged } from './command/rmMerged.js'
import { Stage } from './command/stage.js'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version, description } = require("../package.json")

const rmMerged = new RmMerged()
const stage = new Stage()

const noInstructionsOption = new Option(
    '-ni, --no-instructions', 'not display instructions'
)

program
    .version(version)
    .description(description)

program.command('rm-merged')
    .description('remove merged branch')
    .addOption(noInstructionsOption)
    .action((options) => rmMerged.action(options.instructions))

program.command('stage')
    .addOption(noInstructionsOption)
    .action((options) => stage.action(options.instructions))

// Run program
program.parse(process.argv);