import { Git } from "../git/git.js";
import prompts from "prompts";

export class RmMerged {
  #git = new Git();

  action = async (instructions) => {
    const branches = this.#git.getMergedBranches();
    if (!branches.length) {
      return;
    }

    const selectedBranches = await this.#multiselectRemoveBrances(
      branches,
      instructions
    );

    if (!selectedBranches) {
      return;
    }

    if (!(await this.#confirm())) {
      return;
    }

    this.#git.removeBranches(selectedBranches);
  };

  #multiselectRemoveBrances = async (branches, instructions) => {
    const choices = branches.map((b) => ({
      title: b,
      value: b,
    }));

    const response = await prompts({
      type: "multiselect",
      name: "branches",
      message: "Pick remove branches",
      min: 1,
      instructions: instructions,
      choices: choices,
    });

    const selected = response.branches;

    if (!selected || !selected.length) {
      return null;
    }

    return selected;
  };

  #confirm = async () => {
    const response = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Are you sure you want to delete the branches?",
      initial: false,
    });

    return response.confirm;
  };
}
