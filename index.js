import app from './src/app.js'
import './src/database/database.js'
import dot from 'dotenv'

dot.config()
app.listen(process.env.PORT || 3000)
console.log("conect", 3000)