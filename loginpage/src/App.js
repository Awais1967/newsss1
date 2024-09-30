import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase.js';
import Home from "./components/Home/Home.js";
import Login1 from "./components/Login1/login1.js";
import Signup from "./components/signup/signup.js";
import MainScreen from './components/pages/mainscreen.js';
import Logout from './components/pages/logout.js';
import Analytics from './components/pages/analytics.js';
import Dashboard from './components/pages/dashboard.js';
import Comment from './components/pages/comments.js';
import About from './components/pages/about.js';
import Payment from './components/pages/PaymentPage.js';
import PDFPageCounter from './components/pages/PDFPageCounter.js';
import './App.css';

function App() {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setIsAuthenticated(true);
      } else {
        setUserName("");
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login1 />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/pdfpagecounter' element={<PrivateRoute><PDFPageCounterWrapper /></PrivateRoute>} />
          <Route path='/paymentpage' element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path='/logout' element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path='/Clearnessform' element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path='/comment' element={<PrivateRoute><Comment /></PrivateRoute>} />
          <Route path='/transcript' element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path='/userdashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/mainscreen' element={<PrivateRoute><MainScreen /></PrivateRoute>} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

function PrivateRoute({ children }) {
  const isAuthenticated = auth.currentUser !== null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function PDFPageCounterWrapper() {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.pdfUrl) {
    // If the state or pdfUrl is not provided, redirect to the home page or handle appropriately
    return <Navigate to="/" replace />;
  }

  return <PDFPageCounter pdfUrl={state.pdfUrl} />;
}

export default App;
