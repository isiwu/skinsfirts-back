import { Router } from "express";
import multer from "multer";
import path from "path";
import DoctorControllers from "../controllers/doctorControllers";

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
const doctorControllers = new DoctorControllers();

router.get("/", doctorControllers.doctors);
router.get("/:id", doctorControllers.doctor);
router.post("/create", upload.single("image"), doctorControllers.create);
router.patch("/:id/update", upload.single("image"), doctorControllers.updateDoctor);
router.post("/:id/availability", doctorControllers.availability);
router.patch("/:id/availability", doctorControllers.updateAvailability);
router.delete("/:id/availability/:availableId", doctorControllers.deleteAvailability);
router.get("/:id/availabilities", doctorControllers.doctorAvailabilities);

export default router;