
import { GoogleMailService } from "../services/googleMail.js";
import { GoogleDriveService } from "../services/googleDrive.js";


export const sendEmail = async (req, res) => {
  try {

    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;
    const service =new GoogleMailService (CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);
    const user = req.userLogged;
    let contentHTML = ``;
    contentHTML += `<h1>Hola ${req.body.name}</h1>`;
    service.sendMail(user.email, contentHTML, "Bienvenido a la pagina web de Unicah").then(response => {
      res.status(200).json(response);
    }).catch(err => {
      res.status(500).json(err);
    });
  } catch (er) {
    console.log(er) 
    return res.status(401).json(er)
     
  }
};

//<!------------GOOGLE DRIVE----------!>
export const uploadFile = async (req, res)  => {
  try {
    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;

    const service = new GoogleDriveService(CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);

    const user = req.userLogged;

    let folderId = await service.searchFolder(user.accountnumber);

    if (!folderId) {
      folderId = await service.createFolder(user.accountnumber);
    }

    const file = await service.uploadFile(req.file, folderId);

    res.json({
      message: "Archivo subido",
      file,
    });


  } catch (error) {
    console.status(401).json({ message: "error al crear el folder" `${error}`})  
  }
};

