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

/////////////////////////////////////////////////////////////////////////
  export const getAllowedTraffic = async (timeRange = {}) => {
    const url = "/raven*/_count";
    const data = {
      query: {
        bool: {
          must: [
            { wildcard: { "data.action": "pass" } },
            { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
            { range: { "@timestamp": timeRange } },
          ],
        },
      },
    };

    console.log("getAllowedTraffic data:", data);/////////////
    
    try {
        const response = await api.post(url, data);
        return response.data;
      } catch (error) {
        console.error("Error fetching allowed traffic:", error);
        throw new Error(`Failed to fetch allowed traffic data: ${error.message}`);
      }
};
/////////////////////////////////////////////////////////////////////////
export const getDroppedTrafficSeverityGovNet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          { "prefix": { "data.srcip": "10." } },
          { "range": { "@timestamp": timeRange } }
        ]
      }
    },
    "aggs": {
      "top_attacks": {
        "terms": {
          "field": "data.apprisk",
          "size": 5
        }
      }
    }
  };

  console.log("getDroppedTrafficSeverityGovNet data:", data);////////

  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dropped traffic severity:", error);
    throw new Error(`Failed to fetch dropped traffic severity data: ${error.message}`);
  }
};

  
  
  // Add more functions for other API requests...
  
  export default api;
