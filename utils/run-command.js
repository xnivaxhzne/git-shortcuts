const cp = require("child_process");

/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @returns {Promise<void>} promise
 */
const runPromiseCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: "inherit",
      shell: true
    });

    executedCommand.on("error", (error) => {
      reject(error);
    });

    executedCommand.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

/**
 * @param {string} command process to run
 * @param {string[]} args command line arguments
 * @param {{onError: ()=> ,onSuccess : ()=> }} options options for passing callback function
 * @returns {void} null
 */
const runCommand = (
  command,
  args,
  { onError, onSuccess } = { onError: null, onSuccess: null }
) => {
  const executedCommand = cp.spawn(command, args, {
    stdio: "inherit",
    shell: true
  });
  executedCommand.on("error", (error) => {
    if (onError) {
      onError(error);
    }
  });

  executedCommand.on("exit", (code) => {
    if (code === 0 && onSuccess) {
      onSuccess();
    } else if (onError) {
      onError();
    }
  });
};

module.exports = { runPromiseCommand, runCommand };
