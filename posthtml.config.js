const { getPosthtmlBemLinter } = require("pineglade-bemlinter");
const { getPosthtmlW3c } = require("pineglade-w3c");
const minifyHtml = require("htmlnano");

const getSourceName = (filename) =>
  filename.replace(/^.*pages(\\+|\/+)(.*)\.twig$/, "$2").replace(/\\/g, "/");

module.exports = {
  plugins: [
    getPosthtmlW3c({
      forceOffline: true,
      getSourceName,
    }),
    getPosthtmlBemLinter({
      getSourceName,
    }),
    minifyHtml({ collapseWhitespace: "aggressive" }),
  ],
};
