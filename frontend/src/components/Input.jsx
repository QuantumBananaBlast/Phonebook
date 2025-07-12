import { useState } from 'react'
import personsService from '../services/persons'



const PersonForm = ({persons, setPersons, setMessage}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
      const onChangeName = (event) => {
        setNewName(event.target.value)
      }
    
      const onChangeNumber = (event) => {
        setNewNumber(event.target.value)
      }
    
      const addNew = (event) => {
        event.preventDefault()
        const foundedPerson = persons.find(person => person.name === newName)
        if (foundedPerson && confirm(`${foundedPerson.name} is already added to phonebook, replace the old number with a new one`)) {
          personsService.update({...foundedPerson, number:newNumber})
            .then( (response)=> {
              if (response){ 
                personsService.getAll()
                  .then((response)=> {
                    setPersons(response)
                    setMessage({content: `${foundedPerson.name}'s number was succesfully changed`,
                      succesState: true
                    })
                    setTimeout(()=> setMessage({content: '', succesState: true}), 5000)
                    setNewName('')
                    setNewNumber('')
                  })
              }
              else {
                setMessage(
                  {content: `Information of ${foundedPerson.name} has already been removed from server`,
                    succesState: false
                  })
                setTimeout(()=> setMessage({content: '', succesState: true}), 5000)
              }
            })
        }
        else if (!foundedPerson){
          personsService.create({name:newName, number : newNumber})
            .then( (response ) => {
              setPersons(persons.concat(response))
              setMessage({content: `Added ${response.name}`, succesState: true})
              setTimeout(()=> setMessage({content: '', succesState: true}), 5000)
              setNewName('')
              setNewNumber('')
            })
      }
    }


    return (
        <>
        <form onSubmit={addNew}>
            <div>
                name: <input value={newName} onChange={onChangeName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={onChangeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm