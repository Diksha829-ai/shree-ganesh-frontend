import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [carData, setCarData] = useState({ name: '', type: '', capacity: '', pricePerKm: '', desc: '' });
  const [image, setImage] = useState(null);

  // Use the live Render URL from your environment variables or paste it directly
  const API_URL = process.env.REACT_APP_API_URL || 'https://shree-ganesh-backend.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append text fields
    Object.keys(carData).forEach(key => formData.append(key, carData[key]));
    // Append the image file
    formData.append('image', image);

    try {
      // Updated to use the live API_URL
      await axios.post(`${API_URL}/api/fleet/add`, formData);
      alert("Car added successfully!");
      // Optional: clear the form after success
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Error adding car. Make sure the backend is awake!");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Add New Vehicle to Fleet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Helper Note for Owner Requirements */}
        <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 mb-4">
          <strong>Owner Request:</strong> Please use 13 for Dezair and 15 for Ertiga.
        </div>

        <input type="text" placeholder="Car Name (e.g. Dezair)" className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-orange-500" 
          onChange={(e) => setCarData({...carData, name: e.target.value})} required />
        
        <select className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-orange-500" onChange={(e) => setCarData({...carData, type: e.target.value})}>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="MPV">MPV</option>
        </select>

        <input type="text" placeholder="Capacity (e.g. 4 Seater)" className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-orange-500" 
          onChange={(e) => setCarData({...carData, capacity: e.target.value})} />

        <input type="number" placeholder="Price per KM (e.g. 13)" className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-orange-500" 
          onChange={(e) => setCarData({...carData, pricePerKm: e.target.value})} />

        <textarea placeholder="Description (e.g. Clean, AC, Professional Driver)" className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-orange-500" 
          onChange={(e) => setCarData({...carData, desc: e.target.value})} />

        <div className="border-2 border-dashed border-orange-200 p-4 text-center rounded-lg bg-gray-50">
          <label className="block mb-2 font-bold text-gray-700">Upload Car Image</label>
          <input type="file" className="text-sm" onChange={(e) => setImage(e.target.files[0])} required />
        </div>

        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition duration-300 shadow-lg">
          Save Car to Database
        </button>
      </form>
    </div>
  );
};

export default Admin;