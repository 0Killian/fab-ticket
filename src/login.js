import React, { useState } from 'react';
import config from './config.js';
import Cookies from 'universal-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Envoyer la requête POST au backend pour authentification
    try {
      console.log(`http://${config.host}:${config.port}/api/login`);
      const response = await fetch(`http://${config.host}:${config.port}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),  // Envoie les identifiants au backend
      });
  
      if (response.ok) {
        setSuccess('Authentification réussie');
        setError(null);  // Réinitialise les erreurs en cas de succès
        const data = await response.json();
        const cookies = new Cookies();
        cookies.set('token', data.token, { path: '/' });
      } else {
        setError('Échec de l\'authentification');
        setSuccess(null);  // Réinitialise le message de succès en cas d'échec
      }
    } catch (err) {
      console.error('Erreur lors de la requête:', err);
      setError('Erreur de connexion au serveur');
      setSuccess(null);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Login;
