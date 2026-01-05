const fs = require("fs");
function verifyLog(file) {
  fs.open(file, "r", (err, fd) => {
    if (err) throw err;

    const buffer = Buffer.alloc(1024);
    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
      console.log(buffer.toString("utf8", 0, bytesRead));
      fs.close(fd, () => {});
    });
  });
}

module.exports = { verifyLog };
