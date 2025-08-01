import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma"

interface MulterRequest extends Request {
  file: any
}

export default class DoctorController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient()
  }

  create = async (req: any, res: Response) => {
    const file = req.file;
    const { name, field, focus, profile, careerPath, highlight, gender, dates, times, experience } = req.body;

    var doctor: any;
    var fileUrl = `${req.protocol}://${req.headers.host}/images/${file?.filename}`
    try {
      doctor = await this.prisma.doctor.create({
        data: {
          name,
          field,
          image: fileUrl,
          focus,
          profile,
          careerPath,
          highlight,
          gender,
          datesNotAvailable: dates,
          timesNotAvailable: times,
          experience
        }
      })
    } catch (error) {
      return res.json({status: false, data: error})
    }

    res.json({status: true, data: doctor})
  }
  doctors = async (re: Request, res: Response) => {
    var doctors: any;
    try {
      doctors = await this.prisma.doctor.findMany({});
    } catch (error) {
      return res.json({status: false, data: error})
    }
    
    res.json({status: true, data: doctors})
  }
  doctor = async (req:Request, res: Response) => {
    const { id } = req.params;

    var doctor: any;
    try {
      doctor = await this.prisma.doctor.findUnique({ where: { id }})
    } catch (error) {
      return res.json({status: false, data: error})
    }

    res.json({status: true, data: doctor})
  }
  updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;

    var doctor: any;
    try {
      doctor = await this.prisma.doctor.update({
        where: { id },
        data: {
          datesNotAvailable: {
            push: new Date(),
          },
          timesNotAvailable: {
            push: new Date()
          }
        }
      })
    } catch (error) {
      return res.json({status: false, data: error});
    }
  }
}