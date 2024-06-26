import runCommand from "./../utils/run_command.js";
import getMasterBranchName from "../utils/get_master_branch_name.js";

const main = () => {
  const branchName = getMasterBranchName();
  runCommand(`git checkout ${branchName}`);
};

export default main;
