const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

module.exports = async ({ github, context, versionType }) => {
  async function configureGit() {
    await execAsync('git config user.name "github-actions"');
    await execAsync('git config user.email "github-actions@github.com"');
    console.log("Configured git user");
  }

  async function incrementVersion() {
    console.log(`Incrementing version with ${versionType}`);
    await execAsync(`npm version ${versionType}`);
    const packageJson = require("../../package.json");
    const version = packageJson.version;
    console.log(`Incremented version to v${version}(${versionType})`);
    const featureBranch = `chore-increment-verion-${version}-${versionType}-${context.runNumber}`;
    return { featureBranch, version };
  }

  async function pushChangesAndTags(featureBranch) {
    await execAsync(`git push origin HEAD:refs/heads/${featureBranch}`);
    await execAsync("git push origin --tags");
  }

  async function getPull(source, target) {
    const existingPr = await github.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      head: source,
      base: target,
    });
    return existingPr.data.length > 0;
  }

  async function createPull(title, source, target) {
    await github.pulls.create({
      title,
      body: `${title} PR.`,
      owner: context.repo.owner,
      repo: context.repo.repo,
      head: source,
      base: target,
    });
  }

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
    throw new Error(
      `Pull request already exists for version increment to v${version}(${versionType}).`
    );
  }
};
