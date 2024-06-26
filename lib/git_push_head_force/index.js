import runCommandNativeway from "../utils/run_command.js";

const main = () => {
  runCommandNativeway("git push origin HEAD --force");
};

export default main;
