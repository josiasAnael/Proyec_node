//import { Router } from 'express'
import { createTransport } from 'nodemailer'
import { google } from 'googleapis'
import emailSchema from '../models/email.js'
import User from '../models/User.js'


// router.post('/send-email', (req,res)=>{
const {CLIENT_ID, CLIENT_SECRET, REDITECT_URL,REFRESH_TOKEN} = process.env
const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDITECT_URL)
    

export const sendEmail = (req,res)=>{
    const {title , description,user} = req.body
    
    contentHTML = `
        <h1>Hola hermosa<h1>
        <ul>
            <li> </li>
            <li> Url: ${description}</li>
            <li> Desde: ${user}</li> 
        </ul>
        <p> ${message}</p>
    `;
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
    async function sendMail(){
        try {
            const accessToken= await oAuth2Client.getAccessToken()
            const tranporter= createTransport({
                service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:"josias199749@gmail.com",
                    clientId:CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                   }
            })
            
            //const email = await User({email = })

            const mailOptions={
                from:"pagina web Unicah <josias199749@gmail.com>",
                to: 'josias199749@gmail.com',
                subject :"Prueba numero 3",
                html: contentHTML,
                //distintos tipos de datos https://nodemailer.com/message/attachments/
                attachments: [{
                    filename: 'TitulodelcolegioJosiasMartinez.pdf',
                    path: 'C:/Users/josia/Desktop/Unicah practic profecional/ACTIVIDADES/node-send-email/documents/TitulodelcolegioJosiasMartinez.pdf',
                    contentType: 'application/pdf'
                  }],
                function (err, info) {
                    if (err) { 
                      console.error(err);
                    } else {
                      console.log(info);
                    }
                }                
            
            }
            const result = await tranporter.sendMail(mailOptions)
        } catch (er) {
            console.log(er)
        }
    }
    sendMail()
    .then((result)=>res.status(200).send('Enviado'))
    .catch((error)=>console.log(error.message))
}

export const createFolder = (req, res) =>{
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
    const drive = google.drive({ version: 'v3', auth: oAuth2Client })
    
    var fileMetadata = {
        'name': 'Invoices',
        'mimeType': 'application/vnd.google-apps.folder'
      };
      drive.files.create({
        resource: fileMetadata,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
            res.json({message:"carpeta creada"})
         // console.log('Folder Id: ', file.id);
        }
      });
}