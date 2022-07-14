import React from 'react'
import Part from './Part'

const Content = ({contents}) => {

    const initValue = 0;
    const total = contents.reduce((x1, x2) =>
        x1 + x2.exercises,
        initValue 
    );

    return (
        <>
            <ul>
                {contents.map(content => 
                    <Part key={content.id} part={content} />
                )}
            </ul>
            <strong>Total of {total} exercises</strong>
        </>
    )
}

export default Content;