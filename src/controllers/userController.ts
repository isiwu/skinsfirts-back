import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export default class UserController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient
  }
  
  user = (req: Request, res: Response) => {
    res.json({
      status: true,
      data: "user"
    })
  }
}