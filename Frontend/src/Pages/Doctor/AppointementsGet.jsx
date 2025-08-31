import React, { useState } from "react";
import PrescriptionModal from "./ModelForprescription";

function AppointmentList({ data }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="flex flex-wrap">
      {data.map((appointment) => (
        <div
          key={appointment.id}
          className="w-[300px] flex flex-col justify-center border-2 border-neutral-500 h-auto rounded-2xl m-4 p-4"
        >
          <div className="w-20 h-20 rounded-full mt-2 overflow-hidden border-2 border-white flex items-center justify-center mx-auto">
            <img
              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${appointment.patientId}`}
              alt="Patient Avatar"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">
              {appointment.patient?.name || "Unknown Patient"}
            </h3>
            <p className="text-sm text-gray-400">
              {new Date(appointment.when).toLocaleString()}
            </p>
            <p
              className={`mt-2 font-medium ${
                appointment.status === "PENDING" ? "text-yellow-500" : "text-green-500"
              }`}
            >
              {appointment.status}
            </p>
          </div>

          <div className="mt-auto flex justify-center">
            <button
              className={`px-4 py-2 rounded mt-4 ${
                appointment.status === "PENDING"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
              onClick={() =>
                appointment.status === "PENDING" && setSelectedAppointment(appointment)
              }
            >
              {appointment.status === "PENDING" ? "Click For Complete" : "Completed"}
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedAppointment && (
        <PrescriptionModal
          appointmentId={selectedAppointment.id}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}

export default AppointmentList;
