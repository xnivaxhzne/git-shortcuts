import runCommand from "../utils/run_command.js";
import inquirer from "inquirer";

const getCommitMessage = async () => {
  const inputFields = [
    {
      type: "input",
      name: "message",
      message: "Enter the commit message: ",
    },
  ];

  const { message } = await inquirer.prompt(inputFields);
  return message;
};

const main = async () => {
  let commitMessage = process.argv.slice(2).join(" ");

  if (!commitMessage) {
    commitMessage = await getCommitMessage();
  }

  console.log(commitMessage);

  runCommand(`git commit -m "${commitMessage}"`);
};

export default main;
