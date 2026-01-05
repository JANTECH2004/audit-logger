const { logEvent } = require("./logger");
const { verifyLog } = require("./verify");
const path = require("path");

// Write audit events
logEvent("USER_LOGIN", { userId: 101 });
logEvent("FILE_ACCESS", { file: "report.pdf" });
logEvent("CONFIG_CHANGE", { key: "authMode" });

// Verify today’s log after 1 second
setTimeout(() => {
  const file = path.join(
    __dirname,
    "logs",
    `audit-${new Date().toISOString().split("T")[0]}.log`
  );
  verifyLog(file);
}, 1000);
