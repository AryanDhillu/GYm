import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/chest')}>
            Chest
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/back')}>
            Back
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/shoulders')}>
            Shoulders
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/legs')}>
            Legs
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/triceps')}>
            Triceps
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/biceps')}>
            Biceps
          </button>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary w-100" onClick={() => navigate('/abs')}>
            Abs
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
