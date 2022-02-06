import { Router } from "express";
import * as DocumentsController from '../controllers/documents.controller.js'
import {authjwt} from "../middlewares/index.js";

const router = Router()


router.get ('/', DocumentsController.getDocuments)

router.post('/', /*[authjwt.verifyToken, authjwt.isUser]*/DocumentsController.createDocument)

router.get('/:id', DocumentsController.getDocumentbyId)

router.put('/:id', [authjwt.verifyToken, authjwt.isAdmin],DocumentsController.updateDocumentById)

router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin], DocumentsController.deleteDocumentById)

export default router;