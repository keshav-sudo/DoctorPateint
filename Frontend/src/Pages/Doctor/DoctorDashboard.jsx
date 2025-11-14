import React, { useEffect, useState } from 'react';
import Header from '../Pateint/components/Header';
import SidebarFordr from '../Pateint/components/SidebarFordr';
import { Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { loadingState } from '../../atom/recoil.atom';
import { useRecoilState } from 'recoil';
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';
import AppointementsGet from './AppointementsGet';

function DoctorDashboard() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const resolvedPath = useResolvedPath('');
  const isDashboardRoot = useMatch(resolvedPath.pathname);

  useEffect(() => {
  
    if (isDashboardRoot) {
      const fetchAppointments = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get('api/appointments/doctor');
          if (res.data?.data) {
            setData(res.data.data);
            toast.success('Appointments fetched successfully!');
          } else {
            setData([]);
            toast.error('No appointments found.');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
          toast.error('Failed to fetch appointments');
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [isDashboardRoot ]);

  return (
    <>
      <Header />
      <div className='flex w-full min-h-screen relative'>
        {/* Sidebar - mobile drawer and desktop fixed */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-30
          w-64 md:w-[20%] 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          transition-transform duration-300 ease-in-out
          border-r border-neutral-600 bg-black
        `}>
          <SidebarFordr />
        </div>
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <div className='flex-1 w-full md:w-[80%] overflow-auto'>
          {/* Mobile menu button */}
          <button 
            className="md:hidden fixed top-20 left-4 z-40 bg-gray-800 p-2 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Conditionally render the appointments or the Outlet */}
          {isDashboardRoot ? (
            <div className='h-full m-4 md:m-10 overflow-hidden'>
              <div className='w-full text-xl md:text-2xl text-center mb-2'>
                <h1>Hey Your All Appointments</h1>
              </div>
              <AppointementsGet className="overflow-hidden" data={data} />
            </div>
            
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;
