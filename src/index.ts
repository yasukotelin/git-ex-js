#!/usr/bin/env node

import { Command } from 'commander'
import { version, description } from '../package.json'
import { RmMerged } from './command/rmMerged'

const program = new Command()

const rmMerged = new RmMerged()

program
    .version(version)
    .description(description)
    .command(rmMerged.name)
    .description(rmMerged.description)
    .action(rmMerged.action)

// Run program
program.parse(process.argv);
