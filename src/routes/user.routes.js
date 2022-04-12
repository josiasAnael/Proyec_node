import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authjwt, verifySingup} from "../middlewares/index.js";

const router = Router() 

/* Crear Usuario */
router.post('/createUser', [
    authjwt.verifyToken,
    authjwt.isAdmin,
    verifySingup.checkRolesExisted
], userController.createUser)

/* Ontener Usuario */
router.get('/',[
    authjwt.verifyToken,
    authjwt.isAdmin,
], userController.getUsers)


/* update Usuario */
router.put('/updateUser/:id', [
    authjwt.verifyToken,
    authjwt.isAdmin,
], userController.updateUser)


/* update password */
router.put('/updatePassword/:id', [
    authjwt.verifyToken,
    authjwt.isAdmin,
], userController.updatePassword)


export default router;