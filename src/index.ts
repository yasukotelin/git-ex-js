#!/usr/bin/env node

import { Command } from 'commander'
import { version, description } from '../package.json'
import { RmMerged } from './command/rmMerged'

const program = new Command()

const rmMerged = new RmMerged()

program
    // git-ex
    .version(version)
    .description(description)
    // git-ex rm-merged
    .command('rm-merged')
    .description('remove merged branch')
    .option('-ni, --no-instructions', 'not display instructions')
    .action((options) => rmMerged.action(options.noInstructions))

// Run program
program.parse(process.argv);
