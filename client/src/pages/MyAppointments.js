import React, { useEffect, useState } from 'react';
import api from '../api';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try 
      {
        const { data } = await api.get('/appointments/myappointments');
        setAppointments(data);
        setLoading(false);
      } 
      catch (err) 
      {
        console.error('Error fetching ledger:', err);
        setLoading(false);
      }
    };
    fetchMyAppointments();
  }, []);

  const cancelHandler = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try 
      {
        await api.delete(`/appointments/${id}`);

        setAppointments(appointments.filter((app) => app._id !== id));
      } 
      catch (err) 
      {
        alert('Cancellation failed. The ledger remains unchanged.');
      }
    }
  };

  if (loading) return <div className="container mt-5"><h3>Consulting the Archives...</h3></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Zenith Ledger</h2>
      {appointments.length === 0 ? (
        <div className="alert alert-info">No rituals scheduled yet. Head to the Home page to book!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app._id}>
                  <td className="fw-bold text-primary">{app.service?.name}</td>
                  <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                  <td>{app.service?.duration} mins</td>
                  <td>${app.service?.price}</td>
                  <td>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => cancelHandler(app._id)}
                    >
                      Cancel Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;