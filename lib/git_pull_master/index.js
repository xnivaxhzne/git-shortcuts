import getMasterBranchName from "../utils/get_master_branch_name.js";
import runCommand from "./../utils/run_command.js";

const main = () => {
  const branchName = getMasterBranchName();
  runCommand(`git pull origin ${branchName}`);
};

export default main;
