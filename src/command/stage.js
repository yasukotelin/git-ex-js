import prompts from "prompts";
import { Git } from "../git/git.js";

export class Stage {
  #git = new Git();

  action = async (instructions) => {
    const status = this.#git.status();
    const unstagedFiles = [...status.unstagedFiles, ...status.untrackedFiles];

    if (!unstagedFiles.length) {
      return;
    }

    const choices = unstagedFiles.map((f) => ({
      title: f,
      value: f,
    }));

    const name = "selected";
    const response = await prompts({
      type: "multiselect",
      name: name,
      message: "Pick stage files",
      min: 1,
      instructions: instructions,
      choices: choices,
    });

    const selected = response[name];

    if (!selected || !selected.length) {
      // cancel
      return;
    }

    this.#git.add(selected);
  };
}
