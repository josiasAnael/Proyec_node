import mongoose from 'mongoose';
const { Schema, model } = mongoose;

 const roleShema = new Schema({
    
     name: String 
 },{
     versionKey: false
 })

 export default model("Role", roleShema)