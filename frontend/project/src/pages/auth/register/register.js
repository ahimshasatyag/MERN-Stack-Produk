import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        nama: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        nama: '',
        password: '',
        general: ''
    });

    const [success, setSuccess] = useState('');
    
    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate input individually when user types
        validateField(name, value);
    };

    // Validate individual fields
    const validateField = (name, value) => {
        let errorMessage = '';

        if (name === 'email') {
            if (!value) {
                errorMessage = 'Email tidak boleh kosong';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errorMessage = 'Format email tidak valid';
            }
        } else if (name === 'nama') {
            if (!value) {
                errorMessage = 'Nama tidak boleh kosong';
            } else if (value.length < 3) {
                errorMessage = 'Nama harus memiliki minimal 3 karakter';
            }
        } else if (name === 'password') {
            if (!value) {
                errorMessage = 'Password tidak boleh kosong';
            } else if (value.length < 6) {
                errorMessage = 'Password harus memiliki minimal 6 karakter';
            } else if (!/[A-Z]/.test(value)) {
                errorMessage = 'Password harus mengandung huruf besar';
            } else if (!/[0-9]/.test(value)) {
                errorMessage = 'Password harus mengandung angka';
            } else if (!/[@$!%*?&]/.test(value)) {
                errorMessage = 'Password harus mengandung simbol spesial (@$!%*?&)';
            }
        }

        // Update the errors state for the specific field
        setErrors({
            ...errors,
            [name]: errorMessage
        });
    };

    // Validate form data before submitting
    const validateForm = () => {
        const isEmailValid = !errors.email && formData.email;
        const isNamaValid = !errors.nama && formData.nama;
        const isPasswordValid = !errors.password && formData.password.length >= 6;

        return isEmailValid && isNamaValid && isPasswordValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before submitting
        if (!validateForm()) {
            setSuccess('');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setSuccess('Registrasi berhasil!');
                // Redirect ke halaman login setelah registrasi berhasil
                setTimeout(() => navigate('/login'), 2000); // Redirect setelah 2 detik
            } else {
                setErrors({ ...errors, general: result.message || 'Terjadi kesalahan, coba lagi.' });
            }
        } catch (error) {
            console.error(error.message);
            setErrors({ ...errors, general: 'Terjadi kesalahan server' });
        } finally {
            setFormData({
                email: '',
                nama: '',
                password: ''
            });
        }
    };

    return (
        <div className='center-form'>
            <Form onSubmit={handleSubmit}>
                <h1>REGISTER</h1>
                
                {/* Display general error or success message */}
                {errors.general && <Alert variant='danger'>{errors.general}</Alert>}
                {success && <Alert variant='success'>{success}</Alert>}
                
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Masukkan Email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <Alert variant='danger'>{errors.email}</Alert>}
                </Form.Group>

                <Form.Group controlId='formBasicNama'>
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                        type='text'
                        name='nama'
                        placeholder='Masukkan Nama'
                        value={formData.nama}
                        onChange={handleInputChange}
                    />
                    {errors.nama && <Alert variant='danger'>{errors.nama}</Alert>}
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
                    {errors.password && <Alert variant='danger'>{errors.password}</Alert>}
                </Form.Group>

                <Button type='submit' className='button'>
                    Register
                </Button>

                <div className="mt-3 text-center">
                <p>
                Sudah punya akun?{' '}
                <Link to="/login" className="text-decoration-none">
                    Login Sekarang
                </Link>
                </p>
            </div>
            </Form>
        </div>
    );
};

export default Register;
