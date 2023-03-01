import childProcess, { execSync } from "child_process";

const runCommandAndReturnOutput = (command) => {
  try {
    const options = { stdio: "pipe" };
    const stdOut = execSync(command, options).toString();
    return stdOut;
  } catch (e) {
    throw e.stderr.toString();
  }
};

const runCommandNativeway = (command) => {
  const commandArray = command.split(" ");
  const _command = commandArray[0];
  const _args = commandArray.slice(1);
  childProcess.spawn(_command, _args, {
    stdio: "inherit",
    shell: true
  });
};

export { runCommandAndReturnOutput };
export default runCommandNativeway;
