import { execSync, spawn } from "child_process";

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

  /**
   * Switch local branch
   * @param {string} branch
   */
  switch = (branch) => {
    spawn("git", ["switch", branch], { stdio: "inherit" });
  };

  /**
   * Create new branch from remote branch and switch it.
   * @param {string} branch remote branch
   * @param {string} newBranchName create new branch name
   */
  switchRemote = (branch, newBranchName) => {
    spawn("git", ["switch", "-c", newBranchName, branch], { stdio: "inherit" });
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

  /**
   * Remove branches
   * @param {string[]} branches
   */
  removeBranches = (branches) => {
    spawn("git", ["branch", "-d", ...branches], { stdio: "inherit" });
  };

  /**
   * Add files to index. (Staged files)
   * @param {string[]} files
   */
  add = (files) => {
    spawn("git", ["add", ...files], { stdio: "inherit" });
  };

  /**
   * Unstage files from index.
   * @param {string[]} files
   */
  unstage = (files) => {
    spawn("git", ["reset", "HEAD", ...files], { stdio: "inherit" });
  };

  /**
   * execute git diff
   * @param {string[]} files
   * @param {boolean} isStaged
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
    spawn("git", ["checkout", ...stagedFiles], { stdio: "inherit" });
    spawn("git", ["clean", "-df", ...untrackedFiles], { stdio: "inherit" });
  };

  stashSave = (message) => {
    spawn("git", ["stash", "save", "-u", message], { stdio: "inherit" });
  };

  stashList = () => {
    const stdout = execSync("git stash list");
    const list = stdout.toString().split(/\n/);
    return list.filter((v) => v.length !== 0);
  };

  stashPop = (stash) => {
    spawn("git", ["stash", "pop", stash], { stdio: "inherit" });
  };

  stashApply = (stash) => {
    spawn("git", ["stash", "apply", stash], { stdio: "inherit" });
  };

  stashDrop = (stash) => {
    spawn("git", ["stash", "drop", stash], { stdio: "inherit" });
  };

  stashClear = () => {
    spawn("git", ["stash", "clear"], { stdio: "inherit" });
  };
}
