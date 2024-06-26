import runCommand from "./../utils/run_command.js";

const main = () => {
  runCommand("git merge --abort");
};

export default main;
