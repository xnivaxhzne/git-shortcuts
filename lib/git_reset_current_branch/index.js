import runCommand from "./../utils/run_command.js";

const main = () => {
  let isHard = process.argv[2] === "--hard" || process.argv[2] === "-h";

  const hardOrSoft = isHard ? "hard" : "soft";

  runCommand(
    `git reset --${hardOrSoft} origin/$(git rev-parse --abbrev-ref HEAD)`
  );
};

export default main;
