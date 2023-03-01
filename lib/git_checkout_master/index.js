import runCommand from "./../utils/run_command.js";

const main = () => {
  runCommand("git", ["checkout", "master"]);
};

export default main;
