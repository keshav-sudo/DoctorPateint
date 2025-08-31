import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import axiosInstance from "../../../lib/axiosInstance";

function PrescriptionModal({ appointmentId, onClose }) {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axiosInstance.get(
          `api/prescriptions/appointment/${appointmentId}`
        ); 
        setPrescription(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [appointmentId]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black text-white rounded-2xl p-6 w-[400px] max-h-[90vh] overflow-auto relative border border-white">
        
        <div className="flex justify-between items-center mb-4 border-b border-white pb-2">
          <h2 className="text-2xl font-bold">Prescription Details</h2>
          <Button
            onClick={onClose}
            className="px-3 py-1 bg-white text-black hover:bg-gray-200 rounded"
          >
            ✕
          </Button>
        </div>

        {/* Modal Content */}
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : prescription ? (
          <div className="flex flex-col gap-4">
            <div className="bg-black/80 p-3 rounded-lg border border-white">
              <p><strong>Symptoms:</strong> {prescription.symptoms || "N/A"}</p>
            </div>
            <div className="bg-black/80 p-3 rounded-lg border border-white">
              <p><strong>Diagnosis:</strong> {prescription.diagnosis || "N/A"}</p>
            </div>
            <div className="bg-black/80 p-3 rounded-lg border border-white">
              <p><strong>Notes:</strong> {prescription.notes || "N/A"}</p>
            </div>
            <div className="bg-black/80 p-3 rounded-lg border border-white">
              <strong>Medicines:</strong>
              {prescription?.medicines?.length > 0 ? (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {prescription.medicines.map((med, idx) => (
                    <li key={idx}>
                      {med.name} — {med.dosage} — {med.frequency}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1">No medicines found.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center py-4">No prescription found.</p>
        )}
      </div>
    </div>
  );
}

export default PrescriptionModal;
