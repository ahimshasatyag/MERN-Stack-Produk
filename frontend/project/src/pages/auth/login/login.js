import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email dan Password harus diisi');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Format email tidak valid');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password harus diisi');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        console.log(result); 

        setSuccess('Login berhasil!');
        navigate('/dashboard');
      } else {
        setError(result.message || 'Email atau Password salah');
      }
    } catch (error) {
      console.error(error.message);
      setError('Terjadi kesalahan server');
    } finally {
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit} className='container1'>
        <h1>LOGIN</h1>

        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>{success}</Alert>}

        <Form.Group controlId='formBasicEmail' className='form1'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Masukkan Email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Masukkan Password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type='submit' className='button'>
          Login
        </Button>

        <div className="mt-3 text-center">
          <p>
            Belum punya akun?{' '}
            <Link to="/register" className="text-decoration-none">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
