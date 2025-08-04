import { Router } from "express";
import PatientControllers from "../controllers/patientController";

const router = Router();
const patientControllers = new PatientControllers();

router.post("/make-appointment", patientControllers.makeAppointment);
router.patch("/:id/update-appointment", patientControllers.updateAppointment);

export default router;