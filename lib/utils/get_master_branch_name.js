import fs from "fs";
import dotenv from "dotenv";

const getMasterBranchName = () => {
  let branchName = "master";
  if (fs.existsSync("./.env")) {
    dotenv.config();
    branchName = process.env.MASTER_BRANCH_NAME || branchName;
  }
  return branchName;
};

export default getMasterBranchName;
