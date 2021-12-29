import prompts from "prompts";
import { Git } from "../git/git.js";

export class Switch {

    #git = new Git()

    action = async (remote) => {
        const branches = this.#git.getBranch(remote)

        this.#autocomplete(branches)
    }

    #autocomplete = async (branches) => {
        const choices = branches.map((b) => ({
            title: b,
        }))

        const response = await prompts({
            type: 'autocomplete',
            name: 'branche',
            message: 'Pick switch branch',
            choices: choices,
        })

        console.log(response)
    }
}