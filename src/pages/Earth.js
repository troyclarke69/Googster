import React from 'react'
import Countries from '../components/Countries'
import  { Link } from 'react-router-dom';

const Earth = () => {

    return (
        <>
            <Link to='/' >Back</Link>
            <Countries />
        </>
    )
}

export default Earth
