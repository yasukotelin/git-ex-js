import { Git } from "../git/git"
import { Command } from "./command"

export class RmMerged implements Command {
    name: string = 'rm-merged'
    description: string = 'remove merged branch'

    private git: Git = new Git()

    action = () => {
        // gitからマージ済みブランチ取得
        let branches = this.git.getMergedBranches()
    
        // prompt表示
        // 選択されたブランチの削除
    }
}