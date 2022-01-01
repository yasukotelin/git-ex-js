#! /usr/bin/env node

import { Option, program } from "commander";
import { RmMerged } from "./command/rmMerged.js";
import { Stage } from "./command/stage.js";
import { Unstage } from "./command/unstage.js";
import { createRequire } from "module";
import { Switch } from "./command/switch.js";

const require = createRequire(import.meta.url);
const { version, description } = require("../package.json");

const switchBranch = new Switch();
const rmMerged = new RmMerged();
const stage = new Stage();
const unstage = new Unstage();

const instructionsOption = new Option(
  "-i, --instructions",
  "display instructions"
).default(false, "not display");

program.version(version).description(description);

program
  .command("switch")
  .description("switch branch")
  .option("-r, --remote", "switch remote branch")
  .action((options) => switchBranch.action(options.remote));

program
  .command("rm-merged")
  .description("remove merged branch")
  .addOption(instructionsOption)
  .action((options) => rmMerged.action(options.instructions));

program
  .command("stage")
  .description("stage files")
  .addOption(instructionsOption)
  .action((options) => stage.action(options.instructions));

program
  .command("unstage")
  .description("unstage files")
  .addOption(instructionsOption)
  .action((options) => unstage.action(options.instructions));

// Run program
program.parse(process.argv);
