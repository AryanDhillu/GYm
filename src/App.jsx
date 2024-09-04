import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/HomePage';
import Chest from './components/Chest';
import Back from './components/Back';
import Sholders from './components/Sholders';
import Legs from './components/Legs';
import Abs from './components/Abs';
import Triceps from './components/Triceps';
import Biceps from './components/Biceps';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <div className="container mt-4">
        {isAuthenticated ? (
          <>
            <div className="alert alert-success" role="alert">
              <p>Welcome, {user.name}!</p>
              <button className="btn btn-primary" onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
              </button>
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chest" element={<Chest />} />
              <Route path="/back" element={<Back />} />
              <Route path="/shoulders" element={<Sholders />} />
              <Route path="/legs" element={<Legs />} />
              <Route path="/biceps" element={<Biceps />} />
              <Route path="/triceps" element={<Triceps />} />
              <Route path="/abs" element={<Abs />} />
            </Routes>
          </>
        ) : (
          <div className="text-center">
            <h2>Please log in to view the content</h2>
            <button className="btn btn-primary mt-2" onClick={() => loginWithRedirect()}>Log In</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
