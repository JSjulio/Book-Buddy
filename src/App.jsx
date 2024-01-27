//Updated
import { useState, createContext, useContext } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
//import Navigation from './components/Navigations'
import Login from './components/Login'
import './bookStyles.css'
import Registration from './components/Register'

const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(null)

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <>
      <h1><img id='logo-image' src={bookLogo} alt='Library Logo' />Library App</h1>
      <Registration />
      <Login onLogin ={handleLogin} />
      <Books token={token} />
      
    </>
  )
}

export default App