/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. D&D */
// Navigations.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Navigations = () => {
  // Use useSelector to get the authentication state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/books">
        <Navbar.Brand>BookBuddy</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <LinkContainer to="/books">
                <Nav.Link>All Books</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/account">
                <Nav.Link>Account</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigations;