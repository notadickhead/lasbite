import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import BiteDetails from './components/biteDetails';
import Message from './components/messages';
import Profile from './components/profile';
import Login from './components/login';
import {Navigate } from 'react-router-dom';
import Register
 from './components/register';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PasswordReset from './components/forgotPassword';
import AddBite from './components/newBite';
import BitesList from './components/fetchBites';

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Message />} path="/messages" />
          <Route element={<Profile />} path="/saved" />
          <Route element={ <BiteDetails /> } path="/bite/:id" />
          <Route element={<PasswordReset />} path="/password-reset" />
          <Route element={<AddBite />} path="/addbite" />
          <Route element={<BitesList />} path="/bites" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;