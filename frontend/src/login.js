import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Envoyer la requête POST au backend pour authentification
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),  // Envoie les identifiants au backend
      });
  
      if (response.ok) {
        setSuccess('Authentification réussie');
        setError(null);  // Réinitialise les erreurs en cas de succès
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
