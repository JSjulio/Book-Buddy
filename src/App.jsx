import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Nav Elements
import Books from './components/Books';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import ReservedBooks from './components/Books/ReservedBooks';
import AvailableBooks from './components/AvailableBooks';
import Navigations from './components/Navigations';
import Account from './components/Account';
import AccountUsers from './components/AccountUsers';

//React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//CSS
import './index.css';

function App() {
  // Use useSelector to access the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  //React Router
  return (
    <div>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/availablebooks" element={<AvailableBooks />} />
          <Route path="/mybooks" element={<ReservedBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="/account/:accountId" element={<Account />} />
          <Route path="/accountusers" element={<AccountUsers />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;