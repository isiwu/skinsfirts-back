import { PrismaClient } from "../../generated/prisma";

export default class PatientController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient()
  }
}