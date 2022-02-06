import { Router } from "express";
import * as authCrotroller from '../controllers/auth.controller.js'
import { verifySingup } from "../middlewares/index.js";

const router = Router()

router.post('/signup',[verifySingup.checkBuplicateUserOrEmail, verifySingup.checkRolesExisted] ,authCrotroller.signUp)


router.post('/signin', authCrotroller.signIn)



export default router;