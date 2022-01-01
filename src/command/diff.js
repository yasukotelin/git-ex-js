import prompts from "prompts";
import { Git } from "../git/git.js";

export default class Diff {
  #git = new Git();

  action = async (instructions) => {
    const area = await this.#askWhichArea(instructions);

    console.log(area);
  };

  /**
   * Ask staged or unstaged with selector
   */
  #askWhichArea = async (instructions) => {
    const response = await prompts({
      type: "select",
      name: "which",
      message: "Which want to see",
      instructions: instructions,
      choices: [
        { title: "unstaged files", value: "unstaged" },
        { title: "staged files", value: "staged" },
      ],
    });

    const selected = response.which;

    if (!selected || !selected.length) {
      return null;
    }

    return selected;
  };
}
