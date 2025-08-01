import { PrismaClient } from "../../generated/prisma";

export default class AppointmentController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient()
  }

  create = async () => {}
  appointmentsByPatient = async () => {}
}