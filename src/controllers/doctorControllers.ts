import { Request, Response } from "express";
import { Gender, PrismaClient } from "../../generated/prisma"

interface MulterRequest extends Request {
  file: any
}

export default class DoctorControllers {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient()
  }

  create = async (req: any, res: Response) => {
    const file = req.file;
    const { name, field, focus, profile, careerPath, highlight, gender, experience } = req.body;

    var doctor: any;
    var fileUrl = `${req.protocol}://${req.headers.host}/images/${file?.filename}`
    const newGender: Gender = gender==="male"? "male":"female";

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
          gender: newGender,
          experience: Number(experience)
        }
      })
    } catch (error) {
      return res.status(400).json({status: false, error: error})
    }

    res.json({status: true, data: doctor})
  }
  updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file;
    const { name, field, focus, profile, careerPath, highlight, gender, experience } = req.body;

    // var doctor: any;
    var fileUrl = `${req.protocol}://${req.headers.host}/images/${file?.filename}`
    const newGender: Gender = gender==="male"? "male":"female";

    try {
      const doc = await this.prisma.doctor.findUnique({ where: { id }});
      const doctor = await this.prisma.doctor.update({
        where: { id },
        data: {
          name: name ?? doc?.name,
          field: field ?? doc?.field,
          image: fileUrl ?? doc?.image,
          focus: focus ?? doc?.focus,
          profile: profile ?? doc?.profile,
          careerPath: careerPath ?? doc?.careerPath,
          highlight: highlight ?? doc?.highlight,
          gender: newGender,
          experience: experience ?? doc?.experience
        }
      });

      res.json({status: true, data: doctor})
    } catch (error) {
      return res.json({status: false, data: error});
    }
  }
  doctors = async (req: Request, res: Response) => {
    var doctors: any;
    try {
      doctors = await this.prisma.doctor.findMany({ include: { availables: { include: { times: true }} }});
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
  doctorAvailabilities = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const availabilities = await this.prisma.availability.findMany({ where: { doctorId: id }, include: { times: true }});
      res.json({status: true, data: availabilities});
    } catch (error) {
      console.log("error => ", error);
      
      return res.status(500).json({status: false, data: error});
    }
  }
  availability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, times } = req.body;

    try {
      const availability = await this.prisma.availability.create({
        data: {
          doctorId: id,
          date: new Date(date),
        }
      })

      for (let i = 0; i < times.length; i++) {
        await this.prisma.time.create({
            data: {
              availableId: availability.id,
              startTime: times[i][0],
              endTime: times[i][1]
            }
          });
      }

      const available = await this.prisma.availability.findFirst({ where: { id: availability.id }, include: {
        times: true
      }});

      res.json({status: true, data: available})
    } catch (error) {
      console.log("error => ", error);
      
      return res.status(500).json({status: false, data: error});
    }
  }
  updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.prisma.availability.update({ 
        where: { id }, 
        data: { status: "blocked" }})
    } catch (error) {
      return res.json({status: false, data: error})
    }
  }
  deleteAvailability = async (req: Request, res: Response) => {
    const { id , availableId} = req.params;

    try {
      await this.prisma.availability.deleteMany({where: {id: availableId}});
    } catch (error) {
      return res.status(500).json({status: false, data: error});
    }

    res.json({status: true, data: ""});
  }
}