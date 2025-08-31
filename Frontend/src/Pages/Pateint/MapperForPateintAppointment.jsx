import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import PrescriptionModal from "../Pateint/Pages/ModelforView";

function MapperForPateintAppointment({ appointment }) {
  const { doctor, when, status, id } = appointment;
  const formattedDate = new Date(when).toLocaleString();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-[300px] h-auto rounded-2xl flex flex-col border-2 border-white items-center bg-black text-white p-4">
        <div className="w-14 h-14 border mt-2 rounded-4xl overflow-hidden">
          <img
            className="object-contain w-full h-full"
            src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`}
            alt=""
          />
        </div>

        <div className="mt-3 text-center">
          <h1 className="font-semibold">DR. {doctor?.name}</h1>
          <p className="text-sm font-bold mt-1">Date: {formattedDate}</p>
          <p
            className={`mt-2 font-medium ${
              status === "PENDING" ? "text-yellow-400" : "text-green-500"
            }`}
          >
            Status: {status}
          </p>
        </div>

        <div className="mt-auto flex justify-center">
          <Button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 mt-4 bg-gray-700 text-white hover:bg-gray-600"
          >
            View Prescription
          </Button>
        </div>
      </div>

      {showModal && (
        <PrescriptionModal
          appointmentId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MapperForPateintAppointment;
