import jwt from "jsonwebtoken"
import config from '../database/config.js'
import User from '../models/User.js'
import Role from "../models/Role.js"

export const verifyToken = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        
        if (!token) return res.status(403).json({message:"no token provided"})
        
        console.log("HOLAA")
        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id
        console.log("hola");
        console.log(req.userId);
        console.log("hola");

        const user = await User.findOne({accountnumber: req.userId})
        console.log(user);
        
        if (!user) return res.status(404).json({message:"user no found"})
        //console.log(decoded)
        req.userLogged = user
        next()
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const isAdmin = async (req, res, next) =>{
    try {
        //const user = await User.findById(req.userId)
        const user = await User.findOne({accountnumber: req.userId})
        //console.log("hola")
        const roles = await Role.findById(user.roles)
        console.log(user.roles)
        //console.log(user);
        if (roles.name !== "admin") return res.status(401).json({message:"no autorizado"})
        next()
    } catch (error) {
        res.status(402).json({message: error} )
        console.log("Error en permisos de administrador")
    }
}


export const isUser = async (req, res, next) =>{
    try{
        
        const user = await User.findOne({accountnumber: req.userId})
        console.log(user);
        const roles = await Role.findById(user.roles)
        if (roles.name === "admin") return res.status(403).json({message:"requiere rol de user"})
        next()
    }catch(error){
        res.status(401).json("Error en permisos de Usuario ${error}")   
    }
}