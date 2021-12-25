#!/usr/bin/env node

import { Command } from 'commander'
import { version, description } from '../package.json'

let program = new Command()
program.version(version).description(description)

program.parse(process.argv);

// Show help if empty.
program.help()