import prompts from "prompts";
import { Git } from "../git/git.js";

export class Unstage {

    #git = new Git()

    action = async(instructions) => {
        const status = this.#git.status()

        if (!status.stage.length) return

        const choices = status.stage.map(f => ({
            title: f,
            value: f,
        }))

        const name = 'selected'
        const response = await prompts({
            type: 'multiselect',
            name: name,
            message: 'Pick unstage files',
            instructions: instructions,
            choices: choices,
        })

        const selected = response[name]
        if (!selected) return
        if (!selected.length) return

        this.#git.unstage(selected)
    }
}