import { Git } from "../git/git"
import { Choice, prompts } from "prompts"

export class RmMerged {

    private git: Git = new Git()

    action = async (instructions: boolean) => {
        const branches = this.git.getMergedBranches()

        if (!branches.length) {
            return
        }

        const choices: Choice[] = branches.map(b => ({
            title: b,
            value: b,
        }))

        const response = await prompts.multiselect({
            type: 'multiselect',
            name: 'branches',
            message: 'Pick remove branches',
            instructions: instructions,
            choices: choices,
        })

        this.git.removeBranches(response)
    }
}