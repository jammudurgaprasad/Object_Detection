import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [objects, setObjects] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('http://localhost:8000/api/detect/', formData);
    setObjects(response.data.objects);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Detect Objects</button>

      <h3>Detected Objects:</h3>
      <ul>
        {objects.map((obj, index) => <li key={index}>{obj}</li>)}
      </ul>
    </div>
  );
}

export default App;
