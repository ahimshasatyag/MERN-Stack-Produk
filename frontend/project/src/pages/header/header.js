import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";

const Header = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <Navbar bg={token ? "primary" : "dark"} variant='dark'>
                <Container>
                    <Navbar.Brand as={Link} to="">
                        {token ? "Logged-In" : "Not LoggedIn"}
                    </Navbar.Brand>
                    <Nav className='ml-auto'>
                        {token ? (
                            <>
                                <Nav.Link as={Link} to="/history" className='nav-link'>
                                    Riwayat
                                </Nav.Link>
                                <Nav.Link as={Link} to="/purchase" className='nav-link'>
                                    Pembelian
                                </Nav.Link>
                                <Nav.Link as={Link} to="/customer" className='nav-link'>
                                    Customer
                                </Nav.Link>
                                <Nav.Link as={Link} to="/produk" className='nav-link'>
                                    Produk
                                </Nav.Link>
                                <Nav.Link as={Link} to="/dashboard" className='nav-link'>
                                    Beranda
                                </Nav.Link>
                                <Nav.Link className='nav-link' onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>    
                        ) : (
                            <>
                              <Nav.Link as={Link} to="/login" className="nav-link">
                                Login
                              </Nav.Link>
                              <Nav.Link as={Link} to="/register" className="nav-link">
                                Register
                              </Nav.Link>  
                            </>
                        
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
  )
}

export default Header
