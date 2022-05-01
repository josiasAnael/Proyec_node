import 'dotenv/config'
import app from './src/app.js'
import './src/database/database.js'

app.listen(process.env.PORT || 3001)
console.log("conect", 3001)