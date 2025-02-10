const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const ref = req.query.ref || "unknown";

  // Referral information
  const referralText = `Referral Code: ${ref}`;
  const referralFileName = `ref-${ref}.txt`;

  // APK download link
  const githubUrl = "https://github.com/greenMart0/greenMart/releases/download/v1.0.0/app.apk";

  // HTML with CSS animation and JS logic
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Preparing Your Download...</title>
      <style>
        body {
          background-color: #f4f4f9;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #4CAF50;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 1s linear infinite;
          margin: 20px 0;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .message {
          font-size: 1.2em;
          margin: 10px 0;
          text-align: center;
        }
        .footer {
          margin-top: 30px;
          font-size: 0.9em;
          color: #777;
        }
      </style>
    </head>
    <body>
      <h1>Preparing Your Download...</h1>
      <div class="loader"></div>
      <div class="message" id="status">Saving your referral code...</div>

      <div class="footer">Please wait, your download will start automatically.</div>

      <script>
        // Step 1: Trigger referral file download
        const referralText = "${referralText}";
        const referralFileName = "${referralFileName}";

        const refBlob = new Blob([referralText], { type: "text/plain" });
        const refLink = document.createElement("a");
        refLink.href = URL.createObjectURL(refBlob);
        refLink.download = referralFileName;
        document.body.appendChild(refLink);
        refLink.click();
        document.body.removeChild(refLink);

        // Update status message
        document.getElementById("status").innerText = "Downloading app...";

        // Step 2: Start APK download after 2 seconds
        setTimeout(() => {
          window.location.href = "${githubUrl}";
        }, 2000);
      </script>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(htmlContent);
};
