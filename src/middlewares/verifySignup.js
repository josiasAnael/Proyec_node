//validator de token o si existe
import { ROLES } from "../models/Role.js"
import User from "../models/User.js"

// validar si el usuario ya existe
export const checkBuplicateUserOrEmail =async (req,res,next)=>{
    const user = await User.findOne({username: req.body.username})
    if (user) return res.status(400).json({message: 'The usuario ya existe'})

    
    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: 'The email ya existe'})
    
    
    next()
}


//validar si el rol que se testea existe
export const checkRolesExisted =(req,res,next) => {
    if(req.body.roles){
        for(let i=0; req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                    return res.status(400).json({
                        message: `El Rol ${req.body.roles[i]} no existe`
                    })
            }
        }
    }
    next()  
}


