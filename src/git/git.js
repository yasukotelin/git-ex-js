import { exec, execSync, spawn } from "child_process";

export class Git {
  status = () => {
    const results = execSync("git status --porcelain").toString().split(/\n/);

    const status = {
      index: [],
      workingTree: [],
      untracked: [],
    };
    results.forEach((e) => {
      if (!e.length) {
        return;
      }

      if (e.startsWith("??")) {
        status.untracked.push(e.substring(3, e.length));
      } else {
        /*
        'M  src/index.js' -> index only.
        ' M src/index.js' -> working tree only.
        'MM src/index.js' -> both index and working tree
        */
        if (e[0] !== " ") {
          status.index.push(e.substring(3, e.length));
        }
        if (e[1] !== " ") {
          status.workingTree.push(e.substring(3, e.length));
        }
      }
    });

    return status;
  };

  // Switch local branch
  switch = (branch) => {
    const stdout = execSync(`git switch ${branch}`);
    return stdout.toString();
  };

  /**
   * Create new branch from remote branch and switch it.
   * @param {string} branch remote branch
   * @param {string} newBranchName create new branch name
   */
  switchRemote = (branch, newBranchName) => {
    execSync(`git switch -c ${newBranchName} ${branch}`);
  };

  getBranch = (remote) => {
    const cmd = remote ? "git branch --remote" : "git branch";
    const stdout = execSync(cmd);
    const branches = stdout.toString().split(/\n/);
    return (
      branches
        .map((v) => v.trim())
        // remove current branch and empty value.
        .filter((v) => v.length != 0 && !v.startsWith("*"))
    );
  };

  getMergedBranches = () => {
    const stdout = execSync("git branch --merged");
    const branches = stdout.toString().split(/\n/);

    return (
      branches
        // remove empty values.
        .filter((v) => v)
        .map((v) => v.trim())
        // remove default brances and current branch.
        .filter(
          (v) =>
            v != "master" && v != "main" && v != "develop" && !v.startsWith("*")
        )
    );
  };

  // Remove branches
  removeBranches = (branches) => {
    const stdout = execSync(`git branch -d ${branches.join(" ")}`);
    return stdout.toString();
  };

  add = (files) => {
    const stdout = execSync(`git add ${files.join(" ")}`);
    return stdout.toString();
  };

  unstage = (files) => {
    const stdout = execSync(`git reset HEAD ${files.join(" ")}`);
    return stdout.toString();
  };

  /**
   * execute git diff
   * @param {string[]} files
   * @param {boolean} isStaged
   * @returns {string} stdout
   */
  diff = (files, isStaged) => {
    const options = isStaged
      ? ["diff", "--cached", ...files]
      : ["diff", ...files];
    spawn("git", options, { stdio: "inherit" });
  };

  /**
   * Discard files
   * @param {string[]} stagedFiles
   * @param {string[]} untrackedFiles
   */
  discard = (stagedFiles, untrackedFiles) => {
    execSync(`git checkout ${stagedFiles.join(" ")}`);
    execSync(`git clean -df ${untrackedFiles.join(" ")}`);
  };

  stashSave = (message) => {
    execSync(`git stash save -u ${message}`);
  };
}
