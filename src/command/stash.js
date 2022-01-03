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
      case "list":
        await this.#list();
        break;
      case "save":
        await this.#save();
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
        { title: "list", value: "list" },
        { title: "save", value: "save" },
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

  #list = async () => {
    const list = this.#git.stashList();
    if (!list || !list.length) {
      return;
    }

    const stash = await this.#selectStash(list);
    if (!stash || !stash.length) {
      // cancel
      return;
    }

    const action = await this.#selectStashAction();
    if (!action || !action.length) {
      // cancel
      return;
    }

    try {
      switch (action) {
        case "pop":
          this.#git.stashPop(stash);
          break;
        case "apply":
          this.#git.stashApply(stash);
          break;
        case "drop":
          this.#git.stashDrop(stash);
          break;
      }
    } catch (e) {
      // Git already outputs an error, so it doesn't do anything.
    }
  };

  /**
   * select stash list
   * @param {string[]} list
   * @returns {Promise<string>}
   */
  #selectStash = async (list) => {
    const response = await prompts({
      type: "select",
      name: "stash",
      message: "Pick stash",
      choices: list.map((v) => ({
        title: v,
        /*
        extract stash number
        stash@{0}: WIP on stash-command: 8586347 Add stash clear
        -> return stash@{0}
         */
        value: v.substring(0, v.indexOf(":")),
      })),
    });

    const stash = response.stash;

    if (!stash || !stash.length) {
      return null;
    }

    return stash;
  };

  #selectStashAction = async () => {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Pick action",
      choices: [
        {
          title: "pop",
          value: "pop",
          description: "restore selected stash and remove it",
        },
        {
          title: "apply",
          value: "apply",
          description: "restore selected stash but will not remove it",
        },
        {
          title: "drop",
          value: "drop",
          description: "remove selected stash",
        },
      ],
    });

    const action = response.action;
    if (!action || !action.length) {
      return null;
    }

    return action;
  };

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
