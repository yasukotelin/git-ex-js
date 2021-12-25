import { Git } from "../git/git"
import { Command } from "./command"
import { Choice, prompts } from "prompts"

export class RmMerged implements Command {
    readonly name: string = 'rm-merged'
    readonly description: string = 'remove merged branch'

    private git: Git = new Git()

    action = async () => {
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
            // TODO 引数で切り替えられるようにしたい
            instructions: true,
            choices: choices,
        })

        this.git.removeBranches(response)
    }
}