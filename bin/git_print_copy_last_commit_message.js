#! /usr/bin/env node
const { runCommand } = require("./../utils/run-command");
const copyToClipboard = require("./../utils/copy_to_clipboard");

const handleLastCommitMesssage = (message) => {
  copyToClipboard(message);
  console.log(message);
};

runCommand("git", ["show-branch", "--no-name", "HEAD"], {
  onSuccess: handleLastCommitMesssage
});
