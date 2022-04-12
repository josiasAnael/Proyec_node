import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const documentSchema = new Schema({
    name: { type: String, required: true},
    url: { type: String, required: true},
    status: { type: String, default: 'Pending', enum: ['Pending','Sending', 'Approved', 'Deprecated'] },
    user: { type: Schema.Types.String, ref: 'User' },
    feedback: { type: String, default: '' },

},{
    timestamps:true,              
    verisonKey: false     
})



export default model('Document', documentSchema)


