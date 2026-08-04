import React, { useState, useEffect } from 'react';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pharmakon_admin_user');
    const token = api.getAccessToken();

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-sm font-semibold">Loading Admin Session...</p>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />
      )}
    </div>
  );
}
