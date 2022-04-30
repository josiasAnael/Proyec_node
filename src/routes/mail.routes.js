import { Router } from "express";
import * as EmailController from '../controllers/email.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/',[authjwt.verifyToken], EmailController.sendEmail)

router.post('/upload', [authjwt.verifyToken], EmailController.uploadFile)


export default router;