import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    const errorMsg = err.response?.data?.message || 'The booking ritual failed.';
    alert(errorMsg);
  }
};

  if (!service) return <div>Loading the Archives...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={service.image} alt={service.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2>{service.name}</h2>
          <p className="lead">{service.description}</p>
          <p><strong>Duration:</strong> {service.duration} mins</p>
          <p><strong>Price:</strong> ${service.price}</p>
          
          <form onSubmit={submitHandler} className="mt-4 p-4 bg-light rounded shadow-sm">
            <h4>Book Your Appointment</h4>
            <div className="mb-3">
              <label className="form-label">Date & Time</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Notes for the Practitioner</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;