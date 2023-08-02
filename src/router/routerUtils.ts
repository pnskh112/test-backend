import { unauthorized } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import httpContext from "express-http-context";

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user == null) {
    next(unauthorized());
  } else {
    next();
  }
};

export const responseSuccess = (res: Response): void => {
  res.status(200).json({ message: "success" });
};

export const headerTimezoneHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timezone = req.get("X-Time-Zone");
  if (timezone != null) {
    httpContext.set("timezone", timezone);
  }
  next();
};
