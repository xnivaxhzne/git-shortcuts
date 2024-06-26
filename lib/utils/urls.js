function extractAllUrls(output) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const allUrls = output.match(urlRegex) || [];
  return allUrls;
}

export { extractAllUrls };
