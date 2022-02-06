import User from "../models/User.js"

export const createUser = (req, res)=>{
    const {
        name,
        accountNumber,
        email,
        password,
        career,
        roleId,    
    } = req.body
    const newUser = new User({
        name,
        accountNumber,
        email,
        password,
        career,
        roleId,
    })
    newUser.save()
    .then(user=>{
        res.json(user)
    }
    )
    .catch(err=>{
        res.json(err)
    })


}

export const getUsers = (req, res)=>{
    User.find()
    .then(users =>{
        res.json(users)
    })
    .catch(err =>{
        res.json(err)
    })
}

export const getUser = (req, res)=>{
    User.findById(req.params.id)
    .then(user =>{
        res.json(user)
    })
    .catch(err =>{
        res.json(err)
    })
}

export const updateUser = (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user =>{
        res.json(user)
    })
    .catch(err =>{
        res.json(err)
    })
}


export const deleteUser = (req, res)=>{
    User.findByIdAndUpdate(req.params.id, {status: false}, {new: true})
    .then(user =>{
        res.json(user)
    })
    .catch(err =>{
        res.json(err)
    })
}