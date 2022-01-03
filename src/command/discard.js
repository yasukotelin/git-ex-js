import prompts from "prompts";
import { Git } from "../git/git.js";
import { merge } from "../util/set.js";

export default class Discard {
  #git = new Git();

  action = async (instructions) => {
    const status = this.#git.status();
    if (!status.workingTree.length && !status.untracked.length) {
      return;
    }

    const selectedFiles = await this.#multiselectFiles(
      [...status.workingTree, ...status.untracked],
      instructions
    );

    if (!selectedFiles) {
      // cancel
      return;
    }

    const selectedStagedFiles = merge(selectedFiles, status.workingTree);
    const selectedUntrackedFiles = merge(selectedFiles, status.untracked);

    try {
      this.#git.discard(selectedStagedFiles, selectedUntrackedFiles);
    } catch (e) {
      // Git already outputs an error, so it doesn't do anything.
      console.error(e);
    }
  };

  #multiselectFiles = async (files, instructions) => {
    const response = await prompts({
      type: "multiselect",
      name: "selectedFiles",
      message: "Pick discard files",
      instructions: instructions,
      choices: files.map((f) => ({
        title: f,
        value: f,
      })),
    });

    const selectedFiles = response.selectedFiles;

    if (!selectedFiles || !selectedFiles.length) {
      return null;
    }

    return selectedFiles;
  };
}
