import mongoose  from "mongoose"

mongoose.connect("mongodb+srv://JosiasM:JosiasAMH@cluster0.cvvao.mongodb.net/web2?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(db => console.log('DB is connected', db))
    .catch(error => console.log(error))
