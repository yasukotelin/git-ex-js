import prompts from "prompts";
import { Git } from "../git/git.js";

const STAGED = "staged";
const UNSTAGED = "unstaged";

export default class Diff {
  #git = new Git();

  action = async (instructions) => {
    const area = await this.#askWhichArea(instructions);

    if (!area) {
      // canncel
      return;
    }
    const isAreaStaged = area === STAGED;

    const status = this.#git.status();

    const files = isAreaStaged ? status.index : status.workingTree;

    if (!files.length) {
      return;
    }

    const selectedFiles = await this.multiselectFiles(files, instructions);

    if (!selectedFiles) {
      // cancel
      return;
    }

    try {
      this.#git.diff(selectedFiles, isAreaStaged);
    } catch (e) {
      // Git already outputs an error, so it doesn't do anything.
    }
  };

  /**
   * Ask staged or unstaged with selector
   * @param {boolean} instructions
   * @return {Promise<string>} 'staged' or 'unstaged'
   */
  #askWhichArea = async (instructions) => {
    const response = await prompts({
      type: "select",
      name: "which",
      message: "Which want to see",
      instructions: instructions,
      choices: [
        { title: "unstaged files", value: UNSTAGED },
        { title: "staged files", value: STAGED },
      ],
    });

    const selected = response.which;

    if (!selected || !selected.length) {
      return null;
    }

    return selected;
  };

  /**
   * User select files with multiselector
   * @param {string[]} files
   * @param {boolean} instructions
   * @returns {Promise<string[]>} selected files
   */
  multiselectFiles = async (files, instructions) => {
    const response = await prompts({
      type: "multiselect",
      name: "selectedFiles",
      message: "Pick files",
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