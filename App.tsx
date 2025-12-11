import React, { useState } from 'react';
import { LoginTerminal } from './components/LoginTerminal';
import { GameDashboard } from './components/GameDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  const handleLoginSuccess = (username: string) => {
    setUser(username);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-retro-bg font-terminal overflow-x-hidden selection:bg-retro-green selection:text-black">
      {!isAuthenticated ? (
        <LoginTerminal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <GameDashboard username={user} onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}