import { Router } from "express";
import { checkDocument ,createDocument,isExist,updateDocumentById} from "../controllers/documents.controller.js";
import { getUrlFile, sendEmail, uploadFile,deleteFile } from '../controllers/google.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()
router.post('/mail',[authjwt.verifyToken], sendEmail)

router.post('/upload', [authjwt.verifyToken, checkDocument, uploadFile],createDocument)
router.post('/upload/:id', [authjwt.verifyToken, isExist ,deleteFile, uploadFile], updateDocumentById)
router.get('/url',getUrlFile)


export default router;