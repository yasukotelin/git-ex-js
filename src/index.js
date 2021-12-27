import { program } from 'commander'
import { RmMerged } from './command/rmMerged.js'
import { pkg } from './packageJson.cjs'

const rmMerged = new RmMerged()

program
    // git-ex
    .version(pkg.version)
    .description(pkg.description)
    // git-ex rm-merged
    .command('rm-merged')
    .description('remove merged branch')
    .option('-ni, --no-instructions', 'not display instructions')
    .action((options) => rmMerged.action(options.instructions))

// Run program
program.parse(process.argv);