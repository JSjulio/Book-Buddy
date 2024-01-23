//Updated
import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Navigation from './components/Navigations'
import Login from './components/Login'
import Registration from './components/Register'
// import { fetchBooks } from "./api/bookBuddyApi"


function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo} />Library App</h1>
      <Login />
      <Navigation />
      <Books />
      <Registration />
    </>
  )
}

export default App