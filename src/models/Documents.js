import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const documentSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending','Sending', 'Approved', 'Deprecated'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

},{
    timestamps:true,                // guarda la fecha creacion y de actualizacion
    verisonKey: false              // para cada vez que se crea un documento
})



export default model('Document', documentSchema)


