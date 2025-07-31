import { PrismaClient } from "../../generated/prisma";
import { Request, Response } from "express";

export default class UserController {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient
  }

  user = async (req: Request, res: Response) => {
    const users = await this.prisma.user.findMany({})
    res.json({
      status: true,
      data: users
    })
  }
}