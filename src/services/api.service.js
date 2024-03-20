import axios from "axios";

const BASE_URL = process.env.ELASTICSEARCH_URL || "http://172.17.7.12:9200";

// Create a reusable Axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: process.env.API_USERNAME || "frontend", // Username
    password: process.env.API_PASSWORD || "1qazXSW@", // Password
  },
});

// Function to make GET requests
export const get = async (url, params) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    console.error("Error status code:", error.response?.status);
    console.error("Error response data:", error.response?.data);

    throw new Error(`Failed to fetch data from the server: ${error.message}`);
  }
};

// API function to fetch traffic allowed data
// export const getTrafficAllowed = async () => {
  export const getTrafficAllowed = async (timeRange = {}) => {
    const url = "/raven*/_count";
    const data = {
      query: {
        bool: {
          must: [
            { wildcard: { "data.action": "pass" } },
            { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
            // { range: { "@timestamp": { gte: "now-1d/d", lte: "now/d" } } },
            { range: { "@timestamp": timeRange } }, // Use provided time range
          ],
        },
      },
    };

    console.log("getTrafficAllowed timeRange:", timeRange);/////////////
    console.log("getTrafficAllowed data:", data);/////////////
    
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
