import { Router } from "express";

import { authenticateJWT } from "../../middlewares";
import { list, retrieve } from "../../controllers/previewController";

export default Router()
  .get("/", authenticateJWT, list)
  .get("/:url", authenticateJWT, retrieve);
