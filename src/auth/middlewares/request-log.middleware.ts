import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { RequestLogModel } from "../schemas/request-log.schema";

export const requestLogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip?.toString() || "";
    const url = req.originalUrl;
    const now = new Date();
    const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
    await new RequestLogModel({ ip, url, date: now }).save();
    const count = await RequestLogModel.countDocuments({
      ip,
      url,
      date: { $gte: tenSecondsAgo },
    });
    if (count > 5) {
      res.sendStatus(HttpStatus.TooManyRequests);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
