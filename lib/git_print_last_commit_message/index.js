import { runCommandAndReturnOutput } from "./../utils/run_command.js";

const main = () => {
  const lastCommitMessage = runCommandAndReturnOutput(
    `git show-branch --no-name HEAD`
  ).trim();

  console.log(lastCommitMessage);
};

export default main;
