import { Router } from "express";
import { checkDocument } from "../controllers/documents.controller.js";
import { getUrlFile, sendEmail, uploadFile } from '../controllers/google.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/mail',[authjwt.verifyToken], sendEmail)

router.post('/upload', [authjwt.verifyToken, checkDocument], uploadFile)
router.get('/url',getUrlFile)


export default router;