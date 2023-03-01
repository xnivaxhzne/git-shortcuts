import runCommand from "./../utils/run_command.js";

const main = () => {
  runCommand("git", ["restore", "."]);
};

export default main;
