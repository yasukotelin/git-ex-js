import { Git } from '../git/git.js'
import prompts from 'prompts'

export class RmMerged {

    #git = new Git()

    action = async (instructions) => {
        const branches = this.#git.getMergedBranches()

        if (!branches.length) return

        const choices = branches.map((b) => ({
            title: b,
            value: b
        }))

        const name = 'branches'
        const response = await prompts({
            type: 'multiselect',
            name: name,
            message: 'Pick remove branches',
            instructions: instructions,
            choices: choices
        })

        const selected = response[name]

        if (!selected) return
        if (!selected.length) return

        this.#git.removeBranches(selected)
    }
}