import formidable from "formidable-serverless";
import { createReadStream } from "fs";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import parseForm from "./parseForm";
import * as gcs from "./gcs";
import { Response } from "express";

export const method1 = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | Response
) => {
  const form = formidable();

  const { files } = await parseForm(form, req);

  const file = files.file as any;

  createReadStream(file.path)
    .pipe(gcs.createWriteStream(file.name, file.type))
    .on("finish", () => {
      res.status(200).json("File upload complete");
    })
    .on("error", (err) => {
      console.error(err.message);
      res.status(500).json("File upload error: " + err.message);
    });
};
