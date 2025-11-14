import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../atom/recoil.atom';
import axiosInstance from '../../lib/axiosInstance';
import { Button } from '../../components/ui/button';

function Appointement({ isOpen, onClose, doctorId }) {
  const setLoading = useSetRecoilState(loadingState);
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return toast.error("Please select a date and time");

    setLoading(true);
    const toastId = toast.loading("Booking Appointment...");

    try {
      const payload = {
        doctorId,
        when: new Date(date + ":00").toISOString(),
      };

      console.log("Sending payload:", payload);

      await axiosInstance.post("/api/appointments/", payload);

      toast.success("Appointment booked successfully!", { id: toastId });
      setDate(""); 
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to book appointment", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity px-4 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative bg-black border-2 border-blue-900/50 rounded-lg p-6 sm:p-8 w-full max-w-[500px] z-10 shadow-2xl shadow-blue-900/30">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-300">Select Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-blue-900/50 bg-gray-900/50 p-3.5 rounded-md text-white font-medium placeholder:text-gray-500 focus:border-blue-500 outline-none transition-colors"
              style={{
                colorScheme: "dark", 
              }}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2.5 bg-transparent border-2 border-blue-900/50 hover:border-blue-500 rounded-md text-sm font-semibold hover:bg-blue-600/10 transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-md text-sm font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              Book Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appointement;
