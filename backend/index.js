const express = require('express')
const morgan = require('morgan')
morgan('tiny')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const PORT = process.env.PORT || 3001


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const app = express()
app.use(express.static('dist'))
app.use(morgan())
app.use(express.json())
app.listen(PORT, ()=> {console.log('Server is running')})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) =>{
    id = req.params.id
    person = persons.filter((p) => p.id === id)

    
    if (!person[0]){
        return res.status(404).end()
    }
    res.json(person)
})

app.delete('/api/persons/:id', (req, res)=> {
    id = req.params.id

    persons = persons.filter((p)=> p.id!==id)
    res.status(204).end()
})

app.post('/api/persons', (req,res) => {
  const body = req.body
  if(!body.name){
    message = body.name===body.number ? "name and number are missing" : "Name is missing"
    return res.status(400).json({error:message})
  }
  else if (!body.number) return res.status(400).json({error:"Number is missing"})
    
  const newPerson = req.body

  if (persons.find((p)=> p.name === newPerson.name)) return res.status(400).json({error : "name must be unique"})

  newPerson.id = String(Math.floor(Math.random()*1000000))
  persons = persons.concat(newPerson)
    
  res.json(newPerson)
})

app.get('/info', (req, res) => {
    res.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${Date()}</div>`
    )
})

app.use(unknownEndpoint)