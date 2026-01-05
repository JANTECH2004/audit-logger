const fs = require("fs");

const MAX_SIZE = 5 * 1024; // 5 KB

function rotateIfNeeded(file) {
  if (!fs.existsSync(file)) return;

  const stats = fs.statSync(file);
  if (stats.size >= MAX_SIZE) {
    const rotated = file.replace(
      ".log",
      `-${Date.now()}.log`
    );
    fs.renameSync(file, rotated);
  }
}
module.exports = { rotateIfNeeded };
