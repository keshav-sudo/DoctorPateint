import { useEffect, useState } from "react";
import { loadingState } from "../../atom/recoil.atom";
import { useSetRecoilState } from "recoil";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import MapperForPateintAppointment from "./MapperForPateintAppointment";

function PateintAppointement() {
  const setLoading = useSetRecoilState(loadingState);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("api/appointments/my");
        setAppointments(res.data.data || []);
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

    fetchAppointments();
  }, [setLoading]);

  return (
   <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {appointments.length > 0 ? (
    
    appointments
      .sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === "COMPLETED") return -1; 
        if (b.status === "COMPLETED") return 1;
        return 0;
      })
      .map((appointment) => (
        <MapperForPateintAppointment
          key={appointment.id}
          appointment={appointment}
        />
      ))
  ) : (
    <p className="text-white col-span-full text-center">No appointments found.</p>
  )}
</div>


  );
}

export default PateintAppointement;
