
import { GoogleMailService } from "../services/googleMail.js";
import { GoogleDriveService } from "../services/googleDrive.js";


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
    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;

    const service = new GoogleDriveService(CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN);

    const user = req.userLogged;

    let folderId = await service.searchFolder(user.accountnumber);

    if (!folderId) {
      folderId = await service.createFolder(user.accountnumber);
    }
    const fileuploaded = await service.saveFile(file.name, file.tempFilePath, file.mimetype, folderId);

    res.json({
      message: "Archivo subido",
      fileuploaded,
    });


  } catch (error) {
    res.status(401).json({ message: `error al crear el folder ${error}`})  
  }
};

