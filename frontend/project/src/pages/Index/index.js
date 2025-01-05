import React from 'react'
import "./index.css";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className='landing-main'>
      <h1>WELCOME</h1>
      <h1>PT Eka Maju Mesinindo</h1>
      <Link to="/login" className="landing-login-button">Login</Link>
      <Link to="/register" className="landing-register-button">Register</Link>
  </div>
  )
}

export default Index