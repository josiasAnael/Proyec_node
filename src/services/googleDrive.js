
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
    async createFolder (folderName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driveClient.files.create({
                resource: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: ['1mhtE0OTWducbSm-dofFiKrCQYdPkt9oQ'],
                },
                fields: 'id, name',
            },  function(err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res.data.id);
            });

        })
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
                return resolve(res.data.files.length>0 ? res.data.files[0].id : null);
            });
        });
    };
    saveFile(fileName, filePath, fileMimeType, folderId) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.driveClient.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: fileMimeType,
                    parents: folderId ? [folderId] : [],
                },
                media: {
                    mimeType: fileMimeType,
                    body: fs.createReadStream(filePath),
                },
            },function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res.data);
            });
        })
    };
    getFile(fileId) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.driveClient.files.get({
                fileId: fileId,
                alt: 'media',
            }, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res.data);
            });
        });
    }

    getAllFiles(folderId) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.driveClient.files.list({
                q: "mimeType != 'application/vnd.google-apps.folder' and '".concat(folderId, "' in parents"),
                fields: 'files(id, name)',
            }, function (err, res) {    
                if (err) {
                    return reject(err);
                }
                return resolve(res.data.files);
            });
        });
    }

    async getUrl(fileId) {
        await this.driveClient.permissions.create({
            fileId: fileId,
            requestBody: {
              role: 'reader',
              type: 'anyone',
            }
        });
        return  await this.driveClient.files.get({
            fileId: fileId,
            fields: 'webViewLink'
        }).then(response => 
            response.data.webViewLink
        );
    }

    async deleteFile(fileId) {
        await this.driveClient.files.delete({
            fileId: fileId,
        });
        
    }
} 


