import { runCommandAndReturnOutput } from "./../utils/run_command.js";
import copyToClipboard from "./../utils/copy_to_clipboard.js";

const main = () => {
  const lastCommitMessage = runCommandAndReturnOutput(
    `git show-branch --no-name HEAD`
  ).trim();

  console.log(lastCommitMessage);
  copyToClipboard(lastCommitMessage);
};

export default main;
