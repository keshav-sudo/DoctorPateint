import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/Signup';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import PatientDashboard from './Pages/Pateint/PateintDashboard';
import Error from './Pages/Error/Error';
import Landing from './Pages/Landing/Landing';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import LoadingScreen from './Pages/Loading/Loading';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import { useAuth } from './hooks/useFetcherUser';
import Profile from './Pages/Doctor/Profile';
import PateintAppointement from './Pages/Pateint/PateintAppointement';
import AppointmentFor from './Pages/Pateint/components/AppointmentFordr';

function BaseApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/error" element={<Error />} />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="appointment-pateint" element={<AppointmentFor/>} />
          <Route path="profile" element={<Profile />} />
         
        </Route>

        {/* Patient Dashboard */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="appointment-pateint" element={<PateintAppointement />} />
        </Route>
      </Routes>
    </Router>
  );
}

function AuthWrapper({ children }) {
  useAuth();
  return children;
}

function App() {
  return (
    <RecoilRoot>
      <AuthWrapper>
        <Toaster position="top-right" reverseOrder={false} />
        <LoadingScreen />
        <BaseApp />
      </AuthWrapper>
    </RecoilRoot>
  );
}

export default App;
