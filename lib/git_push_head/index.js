import { runCommandAndReturnOutput } from "./../utils/run_command.js";

const main = async () => {
  const output = await runCommandAndReturnOutput("git push origin HEAD");
  console.log(output);
};

export default main;
