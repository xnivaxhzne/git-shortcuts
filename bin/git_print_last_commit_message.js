#! /usr/bin/env node
const { runCommand } = require("./../utils/run-command");

const handleLastCommitMesssage = (message) => {
  console.log(message);
};

runCommand("git", ["show-branch", "--no-name", "HEAD"], {
  onSuccess: handleLastCommitMesssage
});
