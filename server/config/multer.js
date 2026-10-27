import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

const upload = multer({

  storage,

  fileFilter: (req, file, cb) => {

    console.log("FILE NAME:", file.originalname);
    console.log("FILE MIME TYPE:", file.mimetype);

    cb(null, true);

}

});

export default upload;