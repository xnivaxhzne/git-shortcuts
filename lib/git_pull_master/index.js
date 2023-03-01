import runCommand from "./../utils/run_command.js";

const main = () => {
  runCommand("git", ["pull", "origin", "master"]);
};

export default main;
