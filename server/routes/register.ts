import Router from "express";
const router = Router();
import register from "../controllers/guest/register.js";
import type { RegisterBody } from "../types/express.js";
router.get("/", async (req, res) => {
  let body: RegisterBody = req.body;
  const response = await register({ ...body, session: req.session });

  return res.status(200).send(response);
});

export default router;
