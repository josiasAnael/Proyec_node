import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const notificationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Redding', 'Pending'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },   
},{
    timestamps:true,                // guarda la fecha creacion y de actualizacion
    verisonKey: false              // para cada vez que se crea un documento
})


export default model('Notification', notificationSchema)