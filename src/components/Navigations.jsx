import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useAccountQuery } from '../../api/bookApi';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Navigations = () => {
  // Use useSelector to get the authentication state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);

 // Fetch account details
 const { data: userDetails } = useAccountQuery(token, {
  skip: !isAuthenticated, // Skip the query if not authenticated
});

// Extract the accountId from userDetails
const accountId = userDetails?.id;


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>BookBuddy</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <LinkContainer to="/">
                <Nav.Link>All Books</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/availablebooks">
                <Nav.Link>Available Books</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/mybooks">
                <Nav.Link>My Books</Nav.Link>
              </LinkContainer>

              <LinkContainer to={`/account/${accountId}`}>
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