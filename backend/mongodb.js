const mongoose = require('mongoose')

if (process.argv.length < 5){
    console.log("Passwort - Name - Nummer müssen gegeben werden")
    process.exit(1)
}

const passwort = process.argv[2]

const url = `mongodb+srv://fullstack:${passwort}@cluster0.dzqornm.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name : process.argv[3],
    number : process.argv[4]
})

person.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
})