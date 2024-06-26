import { extractAllUrls } from "../utils/urls.js";
import { runCommandAndReturnOutput } from "./../utils/run_command.js";
import open from "open";

function filterUrlsWithPullNew(urls) {
  return urls.filter((url) => url.includes("/pull/new/"));
}

const main = () => {
  runCommandAndReturnOutput("git push origin HEAD")
    .then((output) => {
      console.log(output);

      const urls = extractAllUrls(output);
      const urlsWithPullNew = filterUrlsWithPullNew(urls);

      if (urlsWithPullNew.length) {
        urlsWithPullNew.forEach((url) => {
          open(url);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default main;
