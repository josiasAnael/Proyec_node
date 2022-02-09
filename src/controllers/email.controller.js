//import { Router } from 'express'
import { createTransport } from "nodemailer";
import { google } from "googleapis";
import emailSchema from "../models/email.js";
import User from "../models/User.js";

// router.post('/send-email', (req,res)=>{

export const sendEmail = async (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDITECT_URL
  );

  const { title, description, user } = req.body;

  let contentHTML = `
        <h1>Hola hermosa<h1>
        <ul>
            <li> </li>
            <li> Url: </li>
            <li> Desde:</li> 
        </ul>
        <p> </p>
    `;
  try {
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

    //const email = await User({email = })

    const mailOptions = {
      from: "pagina web Unicah <josias199749@gmail.com>",
      to: "josias199749@gmail.com",
      subject: "Prueba numero 3",
      html: contentHTML,
      //distintos tipos de datos https://nodemailer.com/message/attachments/
      // attachments: [
      //   {
      //     filename: "TitulodelcolegioJosiasMartinez.pdf",
      //     path: "C:/Users/josia/Desktop/Unicah practic profecional/ACTIVIDADES/node-send-email/documents/TitulodelcolegioJosiasMartinez.pdf",
      //     contentType: "application/pdf",
      //   },
      // ],
      function(err, info) {
        if (err) {
          res.status(400).json({
            message: "Error al enviar el email",
            error: err,
          });
          console.error(err);
        } else {
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
    console.log(er);
    res.status(400).json({
      message: "Error al enviar el email",
      er,
    });
  }
};

export const createFolder = (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDITECT_URL
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  // console.log('Authorize this app by visiting this url:', authUrl);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  console.log(req.userLogged);

  var fileMetadata = {
    name: req.userLogged.email,
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1wJcCAHvew3tBs6S1vLCuvQGcIalICpWw"],
  };
  drive.files.create(
    {
      resource: fileMetadata,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        res.json({ message: "carpeta creada", file });
        // console.log('Folder Id: ', file.id);
      }
    }
  );
};

export const readFiles = (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET, REDITECT_URL, REFRESH_TOKEN } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDITECT_URL
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  // console.log('Authorize this app by visiting this url:', authUrl);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    },
    function (err, respoce) {
      if (err) {
        console.error(err);
      } else {
        res.json({ message: "exito", file: respoce });
      }
    }
  );
};
