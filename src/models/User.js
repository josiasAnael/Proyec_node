import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import bcrypt from 'bcryptjs';

//me falta poner las fecha en que inicia la practica
const userSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    identity:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique:true
    },
    password:{ 
        type: String,
        required: true
    },
    career:{        //carrera estudia
        type: String,
        unique:true
    },
    roles:[{
        ref: "Role", //ref esta relacionado con otro modelo 
        type: Schema.Types.ObjectId,
    }]
},{
        timestamps: true,
        versionKey: false,
    }
)

userSchema.statics.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSaltSync(10) //metodo para aplicar un algoritmo que le damos al recorrido de cifrado
    return await bcrypt.hashSync(password, salt)
} //metodo para hacer un cifrado, retorna un true o un false


userSchema.statics.comparePassword = async (password, receviedPassword)=>{
    return await bcrypt.compare(password, receviedPassword)
} //metodo  comparar contraseña, retorna un true o un false


export default model('User', userSchema);