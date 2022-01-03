#! /usr/bin/env node

import { Option, program } from "commander";
import { RmMerged } from "./command/rmMerged.js";
import { Stage } from "./command/stage.js";
import { Unstage } from "./command/unstage.js";
import { createRequire } from "module";
import { Switch } from "./command/switch.js";
import Diff from "./command/diff.js";
import Discard from "./command/discard.js";

const require = createRequire(import.meta.url);
const { version, description } = require("../package.json");

const switchBranch = new Switch();
const stage = new Stage();
const unstage = new Unstage();
const diff = new Diff();
const discard = new Discard();
const rmMerged = new RmMerged();

const instructionsOption = new Option(
  "-i, --instructions",
  "display instructions"
).default(false, "not display");

program
  .version(version)
  .description(
    description +
      "\n\nyou can see more information" +
      "\n=> https://github.com/yasukotelin/git-ex-js"
  );

program
  .command("switch")
  .description("switch branch")
  .option("-r, --remote", "switch remote branch")
  .action((options) => switchBranch.action(options.remote));

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

program
  .command("diff")
  .description("show diff with selector")
  .option("-c, --cached", "show diff cached(staged) files", false)
  .option("-s, --staged", "--cached alias", false)
  .addOption(instructionsOption)
  .action((options) => {
    const cached = options.cached || options.staged;
    diff.action(cached, options.instructions);
  });

program
  .command("stash")
  .description("stash accesor")
  .addOption(instructionsOption)
  .action((options) => {});

program
  .command("discard")
  .description("discard files")
  .addOption(instructionsOption)
  .action((options) => discard.action(options.instructions));

program
  .command("rm-merged")
  .description("remove merged branch")
  .addOption(instructionsOption)
  .action((options) => rmMerged.action(options.instructions));

// Run program
program.parse(process.argv);
