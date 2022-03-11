import { Router } from "express";
import * as EmailController from '../controllers/email.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/',[authjwt.verifyToken], EmailController.sendEmail)

router.post('/CreateFolder', [authjwt.verifyToken], EmailController.createFolder)

router.get('/AllFolder',EmailController.readFiles)

export default router;