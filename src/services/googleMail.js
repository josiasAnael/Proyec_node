
import {google} from 'googleapis';
import { createTransport } from "nodemailer";

export class GoogleMailService{
    constructor(clientId, clientSecret, redirectUri, refreshToken){
        this.mailClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
    }

    async createMailClient(clientId, clientSecret, redirectUri, refreshToken)  {

        const oAuth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
          );

        oAuth2Client.setCredentials({ refresh_token: refreshToken });
        const accessToken = await oAuth2Client.getAccessToken();
        return createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "josias199749@gmail.com",
              clientId: clientId,
              clientSecret: clientSecret,
              refreshToken: refreshToken,
              accessToken: accessToken,
            },
        });
    };

    sendMail(email, contentHTML, subject) {
        var _this = this;
        return Promise(function (resolve, reject) {
            _this.mailClient.sendMail({
                from: `pagina web Unicah <${email}>`,
          to: email,
          subject: subject,
          html: contentHTML,
          function(err, info) {
            if (err) {
                return reject({
                    message: "Error al enviar el email", message: "Error al enviar el email 1",
                    error: err,
                  });
            }else {
             return resolve({
                message: "Email enviado",
                info,
              });
            }
          },
            });

        });
    }
    
}