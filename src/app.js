import express from "express"
import morgan from "morgan"
// import pkg from '../package.json'
import documentsRoutes from './routes/documents.routes.js'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/user.routes.js'
import { createRoles } from "./libs/initial.js"
import googleRoutes from './routes/google.routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
const app  = express()
createRoles()
app.use(cors({
    origin: '*'
}));


// app.set('pkg', pkg)

// enable files upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//modo de desarrollo
app.use(morgan('dev'))
//app.use('./controllers/email.controller.js')

app.use(express.json())
//rutas

//datos del proyecto
app.get('/', (req,res)=>{
    res.json({
        // name:   app.get('pkg').name,
        // author: app.get('pkg').author,
        // description: app.get('pkg').description,
        // version: app.get('pkg').version,
    })
})

app.use('/api/documents',documentsRoutes)   //importar Documents
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

app.use('/api', googleRoutes)

export default app