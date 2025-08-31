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
      <div className='flex w-full min-h-screen'>
        <div className='w-[20%] border-r border-neutral-600'>
          <SidebarFordr />
        </div>
        <div className='w-[80%] overflow-auto'>
          {/* Conditionally render the appointments or the Outlet */}
          {isDashboardRoot ? (
            <div className='h-full m-10 overflow-hidden '>
              <div className='w-full text-2xl text-center mb-2'>
                <h1>Hey Your All  Appointments</h1>
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
