const multer = require("multer");

const path = require("path");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/employess"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(100000 + Math.random() * 900000);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "unsupported File Format" }, false);
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 1024 * 1024 * 10 },
});

module.exports = { uploadPhoto };
