
import { createTransport } from "nodemailer";
import { google } from "googleapis";
// import emailSchema from "../models/email.js";
import User from "../models/User.js";

// import documentSchema from "../models/document.js";


export const sendEmail = async (req, res) => {
  try {

    const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDITECT_URL
    );
      //console.log(userLogged._id)
      console.log(User._id)
    const email1 = await User.findOne(req)
 
    const email2 = User.find(email1._id)
    console.log(email2._id);
    // documentSchema.find

    /* enviar los pdf por correo*/
    // let contentHTML = `
    // <h1>Hola ${email2.username}</h1>
    // <p>
    // <h2>Estos son los pdf que has subido</h2>
    // <ul>
    //   <li>${documentSchema.name}</li>
    //   <li>${documentSchema.status}</li>
    //   <li>${documentSchema.feedback}</li>
    // </ul>
    // </p>
  
    // `;

    let contentHTML = ``;

    

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    const tranporter = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "josias199749@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    //console.log(req.userLogged)
    const mailOptions = {
      from: "pagina web Unicah <req.userLogged.email>",
      to: req.userLogged.email,
      subject: "Prueba numero 4",
      html: contentHTML,
      function(err, info) {
        if (err) {
          res.status(400).json({
            message: "Error al enviar el email", message: "Error al enviar el email 1",
            error: err,
          });
          console.error(err);
        }else {
          res.status(200).json({
            message: "Email enviado",
            info: info,
          });
          console.log(info);
        }
      },
    };
    const result = await tranporter.sendMail(mailOptions);
    res.json({
      message: "Email enviado",
      result,
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

