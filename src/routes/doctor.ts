import { Router } from "express";
import multer from "multer";
import path from "path";
import DoctorController from "../controllers/doctorController";

const router = Router();
const storage = multer.diskStorage({
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    callback(null, uniqueSuffix)
  },
  destination(req, file, callback) {
    callback(null, "public/images")
  },
});
const upload = multer({ storage });
const doctorController = new DoctorController();

router.post("create", upload.single("image"), doctorController.create)

export default router;