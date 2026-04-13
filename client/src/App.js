import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ServiceDetails from './pages/ServiceDetails';
import MyAppointments from './pages/MyAppointments';
import Register from './pages/Register';

function App() {

const [user, setUser] = useState(null);

  useEffect(() => 
    {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) 
{
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/my-appointments" element={<MyAppointments user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
