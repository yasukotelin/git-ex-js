
import { execSync } from "child_process"

export class Git {

    // Get merged branches except 'main', 'master' and 'develop'.
    getMergedBranches = (): string[] => {
        const stdout = execSync('git branch --merged')
        let branches = stdout.toString().split(/\n/)

        return branches
            // remove empty values.
            .filter(v => v)
            .map(v => v.trim())
            // remove default brances and current branch.
            .filter(v => (v != 'master') && (v != 'main') && (v != 'develop') && (!v.startsWith('*')))
    }
}