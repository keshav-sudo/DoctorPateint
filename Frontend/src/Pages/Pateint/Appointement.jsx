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
        className="absolute inset-0 bg-neutral-500/30"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative bg-black rounded-lg p-4 sm:p-6 w-full max-w-[400px] z-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm sm:text-base">
            Select Date & Time:
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded mt-1 text-white placeholder:text-gray-300"
              style={{
                colorScheme: "dark", 
              }}
            />
          </label>
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" onClick={onClose} className="px-3 sm:px-4 py-2 border rounded text-sm sm:text-base">
              Cancel
            </Button>
            <Button type="submit" className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded text-sm sm:text-base">
              Book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appointement;
