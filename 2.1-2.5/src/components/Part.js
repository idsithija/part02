import React from 'react'

const Course = ({part}) => {
    
    return (
        <>
            <li>{part.name} {part.exercises}</li>
        </>
    )
}

export default Course;