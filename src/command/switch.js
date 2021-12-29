import prompts from "prompts";
import { Git } from "../git/git.js";

export class Switch {

    #git = new Git()

    action = async (remote) => {
        const branches = this.#git.getBranch(remote)

        const selected = await this.#select(branches)

        if (selected === null) {
            return
        }

        try {
            this.#git.switch(selected, remote)
        } catch (e) {
            // Git already outputs an error, so it doesn't do anything.
        }
    }

    #select = async (branches) => {
        const choices = branches.map((b) => ({
            title: b,
            value: b,
        }))

        const response = await prompts({
            type: 'select',
            name: 'branche',
            message: 'Pick switch branch',
            choices: choices,
        })

        const selected = response.branche

        if (!selected || !selected.length) {
            return null
        }

        return selected
    }
}