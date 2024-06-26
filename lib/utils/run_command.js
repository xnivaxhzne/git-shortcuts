import childProcess, { exec } from "child_process";

function runCommandAndReturnOutput(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

const runCommandNativeway = (command) => {
  const commandArray = command.split(" ");
  const _command = commandArray[0];
  const _args = commandArray.slice(1);
  childProcess.spawn(_command, _args, {
    stdio: "inherit",
    shell: true,
  });
};

export { runCommandAndReturnOutput };
export default runCommandNativeway;
