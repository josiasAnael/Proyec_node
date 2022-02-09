import { Router } from "express";
import * as EmailController from '../controllers/email.controller.js'

const router = Router()
router.post('/',EmailController.sendEmail)

router.post('/drive', EmailController.createFolder)

export default router;