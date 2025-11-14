import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SideBarforPat from './Pages/SideBarforPat';
import DoctorShow from './DoctorShow';
import Appointement from './Appointement';
import { Outlet, useResolvedPath, useMatch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../atom/recoil.atom';
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

function PateintDashboard() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const resolvedPath = useResolvedPath('');
  const isDashboardRoot = useMatch(resolvedPath.pathname);

  
  useEffect(() => {
    if (!isDashboardRoot) return;

    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/api/doctors');
        if (res.data?.data) {
          setDoctors(res.data.data);
          toast.success('Doctors fetched successfully!');
        } else {
          setDoctors([]);
          toast.error('No doctors found.');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [isDashboardRoot, setLoading]);

  
  const openModal = (doctorId) => setSelectedDoctor(doctorId);
  const closeModal = () => setSelectedDoctor(null);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <div className="flex w-full min-h-screen relative">
        {/* Sidebar - mobile drawer and desktop fixed */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-30
          w-64 md:w-[20%] 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          transition-transform duration-300 ease-in-out
          border-r border-neutral-600 bg-black
        `}>
          <SideBarforPat />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full md:w-[80%] p-4 md:p-5 overflow-y-auto">
          {/* Mobile menu button */}
          <button 
            className="md:hidden fixed top-20 left-4 z-40 bg-gray-800 p-2 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Outlet />

          {isDashboardRoot && (
            <>
              <div className="text-center my-4 md:my-7">
                <h1 className="text-xl md:text-2xl font-semibold text-white">
                  Appoint A Doctor Now
                </h1>
              </div>

              {loading && (
                <p className="text-white text-center mb-4">Loading doctors...</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <DoctorShow
                      key={doctor.id}
                      user={doctor}
                      onBook={() => openModal(doctor.id)} // pass callback
                    />
                  ))
                ) : (
                  !loading && (
                    <p className="text-white col-span-full text-center">
                      No doctors available.
                    </p>
                  )
                )}
              </div>

              
              <Appointement
                isOpen={!!selectedDoctor}
                onClose={closeModal}
                doctorId={selectedDoctor}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PateintDashboard;
