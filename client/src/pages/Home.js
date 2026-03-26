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
      <div className="p-5 mb-4 bg-dark text-white rounded-3 shadow-lg" 
     style={{ 
       backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/hero-bg.jpg")', 
       backgroundSize: 'cover',
       backgroundPosition: 'center'
     }}>
    <div className="container-fluid py-5 text-center">
      <h1 className="display-4 fw-bold text-warning">Refined Relaxation, Restored You.</h1>
        <p className="fs-4 italic">Experience the ultimate rejuvenation at Zenith Wellness.</p>
          <button className="btn btn-zenith btn-lg mt-3" type="button">Explore Our Signature Treatments</button>
  </div>
</div>
     {services.map((service) => (
  <div key={service._id} className="col-md-4 mb-4">
    <div className="card h-100 shadow-sm border-0">

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