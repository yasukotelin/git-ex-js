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

        const response = await prompts({
            type: 'multiselect',
            name: 'branches',
            message: 'Pick remove branches',
            instructions: instructions,
            choices: choices
        })

        if (!response.length) return

        this.#git.removeBranches(response)
    }
}