import { Router } from "express";
import * as EmailController from '../controllers/email.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/',EmailController.sendEmail)

router.post('/drive', [authjwt.verifyToken],EmailController.createFolder)

export default router;