import { Router } from "express";
import * as DocumentsController from '../controllers/documents.controller.js'
import {authjwt} from "../middlewares/index.js";


const router = Router()



// router.get ('/',[authjwt.verifyToken, authjwt.isAdmin] ,DocumentsController.getDocuments)
// router.post('/',[authjwt.verifyToken, authjwt.isUser],DocumentsController.createDocument)

router.get('/:id?',[authjwt.verifyToken],DocumentsController.getDocumentbyUserId)

router.put('/:id', [authjwt.verifyToken],DocumentsController.updateStatusDocument)

router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin], DocumentsController.deleteDocumentById)

export default router;