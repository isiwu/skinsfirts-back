import { Request, Response } from "express";

export default class UserController {
  user = (req: Request, res: Response) => {
    res.json({
      status: true,
      data: "user"
    })
  }
}