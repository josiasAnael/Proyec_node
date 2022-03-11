import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import bcrypt from 'bcryptjs';

//me falta poner las fecha en que inicia la practica
const userSchema = new Schema({
    username:{
        type: String,
        unique: false
    },
    accountnumber:{
        type: String,
        unique: true,
        trim: true,
    },
    email:{ //correo institucional
        type: String,
        unique:false,
        trim: true,
    },
    password:{ 
        type: String,
        required: false,
        trim: true,
    },
    career:{        //carrera estudia
        type: String,
        unique:false
    },
    folderId:{
        type: String,
        default:""
    },
    roles:{
        type: Schema.Types.ObjectId,
        ref: "Role", //ref esta relacionado con otro modelo 
        
    },
    InitPractice:{
        type: Date,
        default: Date.now()
    },
    EndPractice:{
        type: Date,
        // default: Date.now()
    },
    status:{
        type: Boolean,
        default: true
    },
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