import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Home = () => 
{
  const [services, setServices] = useState([]);

  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const consultAugur = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/ai/recommend', { prompt: userPrompt });
      setAiResponse(data.recommendation);
    } 
    catch (err) 
    {
      setAiResponse("The forge-mind is currently occluded. Try again shortly.");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#e8eeea', minHeight: '100vh', paddingBottom: '3rem' }}>
    <div className="container mt-4">
      <div className="p-5 mb-5 bg-dark text-white rounded-4 shadow-lg" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/images/hero-bg.jpg")', 
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="container-fluid py-5 text-center">
          <h1 className="display-3 fw-bold text-warning mb-3">Refined Relaxation. Restored You.</h1>
          <p className="fs-4 italic mb-4">Experience the ultimate rejuvenation at Zenith Wellness.</p>
          <a href="#services" className="btn btn-zenith btn-lg px-5">Explore Our Signature Treatments</a>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          <div className="card bg-slate text-white p-4 shadow-lg border-gold animate__animated animate__fadeIn">
            <div className="card-body">
              <h3 className="text-warning fw-bold mb-2">CONSULT THE ZENITH ASSISTANT</h3>
              <p className="text-muted mb-4">Descibe your fatigue and desired result; let the AI determine your path.</p>
              
              <form onSubmit={consultAugur} className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-warning py-3" 
                  placeholder="e.g. My shoulders are tight from coding at the forge all day..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  required
                />
                <button className="btn btn-zenith px-4" type="submit" disabled={loading}>
                  {loading ? 'Consulting...' : 'Consult'}
                </button>
              </form>

              {aiResponse && (
  <div className="p-3 bg-dark rounded border-start border-warning border-4 mt-3 animate__animated animate__fadeInUp">
    <div className="d-flex justify-content-between align-items-start">
      <p className="mb-0 italic font-monospace text-white">"{aiResponse}"</p>
      <button 
        className="btn btn-sm text-muted" 
        onClick={() => setAiResponse(null)}
      >
        ✕
      </button>
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SERVICE GALLERY */}
      <h2 id="services" className="mb-4 text-center fw-bold">Our Premium Services</h2>
      <div className="row">
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
                  <p className="fw-bold text-dark mb-2">${service.price}</p>
                  <Link to={`/service/${service._id}`} className="btn btn-zenith w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Home;