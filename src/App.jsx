//Updated
import { useState, createContext } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
//import Navigation from './components/Navigations'
import Login from './components/Login'
import Register from './components/Register'
import ReservedBooks from './components/Books/ReservedBooks'

import './bookStyles.css'
import LoggedInBooks from './components/LoggedInBooks'

export const AuthContext = createContext(null);

function App() {
  const [token, setToken] = useState(null)

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const authContextValue = {
    token,
    onLogin: handleLogin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Login />
      <Register />
      <h1><img id='logo-image' src={bookLogo} alt='Library Logo' />Library App</h1>
      {token ? (
        <>
        <h2>Your books</h2>
        <LoggedInBooks />
        </>
      ) : (
        <>
        <Books />
        </>
      )}
      </AuthContext.Provider>
  );
}

export default App