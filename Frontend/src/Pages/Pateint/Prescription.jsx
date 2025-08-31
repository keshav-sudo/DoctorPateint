import { useEffect } from 'react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../atom/recoil.atom';
import axiosInstance from '../../lib/axiosInstance';
import { Button } from '../../components/ui/button';

function Prescription({appointementId , isOpen ,OnCLose}) {

    
  const setLoading = useSetRecoilState(loadingState);
  const [data, setdata] = useState([]);


  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`api/prescriptions/appointment/:${appointementId}`);
        setdata(res.data.data || []);
        if (res.data) {
          toast.success("Appointments fetched successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [setLoading]);

  return (
    <div>Prescription
        <button  onClick={() => {console.log(data)}}>DATA</button>
    </div>
  )
}

export default Prescription