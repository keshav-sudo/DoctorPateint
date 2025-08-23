import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/context.js";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DOCTOR'); 
  const [error, setError] = useState(''); // Corrected: Add the error state

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
        alert('Signup successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {!isLogin && (
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* Corrected: The value must be PATIENT */}
                  <option value="PATIENT">Patient</option> 
                  <option value="DOCTOR">Doctor</option>
                </select>
              </div>
            )}
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center">
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthPage;