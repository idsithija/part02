import React from 'react'

const PersonForm  = ({addPerson, handlePersonAdd, handleNumberAdd}) => {
  return (
    <div>
        <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePersonAdd} />
        </div>
        <div>
          number: <input onChange={handleNumberAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm;