import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const ROLES =["user", "admin"]

 const roleShema = new Schema({
    
     name: String 
 },{
     versionKey: false
 })

 export default model("Role", roleShema)