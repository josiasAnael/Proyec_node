import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../database/config'
import Role from '../models/Role';


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

export const  signIn = async(req, res)=>{  //inicio de sesion
    res.json('signIn')
}