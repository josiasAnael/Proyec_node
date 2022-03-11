import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../database/config.js'
import Role from '../models/Role.js';

export const createUser = async (req, res)=>{
    try{
        const {_id,username,email,password,career,roles} = req.body

        const newUser = new User({ 
            accountNumber,
            username,
            email,
            password,
            career,
        })

         // encrypting password
        newUser.password = await User.encryptPassword(newUser.password);
        console.log(req.body.roles)

        if (req.body.roles){
            const foundRoles = await Role.find({name:{ $in: roles }})
            newUser.roles = foundRoles.map((role) => role._id)
        }
        else{
            const role = await Role.findOne({name: "user"})    //designa un rol por defecto
            newUser.roles = [role._id]
        }

        // saving the new user
        newUser.save();
        
    }catch (error) {
      res.status(404).json(`Error al crear un usuario: ${error}`);
    }
}

export const getUsers = (req, res)=>{
    try {
        User.find()
        .then(users =>{
            res.json(users)
        })
        .catch(err =>{
            res.json(err)
        })
    } catch (error) {
        res.status(401).json("Error al obtener los usuario: ${error}")      
    }
}

export const getUser = (req, res)=>{
    try {
    
        User.findById(req.params.id)
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
    }
    catch(error){
        res.status(401).json(`Error al obtener el usuario ${error}`)
    }
}

export const updateUser = (req, res)=>{
    try {
        
       User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
    } catch (error) {
        res.status(401).json(`Error al actualizar el usuario ${error}`)      
    }    
}


export const deleteUser = (req, res)=>{
    try{
        User.findByIdAndUpdate(req.params.id, {status: false}, {new: true})
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
    } catch (error) {
        res.status(401).json(`Error al eliminar el usuario ${error}`)      
    }
}