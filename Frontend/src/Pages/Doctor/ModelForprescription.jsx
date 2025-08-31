import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axiosInstance";
import { loadingState } from "../../atom/recoil.atom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

function PrescriptionModal({ appointmentId, onClose }) {
    const isLoading = useSetRecoilState(loadingState)
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    appointmentId,
    symptoms: "",
    diagnosis: "",
    medicines: [{ name: "", dosage: "", frequency: "" }],
    notes: "",
  });
  

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][field] = value;
    setFormData({ ...formData, medicines: newMedicines });
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    isLoading(true);
    try {
    
      await axiosInstance.post("api/prescriptions/", formData);

      
      await axiosInstance.patch(`api/appointments/${appointmentId}/complete`);

      toast.success("Prescription saved & appointment completed!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
        isLoading(false)
      setLoading(false);
    }
  };

 
  return (
    <div className="fixed inset-0 bg-neutral-600/30 flex items-center justify-center z-50">
      <div className="bg-black text-white rounded-xl p-6 w-[400px] max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Complete Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            Symptoms:
            <input
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Diagnosis:
            <input
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <div>
            <h3 className="font-semibold">Medicines</h3>
            {formData.medicines.map((med, idx) => (
              <div key={idx} className="flex gap-2 mt-1">
                <input
                  placeholder="Name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                  className="border p-1 rounded w-1/3"
                />
                <input
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                  className="border p-1 rounded w-1/3"
                />
                <input
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) => handleMedicineChange(idx, "frequency", e.target.value)}
                  className="border p-1 rounded w-1/3"
                />
              </div>
            ))}
           
          </div>

          <label>
            Notes (optional):
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : "Mark as Complete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionModal;
