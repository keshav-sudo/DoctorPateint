import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useNavigate } from "react-router-dom";


const Appointments = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/appointments/doctor");
            setData(response.data.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch appointments. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleMarkAsComplete = async (appointmentId) => {
        try {
            await axios.patch(`http://localhost:5000/api/appointments/${appointmentId}/complete`);
            alert("Appointment marked as complete!");
            fetchAppointments(); 
        } catch (error) {
            console.error("Error marking appointment as complete:", error);
            alert("Failed to mark as complete.");
        }
    };

    const preiscriptionOnclick = (appointmentId) => {
        navigate(`/create-prescription/${appointmentId}`);
    };

    if (isLoading) {
        return <div className="p-4 text-center">Loading appointments...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    const appointmentStatus = data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {});
    
    const chartData = [
        { name: 'Pending', value: appointmentStatus.PENDING || 0, fill: '#facc15' },
        { name: 'Completed', value: appointmentStatus.COMPLETED || 0, fill: '#4ade80' },
    ];

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Appointments Dashboard</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Appointment Overview</h2>
                <div className="flex justify-center">
                    <PieChart width={400} height={250}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Appointments</h2>
                <div className="flex flex-col space-y-4">
                    {data.length > 0 ? (
                        data.map((appointment) => (
                            <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <h3 className="text-lg font-bold">Patient: {appointment.patient.name}</h3>
                                    <p className="text-gray-600 text-sm">
                                        Date & Time: {new Date(appointment.when).toLocaleString()}
                                    </p>
                                    <p className="font-medium mt-2">Status: 
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {appointment.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleMarkAsComplete(appointment.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
                                    >
                                        Mark as Complete
                                    </button>
                                    <button 
                                        onClick={() => preiscriptionOnclick(appointment.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
                                    >
                                        Create Prescription
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
