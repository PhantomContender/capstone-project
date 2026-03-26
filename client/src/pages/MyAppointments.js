import React, { useEffect, useState } from 'react';
import api from '../api';

const MyAppointments = ({ user }) => {  
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
  <div className="container mt-5 animate__animated animate__fadeIn">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <div>
        <h2 className="display-6 fw-bold text-dark mb-0">Your Zenith Ledger</h2>
        <p className="text-muted">A record of your upcoming rejuvenation services.</p>
      </div>
      <div className="text-end">
        <span className="badge bg-dark px-3 py-2">Account: {user?.name || 'Guest'}</span>
      </div>
    </div>

    {appointments.length === 0 ? (
      <div className="card border-0 shadow-sm p-5 text-center bg-white">
        <h4 className="text-muted italic">The archives are empty.</h4>
        <p>Your journey at Zenith Wellness begins with your first booking.</p>
        <a href="/" className="btn btn-zenith mx-auto mt-3" style={{ maxWidth: '200px' }}>Explore Services</a>
      </div>
    ) : (
      <div className="card border-0 shadow-lg overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#1A1A1A', color: '#D4AF37' }}>
              <tr className="text-uppercase small letter-spacing-1">
                <th className="ps-4 py-3">Service Description</th>
                <th className="py-3">Scheduled Date</th>
                <th className="py-3 text-center">Duration</th>
                <th className="py-3 text-end">Investment</th>
                <th className="pe-4 py-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {appointments.map((app) => (
                <tr key={app._id} className="align-middle">
                  <td className="ps-4 py-4">
                    <div className="fw-bold text-dark">{app.service?.name}</div>
                    <div className="small text-muted text-uppercase">ID: {app._id.slice(-6)}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-dark">
                      {new Date(app.appointmentDate).toLocaleDateString('en-US', { 
                        weekday: 'short', month: 'long', day: 'numeric' 
                      })}
                    </div>
                    <div className="small text-muted">
                      {new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="badge rounded-pill bg-light text-dark border">
                      {app.service?.duration} Mins
                    </span>
                  </td>
                  <td className="py-4 text-end fw-bold text-dark">
                    ${app.service?.price}
                  </td>
                  <td className="pe-4 py-4 text-end">
                    <button 
                      className="btn btn-outline-danger btn-sm border-0"
                      onClick={() => cancelHandler(app._id)}
                    >
                      <i className="bi bi-x-circle me-1"></i> Cancel Rite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);
}

export default MyAppointments;