#! /usr/bin/env node
import { runCommandWithOutput } from "./../utils/run_command.js";

const main = () => {
  const lastCommitMessage = runCommandWithOutput(
    `git show-branch --no-name HEAD`
  ).trim();

  console.log(lastCommitMessage);
};

main();
