import { Router } from "express";
import * as DocumentsController from '../controllers/documents.controller.js'
const router = Router()


router.get ('/', DocumentsController.getDocuments)

router.post('/', DocumentsController.createDocument)

router.get('/:id', DocumentsController.getDocumentbyId)

router.put('/:id', DocumentsController.updateDocumentById)

router.delete('/:id', DocumentsController.deleteDocumentById)

export default router;