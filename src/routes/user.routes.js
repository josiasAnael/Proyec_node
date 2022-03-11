import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authjwt, verifySingup} from "../middlewares/index.js";
const router = Router() 
router.post('/createUser', [
    authjwt.verifyToken,
    authjwt.isAdmin,
    verifySingup.checkRolesExisted
], userController.createUser)


router.get('/',[
    authjwt.verifyToken,
    authjwt.isUser,
], userController.getUsers)


export default router;