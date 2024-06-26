import { runCommandAndReturnOutput } from "./../utils/run_command.js";

const main = async () => {
  let lastCommitMessage = await runCommandAndReturnOutput(
    `git show-branch --no-name HEAD`
  );

  lastCommitMessage = lastCommitMessage.trim();

  console.log(lastCommitMessage);
};

export default main;
