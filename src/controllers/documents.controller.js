 import Document from '../models/Documents'


//crear el documento
export const createDocument = async (req, res)=>{
    const{name, studentidentity,  witnessidentityone, witnessidentitytwo, collegetitle , acceptanceletter, fileopening , residentialrecord, practicalrequest, revicionControl, monographguide} = req.body
    const newDocument = new Document({name, studentidentity,  witnessidentityone, witnessidentitytwo, collegetitle , acceptanceletter, fileopening , residentialrecord, practicalrequest, revicionControl, monographguide})
    console.log(req.body)
    
    const documentSaved = await newDocument.save()
    res.status(201).json(documentSaved)
}

//obtener documentos
export const getDocuments = async (req, res)=>{
    const document = await Document.find()
    res.json(document)
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

