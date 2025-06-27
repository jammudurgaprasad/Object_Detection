import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setObjects([]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:8000/api/detect/', formData);
      setObjects(response.data.objects);
    } catch (error) {
      alert('Error detecting objects. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Object Detector</h1>
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? <span className="loader"></span> : 'Detect Objects'}
        </button>
      </div>

      {objects.length > 0 && (
        <div className="results">
          <h2>Detected Objects</h2>
          <ul>
            {objects.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;