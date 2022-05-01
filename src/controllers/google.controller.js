
import { GoogleMailService } from "../services/googleMail.js";
import { GoogleDriveService } from "../services/googleDrive.js";
import { createDocument } from "./documents.controller.js";


export const sendEmail = async (req, res) => {
  try {
    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;
    const service =new GoogleMailService();
    await service.init(CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);
    const user = req.userLogged;
    let contentHTML = ``;
    contentHTML += `<h1>Hola ${user.username}</h1>`;
    console.log('user', user)
    service.sendMail(user.email, contentHTML, "Bienvenido a la pagina web de Unicah").then((response) => {
      res.status(200).json({
        message: "Email enviado correctamente",
      });
    }).catch((error) => {
      res.status(500).json({
        message: "Error al enviar el email",
        error: error,
      });
    }); 
    
  } catch (error) {
    res.status(401).json({ message: `error ${error}`})  
     
  }
};

//<!------------GOOGLE DRIVE----------!>
export const uploadFile = async (req, res)  => {
  try {
    const{file}= req.files
    const{name}= req.body

    if(!file){
      return res.status(400).json({
        message: "No se ha enviado el archivo",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "No se ha enviado el nombre del archivo",
      });
    }
    if(/(.pdf)$/i.test(file.name)==false){
      return res.status(400).json({
        message: "El archivo no es un pdf",
      });
    }
    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;

    const service = new GoogleDriveService(CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);

    const user = req.userLogged;

    let folderId = await service.searchFolder(user.accountnumber);

    if (!folderId) {
      folderId = await service.createFolder(user.accountnumber);
    }
    const fileuploaded = await service.saveFile(`${name}.pdf`, file.tempFilePath, file.mimetype, folderId);
    req.body.fileId = fileuploaded.id;
    createDocument(req, res);
  } catch (error) {
    res.status(401).json({ message: `error al crear el folder ${error}`})  
  }
};


export const getUrlFile = async (req, res) => {
  try {
    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;
    const service = new GoogleDriveService(CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);
    const {fileId} =  req.query;
    const url = await service.getUrl(fileId);
    res.status(200).json(url);
  } catch (error) {
    res.status(401).json({ message: `error al obtener el folder ${error}`})  
  }
}

