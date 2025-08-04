import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

export default class AppointmentController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient()
  }

  create = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, startTime, endTime, description, name, age, gender, patienStatus, doctorId } = req.body;

    try {
      const patient = await this.prisma.patient.create({
        data: {
          userId: id,
          name,
          age,
          gender,
          status: patienStatus=="self"?"self":"another",
        }
      });

      await this.prisma.appointment.create({
        data: {
          date: new Date(date),
          startTime,
          endTime,
          appointmentDescription: description,
          patientId: patient.id,
          doctorId
        }
      });

      res.json({status: true, data: ""});
    } catch (error) {
      return res.json({status: false, data: error});
    }
  }

  updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { update } = req.body;

    try {
      await this.prisma.appointment.update({
        where: { id },
        data: {
          status: update=="completed"?"completed":"cancelled"
        }
      })
    } catch (error) {
      return res.json({status: false, data: ""})
    }
  }

  appointmentsByPatient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const appointments = await this.prisma.appointment.findMany({ where: { id }});

      res.json({status: true, data: appointments});
    } catch (error) {
      return res.json({status: false, data: error})
    }
  }
}