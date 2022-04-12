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
    try{
        const{name, url} = req.body
        if (!name || !url) return res.status(400).json({message: "name and url are required"})
        if(typeDocument.indexOf(name) < 0) return res.status(400).json({message:"nombre de documento no valido"})
        
        const user = await User.findOne({a: req.userId})
        
        const documents = Document.find({name, user: user._id})
        console.log(user._id);
        
        
        if((await documents).length) {
            return res.status(400).json({message: 'el documento ya existe'})
        }
        else{
            const newDocument = new Document({name, url, user: user._id})
            const documentSaved = await newDocument.save()
            res.status(201).json(documentSaved)
        }
    }
    catch(error){
        res.status(401).json(`Error al crear un documento ${error}`)
    }
}

//obtener documentos
export const getDocuments = async (req, res)=>{
    //retornar todos los documentos por usuario 
    try {   
        let dataReturn = []
        const users = await User.find()
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            const documents = await Document.find({user: user._id})
            dataReturn.push({user: user._doc, documents})
        }   
        // const document = await Document.find()
        return res.json(dataReturn)
    } catch (error) {
    res.status(401).json("error al obtener documentos", error)   
    }
}   

//obtener documento por Id
export const getDocumentbyId = async (req, res)=>{
    try {

        const document = await Document.findById(req.params.id)
        res.status(200).json(document)

    } catch (error) {
        res.status(401).json(`error al obtener Id Documento ${error}`)   
    }
}

//Actulizar el documento por Id
export const updateDocumentById = async (req, res)=>{
    try{
        const updateDocument = await Document.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updateDocument) //no hay contenido pero a sido satisfactorio
    
    } catch (error) {
        res.status(401).json(`error actualizar un documento ${error}`)
    }
}

//Actulizar el status del documento
export const updateStatusDocument = async (req, res)=>{
    try{
        const updateDocument = await Document.findByIdAndUpdate(req.params.id, {status: req.body.status}, {
            new: true
        })
        res.status(200).json(updateDocument) //no hay contenido pero a sido satisfactorio

    } catch (error) {
        res.status(401).json(`error actualizar un documento ${error}`)
    }
}


//Eliminar el documento por Id
export const deleteDocumentById = async (req, res)=>{
    try {     
        const {id} = req.params
        await Document.findByIdAndDelete(id)
        res.status(200).json()
           
    } catch (error) {
        res.status(401).json(`error al eliminar un documentos ${error}`)   
    } 
}

