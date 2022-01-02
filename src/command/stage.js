import prompts from "prompts";
import { Git } from "../git/git.js";

export class Stage {
  #git = new Git();

  action = async (instructions) => {
    const status = this.#git.status();
    const unstagedFiles = [...status.workingTree, ...status.untracked];

    if (!unstagedFiles.length) return;

    const choices = unstagedFiles.map((f) => ({
      title: f,
      value: f,
    }));

    const name = "selected";
    const response = await prompts({
      type: "multiselect",
      name: name,
      message: "Pick stage files",
      instructions: instructions,
      choices: choices,
    })

    const selected = response[name];
    if (!selected) return;
    if (!selected.length) return;

    this.#git.add(selected);
  };
}
