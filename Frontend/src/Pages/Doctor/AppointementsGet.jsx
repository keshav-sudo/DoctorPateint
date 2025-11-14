import React, { useState } from "react";
import PrescriptionModal from "./ModelForprescription";

function AppointmentList({ data }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((appointment) => (
        <div
          key={appointment.id}
          className="flex flex-col justify-between border-2 border-blue-900/50 hover:border-blue-500/50 h-auto rounded-lg p-5 bg-gradient-to-br from-blue-900/10 to-transparent transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full mt-2 overflow-hidden border-3 border-blue-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
            <img
              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${appointment.patientId}`}
              alt="Patient Avatar"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {appointment.patient?.name || "Unknown Patient"}
            </h3>
            <p className="text-sm md:text-base text-gray-400 font-medium mt-2">
              {new Date(appointment.when).toLocaleString()}
            </p>
            <p
              className={`mt-3 font-bold text-sm md:text-base ${
                appointment.status === "PENDING" ? "text-yellow-400" : "text-green-400"
              }`}
            >
              {appointment.status}
            </p>
          </div>

          <div className="mt-auto flex justify-center">
            <button
              className={`px-4 md:px-5 py-2.5 rounded-md mt-5 text-sm md:text-base font-semibold transition-all duration-300 ${
                appointment.status === "PENDING"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-600/30"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed"
              }`}
              onClick={() =>
                appointment.status === "PENDING" && setSelectedAppointment(appointment)
              }
              disabled={appointment.status !== "PENDING"}
            >
              {appointment.status === "PENDING" ? "Complete Now" : "Completed"}
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
