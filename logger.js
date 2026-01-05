const fs = require("fs");
const path = require("path");
const { rotateIfNeeded } = require("./rotate");

const LOG_DIR = path.join(__dirname, "logs");
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

function getLogFile() {
  const date = new Date().toISOString().split("T")[0];
  return path.join(LOG_DIR, `audit-${date}.log`);
}

function logEvent(event, metadata = {}) {
  const file = getLogFile();
  rotateIfNeeded(file);

  const entry =
    JSON.stringify({
      time: new Date().toISOString(),
      event,
      metadata
    }) + "\n";

  fs.open(file, "a", (err, fd) => {
    if (err) throw err;
    fs.write(fd, entry, () => fs.close(fd, () => {}));
  });
}

module.exports = { logEvent };
