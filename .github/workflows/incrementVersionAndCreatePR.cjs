const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

module.exports = async ({ github, context, versionType }) => {
  async function configureGit() {
    await execAsync('git config user.name "github-actions"');
    await execAsync('git config user.email "github-actions@github.com"');
  }

  async function incrementVersion() {
    await execAsync(`npm version ${versionType}`);
    const packageJson = require("../../package.json");
    const version = packageJson.version;
    const featureBranch = `chore-increment-verion-${version}-${versionType}-${context.runNumber}`;
    return { featureBranch, version };
  }

  async function pushChangesAndTags(featureBranch) {
    await execAsync(`git push origin HEAD:refs/heads/${featureBranch}`);
    await execAsync("git push origin --tags");
  }

  async function getPull(source, target) {
    const existingPr = await github.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      head: source,
      base: target,
    });
    return existingPr.data.length > 0;
  }

  async function createPull(title, source, target) {
    try {
      await github.rest.pulls.create({
        title,
        body: `${title} PR.`,
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: source,
        base: target,
      });
      console.log(`Created pull request: ${title}.`);
    } catch (error) {
      console.error(error.errors);
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
      console.log("Pull request already exists for this version increment.");
    }
  } catch (error) {
    console.error("Error in version increment and PR creation:", error);
  }
};
