import axios from "axios";
// import https from "https";

const BASE_URL = process.env.ELASTICSEARCH_URL || "http://172.17.7.12:9200";

// // Specify the OneDrive URL of the PEM file
// const PEM_FILE_URL = "http://172.17.7.15/root-ca.pem";

// // Create a custom agent with SSL certificate verification
// const httpsAgent = new https.Agent({
//   //   rejectUnauthorized: true, // Enable SSL certificate verification
//   rejectUnauthorized: false, // Disable SSL certificate verification
// //   ca: PEM_FILE_URL, // Pass the OneDrive URL of the PEM file
// });

// Create a reusable Axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
//   httpsAgent, // Assign the custom agent to handle HTTPS requests
  auth: {
    username: process.env.API_USERNAME || "frontend", // Username
    password: process.env.API_PASSWORD || "1qazXSW@", // Password
  },
});

// Function to make GET requests
export const get = async (url, params) => {
  try {
    console.log("src\services\api.service.js");//////////
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    // Enhanced error handling
    console.error("Error making GET request:", error);

    // Log detailed error information for debugging
    console.error("Error status code:", error.response?.status);
    console.error("Error response data:", error.response?.data);

    // Throw a more informative error message
    throw new Error(`Failed to fetch data from the server: ${error.message}`);
  }
};

// Example API function to fetch traffic allowed data//////////////
export const getTrafficAllowed = async () => {
    const url = "/raven*/_count"; // Update the URL for the POST request
    const data = {
      query: {
        bool: {
          must: [
            { wildcard: { "data.action": "pass" } },
            { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
            { range: { "@timestamp": { gte: "now-1d/d", lte: "now/d" } } },
          ],
        },
      },
    };
  
    console.log("getTrafficAllowed Constructed URL:", url);
  
    try {
        const response = await api.post(url, data);
        return response.data;
      } catch (error) {
        console.error("Error fetching allowed traffic:", error);
        throw new Error(`Failed to fetch allowed traffic data: ${error.message}`);
      }
};

  
  
  // Add more functions for other API requests...
  
  export default api;
