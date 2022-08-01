import { Router } from "express";

import { authenticateJWT, authorizeJWT } from "../../middlewares";
import { list, retrieve } from "../../controllers/previewController";

export default Router()
  .post("/", authenticateJWT, list)
  .post("/:url", authorizeJWT, retrieve)
  .get("/", list)
  .get("/:url", retrieve);
