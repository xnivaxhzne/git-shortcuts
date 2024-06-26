import { runCommandAndReturnOutput } from "./../utils/run_command.js";
import copyToClipboard from "./../utils/copy_to_clipboard.js";

const main = async () => {
  let lastCommitMessage = await runCommandAndReturnOutput(
    `git show-branch --no-name HEAD`
  );

  lastCommitMessage = lastCommitMessage.trim();

  console.log(lastCommitMessage);
  copyToClipboard(lastCommitMessage);
};

export default main;
