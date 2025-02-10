const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const ref = req.query.ref || "unknown";

  // Save the referral code in a temporary file
  const refFilePath = path.join("/tmp", `ref-${ref}.txt`);
  fs.writeFileSync(refFilePath, `ref: ${ref}`);

  // Direct APK download link
  const githubUrl = "https://github.com/greenMart0/greenMart/releases/download/v1.0.0/app.apk";

  try {
    const response = await fetch(githubUrl);
    if (!response.ok) throw new Error(`Failed to download APK: ${response.statusText}`);

    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader("Content-Disposition", `attachment; filename="app.apk"`);

    // Send the APK directly
    response.body.pipe(res);

    // Clean up the temp file after download
    response.body.on("end", () => fs.unlinkSync(refFilePath));
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
