# Git Shortcuts

`@xniva/git-shortcuts` is a cli tool which provides shortcuts for the commanly used [git](https://git-scm.com/) commands.

#### Example:

use `gl` for the `git log` command to view the recent commit

## Installation:

Install it globally using the command

```
npm i -g @xniva/git-shortcuts
```

## List of available commands:

| shortcut command | actual git command                                                     | action                                                                               |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `gl`             | `git log`                                                              | Show the list of commits for the current branch                                      |
| `gs`             | `git status`                                                           | Show the status of the changes                                                       |
| `gb`             | `git branch --show-current`                                            | Show the name of the current branch                                                  |
| `gcm`            | `git checkout master`                                                  | Swicth to the master branch                                                          |
| `gf`             | `git fetch`                                                            | Fetch from the remote                                                                |
| `gpm`            | `git pull origin master`                                               | Pull the changes from the remote master branch                                       |
| `gmm`            | `git merge origin master`                                              | Merge the changes from the remote master to the current branch                       |
| `gph`            | `git push origin HEAD`                                                 | Push the current branch and its changes to remote and open the new PR url in browser |
| `gsr`            | `git reset --soft HEAD~1`                                              | Remove the last commit and preserve the changes                                      |
| `ghr`            | `git reset --hard HEAD~1`                                              | Completely delete the changes of the last commit                                     |
| `glp`            | `git show-branch --no-name HEAD`                                       | Print the last commit message                                                        |
| `glc`            | `git show-branch --no-name HEAD`                                       | Copy and Print the last commit message                                               |
| `gsf`            | `gcm  && gpm && git merge --no-commit --no-ff origin/${featureBranch}` | List the changes of a feature branch w.r.t master - for review                       |
| `gma`            | `git merge --abort`                                                    | Abort the merge                                                                      |
| `grb`            | `git reset --${hardOrSoft} origin/$(git rev-parse --abbrev-ref HEAD)`  | Reset the current branch to its remote equivalent                                    |
| `gphf`           | `git push origin HEAD --force`                                         | Force push the current branch                                                        |
| `gc`             | `git commit -m ${commitMessage}`                                       | Commit with the give message                                                         |

### Master branch name is configurable:

Add a .env file in the directory where you are using the shortcuts and add the following line to set the master branch name

```
MASTER_BRANCH_NAME=main // or any other branch name
```
