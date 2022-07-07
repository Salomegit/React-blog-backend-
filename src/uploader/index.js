const multer = require("multer");
const path = require("path");

const baseDir = path.resolve(path.dirname(__dirname));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(baseDir, "public", "uploads"));
  },
  filename: (req, file, cb) => {
    const fname = `${new Date().getTime()}_file${path.extname(file.originalname)}`;
    cb(null, fname);
  },
});

const uploader = multer({ storage: storage });

module.exports = uploader;
