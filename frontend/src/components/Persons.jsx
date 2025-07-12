import personsService from "../services/persons"

const Persons = ({setPersons, persons, filter}) => {

    const filterPersons = () => persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))



    return (
        <>
        {filterPersons().map(
            (person) => <Person person={person} setPersons={setPersons} key={person.id}/>
        )}
        </>
    )
}

const onDeleteClick = (person, setter) => {
    if (confirm(`Delete ${person.name} ?`)){
        personsService.deletePerson(person.id)
            .then(() => personsService.getAll() //i know it is a bad solution to call getAll
                .then( updatedPersons => {
                  setter(updatedPersons)
        }))
    }
}

const Person = ({person, setPersons}) => <div>{person.name} {person.number} <button onClick={() => onDeleteClick(person, setPersons)}>delete </button></div>

export default Persons