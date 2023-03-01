import childProcess, { execSync } from "child_process";

const runCommandWithOutput = (command) => {
  try {
    const options = { stdio: "pipe" };
    const stdOut = execSync(command, options).toString();
    return stdOut;
  } catch (e) {
    throw e.stderr.toString();
  }
};

const runCommandNativeway = (command, args) => {
  childProcess.spawn(command, args, {
    stdio: "inherit",
    shell: true
  });
};

export { runCommandWithOutput };
export default runCommandNativeway;
