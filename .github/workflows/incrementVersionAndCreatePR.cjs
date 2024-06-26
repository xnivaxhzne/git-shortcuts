const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

module.exports = async ({ github, context, versionType }) => {
  async function configureGit() {
    try {
      await execAsync('git config user.name "github-actions"');
      await execAsync('git config user.email "github-actions@github.com"');
    } catch (e) {
      console.log("Error in configuring git user");
      throw Error(e);
    }

    console.log("Configured git user");
  }

  async function incrementVersion() {
    console.log(`Incrementing version with ${versionType}`);
    try {
      await execAsync(`npm version ${versionType}`);
    } catch (e) {
      console.log("Error in incrementing version");
      throw Error(e);
    }
    const packageJson = require("../../package.json");
    const version = packageJson.version;
    console.log(`Incremented version to v${version}(${versionType})`);
    const featureBranch = `chore-increment-verion-${version}-${versionType}-${context.runNumber}`;
    return { featureBranch, version };
  }

  async function pushChangesAndTags(featureBranch) {
    try {
      await execAsync(`git push origin HEAD:refs/heads/${featureBranch}`);
      await execAsync("git push origin --tags");
    } catch (e) {
      console.log("Error in pushing changes and tags");
      throw Error(e);
    }
  }

  async function getPull(source, target) {
    try {
      const existingPr = await github.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: source,
        base: target,
      });
      return existingPr.data.length > 0;
    } catch (e) {
      console.log("Error in getting pull request");
      throw Error(e);
    }
  }

  async function createPull(title, source, target) {
    try {
      await github.pulls.create({
        title,
        body: `${title} PR.`,
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: source,
        base: target,
      });
    } catch (e) {
      console.log("Error in creating pull request");
      throw Error(e);
    }
  }

  try {
    await configureGit();
    const { featureBranch, version } = await incrementVersion();
    const hasOpenPr = await getPull(featureBranch, "master");

    if (!hasOpenPr) {
      await pushChangesAndTags(featureBranch);
      const title = `Version Increment to v${version}(${versionType})`;
      await createPull(title, featureBranch, "master");

      console.log(
        `Created pull request for version increment to v${version}(${versionType}).`
      );
    } else {
      throw new Error("Pull request already exists for this version increment");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error in version increment and PR creation");
  }
};
