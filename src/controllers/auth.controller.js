import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../database/config.js'
import Role from '../models/Role.js';


export const  signUp = async(req, res)=>{
    try{
        const {accountnumber,username, email, password, career, roles} = req.body;
    
        //Todo: validar si ya existe
    
        const newUser = new User({
            accountnumber,
            username,
            email,
            password: await User.encryptPassword(password),
            career,
        }) 


        if (req.body.roles){
            const foundRoles = await Role.find({name:{ $in: roles }})
            newUser.roles = foundRoles.map((role) => role._id)
        }   
        else{
            const role = await Role.findOne({name: "user"})    //designa un rol por defecto
            newUser.roles = [role._id]
        }

        // Saving the User Object in Mongodb
        const savedUser = await newUser.save()
        
        
        const token = jwt.sign({id: savedUser.accountnumber}, config.SECRET ,{
            expiresIn: 86400// 24 horas
        })
        res.status(200).json({user:savedUser, token}) //devolvemos el token

    }catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

// 3/2/2022
export const  signIn = async(req, res)=>{  //inicio de sesion
    try {

        const {password, accountnumber}= req.body;
        if (!password) res.status(403).json({message: "password required"});
        if (!accountnumber) res.status(403).json({message: "accountnumber required"});
        const userFound = await User.findOne({accountnumber:accountnumber}).populate("roles")//enviamos el rol del usuario
        console.log(req.body)
        console.log(userFound)
        if (!userFound) return res.status(400).json({message: "User not found"})
        
        //compara las contraseñas
        const matchPassword = await User.comparePassword(password, userFound.password)
        if (!matchPassword) return res.status(401).json({token: null, message:' invalid user or password '})
        
        const token = jwt.sign({id: req.body.accountnumber}, config.SECRET,{
            expiresIn:86400
        })
        // console.log(token);
        res.json({token})
    } catch (error) {
        res.status(404).json(`Inicio de sesion no valido ${error} `)
        console.log(error)
    }
}