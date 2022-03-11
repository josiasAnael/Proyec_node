//validator de token o si existe
import { ROLES } from "../models/Role.js"
import User from "../models/User.js"

// validar si el usuario ya existe
export const checkBuplicateUserOrEmail =async (req,res,next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if (user) return res.status(400).json({message: 'The usuario ya existe'})


        const accountNumbers = await User.findOne({_id: req.body._id})
        if (accountNumbers) return res.status(400).json({message: 'La identidad ya existe'})


        next()
    }catch(error){
        res.status(401).json(`Usuario o Identidad duplicado ${error}`)   
    }
}

//validar si el rol que se testea existe
export const checkRolesExisted =(req,res,next) => {
    if(req.body.role){
        for(let i=0; req.body.role.length; i++){
            if(!ROLES.includes(req.body.role[i])){
                    return res.status(400).json({
                        message: `El Rol ${req.body.role[i]} no existe`
                    })
            }
        }
    }
    next()  
}


