import { spawn } from "child_process";

const copyToClipboard = (data) => {
  var proc = spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
};

export default copyToClipboard;
