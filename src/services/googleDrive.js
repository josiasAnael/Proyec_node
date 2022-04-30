
import fs from "fs";
import {google} from 'googleapis';

export class GoogleDriveService{
    constructor(clientId, clientSecret, redirectUri, refreshToken){
        this.driveClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
    }

    createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
        var client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        client.setCredentials({ refresh_token: refreshToken });
        return google.drive({
            version: 'v3',
            auth: client,
        });
    };
    createFolder (folderName) {
        return this.driveClient.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: ['1wJcCAHvew3tBs6S1vLCuvQGcIalICpWw'],
            },
            fields: 'id, name',
        });
    };
    searchFolder (folderName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driveClient.files.list({
                q: "mimeType='application/vnd.google-apps.folder' and name='".concat(folderName, "'"),
                fields: 'files(id, name)',
            }, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res.data.files ? res.data.files[0] : null);
            });
        });
    };
    saveFile(fileName, filePath, fileMimeType, folderId) {
        return this.driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : [],
            },
            media: {
                mimeType: fileMimeType,
                body: fs.createReadStream(filePath),
            },
        });
    };
    getFile(fileId) {
        return this.driveClient.files.get({
            fileId: fileId,
            alt: 'media',
        });
    }

    getAllFiles(folderId) {
        return this.driveClient.files.list({
            q: "mimeType != 'application/vnd.google-apps.folder' and '".concat(folderId, "' in parents"),
            fields: 'files(id, name)',
        });
    }
} 

