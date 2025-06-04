import React, { useContext } from 'react'
import UserContext from '../utils/UserContext';

const About = () => {
  const {loggedUser}=useContext(UserContext);
  return (
    
    <h1>{loggedUser}</h1>
  )
}

export default About
