import { Router } from "express";
import * as authCrotroller from '../controllers/auth.controller'

const router = Router()

router.post('/signup', authCrotroller.signUp)


router.post('/signin', authCrotroller.signIn)



export default router;