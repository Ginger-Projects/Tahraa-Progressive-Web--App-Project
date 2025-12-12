import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown, Image } from 'react-bootstrap';
import { FaUserCircle, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <header className="app-header">
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <span className="brand-text">Tahraa</span>
          </Navbar.Brand>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/courses" className="nav-link">Courses</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
              
              <div className="nav-actions">
                <Button variant="outline-primary" className="me-2 login-btn">
                  <Link to="/login" className="nav-link-btn">Login</Link>
                </Button>
                <Button variant="primary" className="signup-btn">
                  <Link to="/signup" className="nav-link-btn">Sign Up</Link>
                </Button>
              </div>
              
              {/* User Dropdown - shown when user is logged in */}
              {/* <div className="user-dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-user">
                    <FaUserCircle className="user-icon" />
                    <span className="user-name">John Doe</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="notification-icon">
                  <FaBell />
                  <span className="notification-badge">3</span>
                </div>
              </div> */}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
