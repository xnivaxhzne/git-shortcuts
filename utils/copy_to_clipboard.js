const { spawn } = require("child_process");

function copyToClipboard(data) {
  var proc = spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

module.exports = copyToClipboard;
