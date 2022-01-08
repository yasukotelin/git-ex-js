import prompts from "prompts";
import { Git } from "../git/git.js";
import { merge } from "../util/set.js";

export default class Discard {
  #git = new Git();

  action = async (instructions) => {
    const status = this.#git.status();
    if (!status.unstagedFiles.length && !status.untrackedFiles.length) {
      return;
    }

    const selectedFiles = await this.#multiselectFiles(
      [...status.unstagedFiles, ...status.untrackedFiles],
      instructions
    );

    if (!selectedFiles) {
      // cancel
      return;
    }

    const selectedStagedFiles = merge(selectedFiles, status.unstagedFiles);
    const selectedUntrackedFiles = merge(selectedFiles, status.untrackedFiles);

    this.#git.discard(selectedStagedFiles, selectedUntrackedFiles);
  };

  #multiselectFiles = async (files, instructions) => {
    const response = await prompts({
      type: "multiselect",
      name: "selectedFiles",
      message: "Pick discard files",
      min: 1,
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
