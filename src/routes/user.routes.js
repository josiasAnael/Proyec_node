import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authjwt, verifySingup} from "../middlewares/index.js";
const router = Router() 

router.post('/', [
    authjwt.verifyToken,
    authjwt.isAdmin,
    verifySingup.checkRolesExisted
]  ,userController.createUser)


router.get('/', userController.getUsers)

export default router;