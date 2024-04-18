import { join } from "path";

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory:
    "/vercel/.cache/puppeteer/chrome/linux-123.0.6312.122/chrome-linux64/chrome",
};
