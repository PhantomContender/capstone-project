import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { referredByAI, justification } = location.state || {};
  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/appointments', {
      service: id,        
      appointmentDate: date,
      notes: notes
    });

    if (res.status === 201) {
      alert('Success! Your appointment is recorded in the Zenith Ledger.');

      navigate('/my-appointments'); 
    }
  } 
  catch (err) 
  {
    const errorMsg = err.response?.data?.message || 'The booking failed.';
    alert(errorMsg);
  }
};

  if (!service) return <div>Loading the Archives...</div>;

return (
    <div className="container mt-5 mb-5">
      <div className="row shadow-lg rounded-4 overflow-hidden bg-white border-0">
        <div className="col-md-6 p-0 d-none d-md-block">
          <img 
            src={service.image} 
            alt={service.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              minHeight: '600px' 
            }} 
          />
        </div>

        <div className="col-md-6 p-4 p-lg-5">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small text-uppercase">
              <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Services</a></li>
              <li className="breadcrumb-item active text-gold" aria-current="page">{service.name}</li>
            </ol>
          </nav>
{referredByAI && (
  <div className="alert bg-dark text-warning border-warning border-start border-4 mb-4 animate__animated animate__fadeIn">
    <div className="d-flex align-items-center">
      <div className="me-3">
        <i className="bi bi-robot fs-3"></i> {/* If you have Bootstrap Icons */}
      </div>
      <div>
        <h6 className="fw-bold mb-1 text-uppercase small">Zenith Assistant Recommendation</h6>
        <p className="mb-0 italic small" style={{ opacity: 0.9 }}>
          "{justification}"
        </p>
      </div>
    </div>
  </div>
)}
          <h2 className="display-5 fw-bold mb-3">{service.name}</h2>
          
          <div className="d-flex gap-3 mb-4">
            <span className="badge bg-dark px-3 py-2">{service.duration} Mins</span>
            <span className="badge bg-gold-outline text-dark border border-warning px-3 py-2">Premium Service</span>
          </div>

          <p className="text-muted mb-4 fs-5" style={{ lineHeight: '1.7' }}>
            {service.description}
          </p>

          <div className="h3 fw-bold text-success mb-4">
            ${service.price}
          </div>

          <hr className="my-4" />

          <form onSubmit={submitHandler} className="mt-2">
            <div className="mb-3">
              <label className="form-label fw-bold small text-uppercase">Desired Date & Time</label>
              <input 
                type="datetime-local" 
                className="form-control form-control-lg border-2" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Special Requests / Notes</label>
              <textarea 
                className="form-control border-2" 
                rows="3"
                placeholder="Any specific needs for your practitioner..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-zenith btn-lg w-100 shadow-sm py-3">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails; 