import mongoose  from "mongoose"

    mongoose.connect("mongodb+srv://JosiasM:JosiasAMH@cluster0.cvvao.mongodb.net/web2?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
    })
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(`No se pudo conectar a la base de datos ${error}`))
