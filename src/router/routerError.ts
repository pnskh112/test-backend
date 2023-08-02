import { internal, isBoom } from "@hapi/boom";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err != null) {
    if (isBoom(err)) {
      res.status(err.output.statusCode);
      res.send(err.output.payload);
    } else {
      res.status(500);
      res.send(internal().output.payload);
    }
  }
};
