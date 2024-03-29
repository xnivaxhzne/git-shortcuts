import runCommand from "./../utils/run_command.js";
import inquirer from "inquirer";

const getConfirmation = async () => {
  const inputFields = [
    {
      type: "confirm",
      name: "canContinue",
      message: "Are you sure to discard uncommited changes?: ",
      default: true
    }
  ];

  const { canContinue } = await inquirer.prompt(inputFields);
  return canContinue;
};

const main = async () => {
  const canContinue = await getConfirmation();

  if (canContinue) {
    runCommand("git restore .");
  } else {
    process.exit(0);
  }
};

export default main;
