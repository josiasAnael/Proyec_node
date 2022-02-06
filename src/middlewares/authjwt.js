import jwt from "jsonwebtoken"
import config from '../database/config.js'
import User from '../models/User.js'
import Role from "../models/Role.js"

export const verifyToken = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]


        if (!token) return res.status(403).json({message:"no token provided"})
       

        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({message:"user no found"})

        //console.log(decoded)
        next()
    } catch (error) {
        return res.status(401).json({message: 'No autorizado'})
    }
}
export const isAdmin = async (req, res, next) =>{
    const user = await User.findById(req.userId)
    console.log(user);
    const role = await Role.findById(user.role)
    if (role.name !== "admin") return res.status(401).json({message:"no autorizado"})
    next()

    // console.log(roles)
    
    // return res.status(403).json({message:"requiere rol de admin"})
    
}

export const isUser = async (req, res, next) =>{
    const user = await User.findById(req.userId)
    if (user.rol.name!=="admin") next()
    return res.status(403).json({message:"requiere rol de admin"})  
}