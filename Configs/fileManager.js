const fs = require("fs");
const path = require("path");
var url = require("url");
const multer = require("multer");

const { PATHS } = require("./constants");
const { IMAGES } = PATHS;

let tempPath = {
  base: path.join(__dirname, "./../Assets" + IMAGES.TEMP),
  original: path.join(
    __dirname,
    "./../Assets" + IMAGES.TEMP + IMAGES.ORIGINAL + "/"
  ),
  thumb: path.join(__dirname, "./../Assets" + IMAGES.TEMP + IMAGES.THUMB + "/"),
};
tempPath[IMAGES.ORIGINAL] = tempPath.original;
tempPath[IMAGES.THUMB] = tempPath.thumb;

class FileManager {
  constructor() {
    this.imageResizeResolution = parseInt(process.env.IMAGE_RESIZE_RESOLUTION);
  }

  //CREATE FILE NAME
  getFileName(file) {
    return (
      file.originalname.split(".")[0].replace(/[^A-Z0-9]/gi, "_") +
      "_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 999) +
      99 +
      path.extname(file.originalname)
    );
  }

  resolvePath(filePath) {
    // BASE FOLDER
    return path.join(__dirname, "./../Assets" + filePath + "/");
  }

  upload() {
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, this.resolvePath(PATHS.IMAGES.TEMP + PATHS.IMAGES.ORIGINAL));
      }.bind(this),

      filename: function (req, file, cb) {
        let fileName = this.getFileName(file);

        if (!req.body[file.fieldname]) {
          // req.body[file.fieldname] = []
          req.body[file.fieldname] =
            process.env.HOST + IMAGES.TEMP + IMAGES.ORIGINAL + "/" + fileName;
        }
        // req.body[file.fieldname].push(fileName)
        else req.body[file.fieldname] = fileName;

        cb(null, fileName);
      }.bind(this),
    });

    return multer({
      // TODO: Add file size limit
      storage,
    });
  }

  deleteFile = (filePath) => {
    let pathOrigin = this.resolvePath(
      PATHS.IMAGES.TEMP + PATHS.IMAGES.ORIGINAL
    );
    let parsed = url.parse(filePath);
    let finalPath = pathOrigin + path.basename(parsed.pathname);

    fs.unlink(finalPath, (err) => {
      if (err) {
        throw err;
      }
    });
  };
}

module.exports = FileManager;
