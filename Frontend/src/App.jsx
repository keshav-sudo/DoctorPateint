// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/context.js';
import AuthPage from './page/AuthPage';
import HomePage from './page/HomePage';
import Profile from './page/Profile.jsx';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
          path="/profile"
          element= {
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;