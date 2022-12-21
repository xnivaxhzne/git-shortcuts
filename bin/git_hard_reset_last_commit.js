#! /usr/bin/env node
const { runCommand } = require("./../utils/run-command");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

rl.question(`Press ENTER to hard reset the last commit, else 'n': `).then(
  (userInput) => {
    if (!userInput) {
      runCommand("git", ["reset", "--hard", "HEAD~1"]);
    }
    process.exit(0);
  }
);
