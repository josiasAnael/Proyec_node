import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    name: String,                   //  Nombre del estudiante
    studentidentity: String,   //  Identidad del estudiante
    witnessidentityone: String,   //  Identitidad del primer testigo
    witnessidentitytwo: String,   //  Identitidad del segundo testigo
    collegetitle: String,   //  Titulo del colegio
    acceptanceletter: String,   //  Carta de aceptacion
    fileopening: String,    //  Apertura de expediente
    residentialrecord: String,    // Ficha residencial
    practicalrequest: String,    //  Solicitud para la practica
    revicionControl: String,    //  Control de revision
    monographguide: String     //Guia de monografia    
},{
    timestamps:true,                // guarda la fecha creacion y de actualizacion
    verisonKey: false              // para cada vez que se crea un documento
})



export default model('Document', documentSchema)