import prompts from "prompts";
import { Git } from "../git/git.js";

export class Switch {
  #git = new Git();

  action = async (remote) => {
    const branches = this.#git.getBranch(remote);

    const selectedBranch = await this.#select(branches);

    if (!selectedBranch) {
      return;
    }

    if (remote) {
      const newBranchName = await this.#askNewBranchName(selectedBranch);

      if (!newBranchName) {
        // cancel
        return;
      }
      this.#git.switchRemote(selectedBranch, newBranchName);
    } else {
      this.#git.switch(selectedBranch, remote);
    }
  };

  #select = async (branches) => {
    const choices = branches.map((b) => ({
      title: b,
      value: b,
    }));

    const response = await prompts({
      type: "select",
      name: "branche",
      message: "Pick switch branch",
      choices: choices,
    });

    const selected = response.branche;

    if (!selected || !selected.length) {
      return null;
    }

    return selected;
  };

  #askNewBranchName = async (branch) => {
    const suggestBranchName = branch.substring(
      branch.indexOf("/") + 1,
      branch.length
    );

    const response = await prompts({
      type: "text",
      name: "newBranchName",
      message: "New branch name",
      initial: suggestBranchName,
    });

    const newBranchName = response.newBranchName;

    if (!newBranchName || !newBranchName.length) {
      return null;
    }

    return newBranchName;
  };
}
