import runCommand from "./../utils/run_command.js";
import inquirer from "inquirer";

const getFeatureBranch = async () => {
  const inputFields = [
    {
      type: "input",
      name: "branch",
      message: "Feature branch that you want to explore the changed files: ",
    },
  ];

  const { branch } = await inquirer.prompt(inputFields);
  return branch;
};

const main = async () => {
  let featureBranch = process.argv[2];

  if (!featureBranch) {
    featureBranch = await getFeatureBranch();
  }

  if (featureBranch) {
    runCommand(`gcpm && git merge --no-commit --no-ff origin/${featureBranch}`);
  } else {
    process.exit(0);
  }
};

export default main;
