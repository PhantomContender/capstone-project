import React, { useEffect, useState } from 'react';
import api from '../api';

const Home = () => 
{
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => 
    {
      try 
      {
        const res = await api.get('/services');
        setServices(res.data);
      } 
      catch (err) 
      {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="row mt-4">
      <h2 className="mb-4">Our Premium Services</h2>
      {services.map((service) => (
        <div key={service._id} className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">{service.name}</h5>
              <p className="card-text text-muted">{service.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success">${service.price}</span>
                <span className="text-secondary">{service.duration} mins</span>
              </div>
            </div>
            <div className="card-footer bg-white border-top-0">
              <button className="btn btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;