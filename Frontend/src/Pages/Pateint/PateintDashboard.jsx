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

      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <div className="w-[20%] border-r border-neutral-600">
          <SideBarforPat />
        </div>

        {/* Main Content */}
        <div className="w-[80%] p-5 overflow-y-auto">
          <Outlet />

          {isDashboardRoot && (
            <>
              <div className="text-center my-7">
                <h1 className="text-2xl font-semibold text-white">
                  Appoint A Doctor Now
                </h1>
              </div>

              {loading && (
                <p className="text-white text-center mb-4">Loading doctors...</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
