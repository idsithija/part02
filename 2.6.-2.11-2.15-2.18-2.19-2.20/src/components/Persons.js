import React from 'react'

const Persons = ({persondata, handleDeletePerson}) => {

  return (
    <div>
          {persondata.name} {persondata.number}
          <button onClick={handleDeletePerson}>delete</button>
    </div>
  )
}


export default Persons;