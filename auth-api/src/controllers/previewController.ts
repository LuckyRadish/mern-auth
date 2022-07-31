import { RequestHandler } from "express";
import StatusCode from "status-code-enum";
import urlMetadata from "url-metadata";

import { Metadata } from "../models/Metadata";

export const retrieve: RequestHandler = async (req, res, next) => {
  const { url } = req.query;
  try {
    const result = await Metadata.findOne({ url });
    if (!result) {
      const metadata = await urlMetadata(url as string);
      await new Metadata({ url, metadata }).save();
      res.json({ metadata });
    } else {
      res.json({ metadata: result.metadata });
    }
  } catch (err) {
    res
      .status(StatusCode.ClientErrorNotFound)
      .json({ message: "Url not found." });
  }
};
