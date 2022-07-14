import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification ';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './service/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    personsService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const oldPersonsArray = persons.find(p => p.name === newName)
        const newPersonArray = {...oldPersonsArray, number: noteObject.number}
        personsService.update(newPersonArray.id, newPersonArray).then(updatePerson => {
          setPersons(persons.map(oldPersonsArray => oldPersonsArray.id !== newPersonArray.id ? oldPersonsArray : updatePerson))
          setErrorMessage(`${noteObject.name}'s number is changed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error)
          alert(
            `'${oldPersonsArray.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.name !== newName))
        })
      }
    } else{
      personsService
      .create(noteObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setErrorMessage(`Added ${noteObject.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }
  
  const handlePersonAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(''+event.target.value+'')
  }

  const personsToShow = search
    ? persons.filter(function (employee) {
      return employee.name.toLowerCase().indexOf(''+search.toLowerCase()+'') > -1;})
    : persons

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      const oldPersons = persons.filter(data => data.id !== id)
      const personsNew = {...oldPersons}
      personsService.deletePerson(id, personsNew)
      .then(response => {
        setPersons(oldPersons)
      })
      .catch(error => {
        setErrorMessage(`The ${name} was already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(oldPersons.filter(n => n.id !== id))
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification erroMessage={errorMessage} />
      <Filter handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handlePersonAdd={handlePersonAdd} handleNumberAdd={handleNumberAdd} />
      <h2>Numbers</h2>
      {personsToShow.map((persondata) => 
        <Persons
          key={persondata.id}
          persondata={persondata}
          handleDeletePerson={() => handleDeletePerson(persondata.id, persondata.name)}
        />
      )}
    </div>
  )
}

export default App;