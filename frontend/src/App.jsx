import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/Input'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({
    content: '',
    succesState: false
  })

  useEffect(()=>{
    personsService.getAll()
      .then( (response) => {
        setPersons(response)
      })
  }, [])

  const [ filter, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} bool={message.succesState}/>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>

      <h3>Numbers</h3>
      
      <Persons persons={persons} setPersons={setPersons} filter={filter}/>
    </div>
  )
}

export default App