import { Router } from "express";
import { sendEmail, uploadFile } from '../controllers/google.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/mail',[authjwt.verifyToken], sendEmail)

router.post('/upload', [authjwt.verifyToken], uploadFile)


export default router;