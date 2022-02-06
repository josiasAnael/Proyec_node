import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../database/config.js'
import Role from '../models/Role.js';


export const  signUp = async(req, res)=>{
    const {username, identity, email, password, career, role} = req.body;
    //Todo validar si ya existe

    
    const newUser = new User({
        username,
        identity,
        email,
        password: await User.encryptPassword(password),
        career,
    }) 

    if (role){
        const foundRoles = await Role.findon({name:role})
        newUser.roles = foundRoles.map(role => role._id)
    }
    else{
        const role = await Role.findOne({name: "user"})    //designa un rol por defecto
        newUser.roles = [role._id]
    }
    
    const savedUser = await newUser.save()
    console.log(savedUser)
    const token = jwt.sign({id: savedUser._id}, config.SECRET ,{
        expiresIn: 86400// 24 horas
    })
    res.status(200).json({user:savedUser, token}) //devolvemos el token
    res.json('signUp')
}

// 3/2/2022
export const  signIn = async(req, res)=>{  //inicio de sesion
    const userFound = await User.findOne({identity: req.body.identity}).populate("roles")//enviamos el rol del usuario
    if (!userFound) return res.status(200).json({Message: "User not found"})
    
    //compara las contraseñas
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    
    if (!matchPassword) return res.status(401).json({token: null, message:' invalid password'})
    
    jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn:86400
    })

    res.json({token})
}