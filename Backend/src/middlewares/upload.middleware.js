import multer from "multer";
import path from "path";

const uploadPath = path.join(process.cwd(), "Backend/uploads");
console.log("Uploads folder served from:", uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
