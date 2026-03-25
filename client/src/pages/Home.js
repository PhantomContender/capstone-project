import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

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
    <div className="card h-100 shadow-sm border-0">
      {/* UPDATE THIS LINE BELOW */}
      <img 
        src={service.image} 
        className="card-img-top" 
        alt={service.name} 
        style={{ height: '220px', objectFit: 'cover' }} 
      />
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{service.name}</h5>
        <p className="card-text text-muted">
          {service.description.substring(0, 100)}...
        </p>
        <div className="mt-auto">
          <p className="fw-bold text-primary mb-2">${service.price}</p>
          <Link to={`/service/${service._id}`} className="btn btn-dark w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  </div>
))}
    </div>
  );
};

export default Home;