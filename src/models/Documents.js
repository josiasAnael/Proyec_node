import mongoose from 'mongoose';
const { Schema, model } = mongoose;


// const documentSchema = new Schema({
//     name: String,                   //  Nombre del estudiante
//     studentidentity: String,   //  Identidad del estudiante
//     witnessidentityone: String,   //  Identitidad del primer testigo
//     witnessidentitytwo: String,   //  Identitidad del segundo testigo
//     collegetitle: String,   //  Titulo del colegio
//     acceptanceletter: String,   //  Carta de aceptacion
//     fileopening: String,    //  Apertura de expediente
//     residentialrecord: String,    // Ficha residencial
//     practicalrequest: String,    //  Solicitud para la practica
//     revicionControl: String,    //  Control de revision
//     monographguide: String     //Guia de monografia    
// },{
//     timestamps:true,                // guarda la fecha creacion y de actualizacion
//     verisonKey: false              // para cada vez que se crea un documento
// })
const documentSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

},{
    timestamps:true,                // guarda la fecha creacion y de actualizacion
    verisonKey: false              // para cada vez que se crea un documento
})



export default model('Document', documentSchema)


