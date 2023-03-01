import runCommand from "./../utils/run_command.js";

const main = () => {
  runCommand("git", ["merge", "origin", "master"]);
};

export default main;
