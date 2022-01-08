import prompts from "prompts";
import { Git } from "../git/git.js";

const ACTION_LIST = "list";
const ACTION_SAVE = "save";
const ACTION_CLEAR = "clear";

const ACTION_SHOW_FILES = "show files";
const ACTION_SHOW_DIFF = "show diff";
const ACTION_POP = "pop";
const ACTION_APPLY = "apply";
const ACTION_DROP = "drop";

export default class Stash {
  #git = new Git();

  action = async (instructions) => {
    const action = await this.#selectAction(instructions);
    if (!action) {
      // cancel
      return;
    }

    switch (action) {
      case ACTION_LIST:
        await this.#list();
        break;
      case ACTION_SAVE:
        await this.#save();
        break;
      case ACTION_CLEAR:
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
        { title: ACTION_LIST, value: ACTION_LIST },
        { title: ACTION_SAVE, value: ACTION_SAVE },
        { title: ACTION_CLEAR, value: ACTION_CLEAR },
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

    this.#git.stashSave(message);
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
        case ACTION_SHOW_FILES:
          this.#git.stashShowFiles(stash);
          break;
        case ACTION_SHOW_DIFF:
          this.#git.stashShowDiff(stash);
          break;
        case ACTION_POP:
          this.#git.stashPop(stash);
          break;
        case ACTION_APPLY:
          this.#git.stashApply(stash);
          break;
        case ACTION_DROP:
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
          title: ACTION_SHOW_FILES,
          value: ACTION_SHOW_FILES,
          description: "show stash files",
        },
        {
          title: ACTION_SHOW_DIFF,
          value: ACTION_SHOW_DIFF,
          description: "show stash file's diff",
        },
        {
          title: ACTION_POP,
          value: ACTION_POP,
          description: "restore selected stash and remove it",
        },
        {
          title: ACTION_APPLY,
          value: ACTION_APPLY,
          description: "restore selected stash but will not remove it",
        },
        {
          title: ACTION_DROP,
          value: ACTION_DROP,
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
