import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/user/login', { username, password });
      setToken(data.token);
      setUser(data.user);
      navigate('/slot');
    } catch (err) {
      alert('Login gagal');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full mb-2" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full mb-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
