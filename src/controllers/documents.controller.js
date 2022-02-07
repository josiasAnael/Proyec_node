 import Document from '../models/Documents.js'
import User from '../models/User.js'


const typeDocument = [
    "studentidentity",  
    "witnessidentityone",
    "witnessidentitytwo", 
    "collegetitle" , 
    "acceptanceletter", 
    "fileopening" , 
    "residentialrecord", 
    "practicalrequest", 
    "revicionControl", 
    "monographguide",
]


//crear el documento
export const createDocument = async (req, res)=>{
    //const{name, studentidentity,  witnessidentityone, witnessidentitytwo, collegetitle , acceptanceletter, fileopening , residentialrecord, practicalrequest, revicionControl, monographguide} = req.body
    //const newDocument = new Document({name, studentidentity,  witnessidentityone, witnessidentitytwo, collegetitle , acceptanceletter, fileopening , residentialrecord, practicalrequest, revicionControl, monographguide})
    const{name, url} = req.body
    if (!name || !url) return res.status(400).json({message: "name and url are required"})
    if(typeDocument.indexOf(name) < 0) return res.status(400).json({message:"nombre de documento no valido"})
    const documents = Document.findOne({name, user: req.userId})
    if(documents) return res.status(400).json({message: 'el documento ya existe'})
    const newDocument = new Document({name, url, user: req.userId})
    const documentSaved = await newDocument.save()
    res.status(201).json(documentSaved)
}

//obtener documentos
export const getDocuments = async (req, res)=>{
    //retornar todos los documentos por usuario 
    let dataReturn = []
    const users = await User.find()
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const documents = await Document.find({user: user._id})
        dataReturn.push({user: user._doc, documents})
    }
   

   
    // const document = await Document.find()
    return res.json(dataReturn)
}

//obtener documento por Id
export const getDocumentbyId = async (req, res)=>{
    const document = await Document.findById(req.params.id)
    res.status(200).json(document)
}

//Actulizar el documento por Id
export const updateDocumentById = async (req, res)=>{
    const updateDocument = await Document.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updateDocument) //no hay contenido pero a sido satisfactorio
}

//Eliminar el documento por Id
export const deleteDocumentById = async (req, res)=>{
    const {id} = req.params
    await Document.findByIdAndDelete(id)
    res.status(200).json()
}

