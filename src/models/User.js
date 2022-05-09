import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import bcrypt from 'bcryptjs';


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
    email:{
        type: String,
        unique:false,
        trim: true,
    },
    password:{ 
        type: String,
        required: false,
        trim: true,
    },
    career:{  
        type: String,
        unique:false
    },
    roles:{
        type: Schema.Types.ObjectId,
        ref: "Role",
        
    },
    InitPractice:{
        type: Date,
        default: Date.now()
    },
    EndPractice:{
        type: Date,
        default: (Date.now() + (1000 * 60 * 60 * 24 * 90))
    },
    status:{
        type: Boolean,
        default: true
    },
    code:{
        type: Number,
        default: 0
    }
},{
        timestamps: true,
        versionKey: false,
    }
)

userSchema.statics.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSaltSync(10) 
    return await bcrypt.hashSync(password, salt)
}


userSchema.statics.comparePassword = async (password, receviedPassword)=>{
    return await bcrypt.compare(password, receviedPassword)
} 


export default model('User', userSchema);