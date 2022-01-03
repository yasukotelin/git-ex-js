import prompts from "prompts";
import { Git } from "../git/git.js";

export default class Stash {
  #git = new Git();

  action = async (instructions) => {
    const action = await this.#selectAction(instructions);
    if (!action) {
      // cancel
      return;
    }

    switch (action) {
      case "save":
        await this.#save();
        break;
      case "list":
        await this.#list();
        break;
      case "clear":
        await this.#clear();
        break;
    }
  };

  #selectAction = async (instructions) => {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Pick action",
      instructions: instructions,
      choices: [
        { title: "save", value: "save" },
        { title: "list", value: "list" },
        { title: "clear", value: "clear" },
      ],
    });

    const selected = response.action;

    if (!selected || !selected.length) {
      return null;
    }

    return selected;
  };

  #save = async () => {
    const response = await prompts({
      type: "text",
      name: "message",
      message: "Stash message (empty is default message)",
      initial: "",
    });

    const message = response.message;

    try {
      this.#git.stashSave(message);
    } catch (e) {
      // Git already outputs an error, so it doesn't do anything.
    }
  };

  #list = async () => {};

  #clear = async () => {
    const response = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Clear all stash",
      initial: false,
    });

    if (!response.confirm) {
      return;
    }

    try {
      this.#git.stashClear();
    } catch (e) {
      // Git already outputs an error, so it doesn't do anything.
    }
  };
}
