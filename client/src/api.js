// This automatically picks the right server
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' // If running on laptop, use Local Backend
  : 'https://portfolio-39wr.onrender.com'; // If live, use Render Backend

export default API_URL;