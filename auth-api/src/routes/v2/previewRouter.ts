import { Router } from "express";

import { authenticateJWT } from "../../middlewares";
import { retrieve } from "../../controllers/previewController";

export default Router().get("/", authenticateJWT, retrieve);
