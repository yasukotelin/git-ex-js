import { execSync } from 'child_process';

export class Git {

    status = () => {
        const results = execSync('git status --porcelain').toString().split(/\n/)

        const status = {
            stage: [],
            unstage: [],
            untracked: [],
        }
        results.forEach(e => {
            if (!e.length) {
                return
            }
            if (e.startsWith('??')) {
                status.untracked.push(e.substring(3, e.length))
            } else if (e.startsWith(' ')) {
                status.unstage.push(e.substring(3, e.length))
            } else {
                status.stage.push(e.substring(3, e.length))
            }
        })
        
        return status
    }

    getBranch = (remote) => {
        const cmd = remote ? 'git branch --remote' : 'git branch'
        const stdout = execSync(cmd)
        const branches = stdout.toString().split(/\n/)
        return branches
            .map(v => v.trim())
            // remove current branch and empty value.
            .filter(v => (v.length != 0) && !(v.startsWith('*')))
    }

    getMergedBranches = () => {
        const stdout = execSync('git branch --merged')
        const branches = stdout.toString().split(/\n/)

        return branches
            // remove empty values.
            .filter(v => v)
            .map(v => v.trim())
            // remove default brances and current branch.
            .filter(v => (v != 'master') && (v != 'main') && (v != 'develop') && (!v.startsWith('*')))
    }

    // Remove branches
    removeBranches = (branches) => {
        const stdout = execSync(`git branch -d ${branches.join(' ')}`)
        return stdout.toString()
    }

    add = (files) => {
        const stdout = execSync(`git add ${files.join(' ')}`)
        return stdout.toString()
    }

    unstage = (files) => {
        const stdout = execSync(`git reset HEAD ${files.join(' ')}`)
        return stdout.toString()
    }
}