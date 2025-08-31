import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atom/recoil.auth';
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

function DoctorShow({ user: doctor, onBook }) {
  const { user } = useRecoilValue(authState);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Optional: fetch doctor's appointments if needed
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingAppointments(true);
      try {
        const res = await axiosInstance.get(`/api/appointments/doctor/${doctor.id}`);
        if (res.data?.data) setAppointments(res.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);

      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [doctor.id]);

  return (
    <div className="flex flex-col items-center bg-black border-2 border-white rounded-2xl p-5 h-full hover:scale-105 transition-transform duration-300">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white flex items-center justify-center">
        <img
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${doctor.id}`}
          alt={`Dr. ${doctor.name}`}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="mt-4 text-lg font-semibold text-white text-center">
        DR. {doctor.name}
      </h1>

      <div className="mt-auto">
        <Button
          className="px-6 py-2 mt-3"
          onClick={onBook}
          disabled={loadingAppointments}
        >
          {loadingAppointments ? 'Loading...' : 'Appointment'}
        </Button>
      </div>
    </div>
  );
}

export default DoctorShow;
