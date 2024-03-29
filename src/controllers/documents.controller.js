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


export const checkDocument = async (req, res, next) => {
    try {
        const {name } = req.body;
        //devolver el usuario logeado
        

        const user = req.userLogged;
        if (!name ) return res.status(400).json({message: "name and fileId are required"})
        if(typeDocument.indexOf(name) < 0) return res.status(400).json({message:"nombre de documento no valido"})
        const document = await Document.findOne({ name, user: user._id  });
        if (document) {
            return res.status(400).json({
                message: "El documento ya existe",
            });
        }
        next();
    } catch (error) {
        console.log(error)
    }
}
export const isExist = async (req, res, next) => {
    try {
        const {name } = req.body;
        //devolver el usuario logeado

        const user = req.userLogged;
        if (!name ) return res.status(400).json({message: "name and fileId are required"})
        if(typeDocument.indexOf(name) < 0) return res.status(400).json({message:"nombre de documento no valido"})
        const document = await Document.findOne({ name, user: user._id  });
        if (!document) {
            return res.status(400).json({
                message: "El documento no existe",
            });
        }
        req.body.documentId = document._doc._id;
        next();
    } catch (error) {
        console.log(error)
    }
}

//crear el documento
export const createDocument = async (req, res)=>{
    try{
        const{name, fileId} = req.body
        const user = req.userLogged;
        const newDocument = new Document({name, fileId, user: user._id})
        const documentSaved = await newDocument.save()
        res.status(201).json(documentSaved)
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

//obtener documento del usuario logeado


export const getDocumentbyUserId = async (req, res)=>{
    try {
        
        const user = req.userLogged;
        if (!user) return res.status(400).json({message: "user is required"})
        if(user.roles.name=="admin"){
            const {id } = req.params
            const [userfind] = await User.find({
                accountnumber: id
            })

            if(!userfind) return res.status(400).json({message: "user not found"})
            console.log(userfind._id);
            const documents = await Document.find({user: userfind._id})
            console.log(documents);
            res.status(200).json(documents)
        }
        else{
            const documents = await Document.find({user: user._id})
            res.status(200).json(documents)
        }
    } catch (error) {
        res.status(401).json(`error al obtener Id Documento ${error}`)   
    }
}

//Actulizar el documento por Id
export const updateDocumentById = async (req, res)=>{
    try{
        const {fileId,documentId} = req.body
        const updateDocument = await Document.findByIdAndUpdate(documentId, {fileId, status: 'Pending'}, {new: true})
        res.status(200).json(updateDocument) //no hay contenido pero a sido satisfactorio
    
    } catch (error) {
        res.status(401).json(`error actualizar un documento ${error}`)
    }
}

//Actulizar el status del documento
export const updateStatusDocument = async (req, res)=>{
    try{

        const { status , feedback} = req.body
        const updateDocument = await Document.findByIdAndUpdate(req.params.id, {status,feedback}, {
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

