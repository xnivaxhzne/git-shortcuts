module.exports = async ({ github, context }) => {
  async function getPull(source, target, state) {
    const existingPr = await github.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      head: source,
      base: target,
      state: state,
    });
    return existingPr;
  }

  async function createPull(title, source, target) {
    try {
      await github.pulls.create({
        title: title,
        body: `${title} PR.`,
        owner: context.repo.owner,
        repo: context.repo.repo,
        head: source,
        base: target,
      });
      console.log(`Created pull request ${title}.`);
    } catch (error) {
      console.log(error.errors);
    }
  }

  let sourceBranch = null;
  let targetBranch = null;

  if (context.ref == "refs/heads/master") {
    const existingPr = await getPull("master", "production", "open");
    if (existingPr.data.length) {
      console.log("Master -> Production PR is already created");
    } else {
      sourceBranch = "master";
      targetBranch = "production";
    }
  }

  if (sourceBranch && targetBranch) {
    const sourceName =
      sourceBranch.charAt(0).toUpperCase() + sourceBranch.slice(1);
    const targetName =
      targetBranch.charAt(0).toUpperCase() + targetBranch.slice(1);
    const title = `${sourceName} -> ${targetName}`;
    await createPull(title, sourceBranch, targetBranch);
  }
};
