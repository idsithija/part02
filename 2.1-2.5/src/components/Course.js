import React from 'react'
import Content from './Content';
import Header from './Header';

const Course = ({course}) => {

    return (
        <div>
            <Header header={course} />
            <Content contents={course.parts} />
        </div>
    )
}

export default Course;