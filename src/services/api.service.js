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

// allowedTraffic
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
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching allowedTraffic:", error);
    throw new Error(`Failed to fetch allowedTraffic data: ${error.message}`);
  }
};
// droppedTraffic
export const getDroppedTraffic = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching droppedTraffic:", error);
    throw new Error(`Failed to fetch droppedTraffic data: ${error.message}`);
  }
};
// successfulReceivedEmail
export const getSuccessfulReceivedEmail = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { match: { "data.finalaction": "DELIVERED" } },
          { match: { "decoder.name": "Email_security" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching successfulReceivedEmail:", error);
    throw new Error(
      `Failed to fetch successfulReceivedEmail data: ${error.message}`
    );
  }
};
// quarantinedReceivedEmail
export const getQuarantinedReceivedEmail = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { match: { "data.finalaction": "QUARANTINED" } },
          { match: { "decoder.name": "Email_security" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quarantinedReceivedEmail:", error);
    throw new Error(
      `Failed to fetch quarantinedReceivedEmail data: ${error.message}`
    );
  }
};
// failedReceivedEmail/////////
export const getFailedReceivedEmail = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { match: { "data.finalaction": "ABORTED" } },
          { match: { "decoder.name": "Email_security" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching failedReceivedEmail:", error);
    throw new Error(
      `Failed to fetch failedReceivedEmail data: ${error.message}`
    );
  }
};
/////////////////////////////////////////////////////////////////////////
// droppedTrafficSeverityGovNet
export const getDroppedTrafficSeverityGovNet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { prefix: { "data.srcip": "10." } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
    aggs: {
      top_attacks: {
        terms: {
          field: "data.apprisk",
          size: 5,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching droppedTrafficSeverityGovNet:", error);
    throw new Error(
      `Failed to fetch droppedTrafficSeverityGovNet data: ${error.message}`
    );
  }
};
// droppedTrafficSeverityInternet
export const getDroppedTrafficSeverityInternet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must_not: [{ prefix: { "data.srcip": "10." } }],
        filter: { range: { "@timestamp": timeRange } },
      },
    },
    aggs: {
      top_attacks: {
        terms: {
          field: "data.apprisk",
          size: 5,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching droppedTrafficSeverityInternet:", error);
    throw new Error(
      `Failed to fetch droppedTrafficSeverityInternet: ${error.message}`
    );
  }
};
// top5CountryTrafficAllowed
export const getTop5CountryTrafficAllowed = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { match: { "data.action": "pass" } },
          { match: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": timeRange } },
        ],
        must_not: [
          { term: { "data.srccountry": "Reserved" } },
        ],
      },
    },
    aggs: {
      top_countries: {
        terms: {
          field: "data.srccountry",
          size: 5,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top5CountryTrafficAllowed:", error);
    throw new Error(
      `Failed to fetch top5CountryTrafficAllowed data: ${error.message}`
    );
  }
};
// top5CountryTrafficBlocked
export const getTop5CountryTrafficBlocked = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { match: { "data.action": "dropped" } },
          { match: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": timeRange } },
        ],
        must_not: [
          { term: { "data.srccountry": "Reserved" } },
        ],
      },
    },
    aggs: {
      top_countries: {
        terms: {
          field: "data.srccountry",
          size: 5,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top5CountryTrafficBlocked:", error);
    throw new Error(
      `Failed to fetch top5CountryTrafficBlocked data: ${error.message}`
    );
  }
};
// vpnUsersConnected
export const getVpnUsersConnected = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { match: { "data.subtype": "vpn" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
    aggs: {
      top_users: {
        terms: {
          field: "data.dstuser",
          size: 5,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getVpnUsersConnected:", error);
    throw new Error(
      `Failed to fetch getVpnUsersConnected data: ${error.message}`
    );
  }
};
// top10AppsUsedInternally
export const getTop10AppsUsedInternally = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { match: { "decoder.name": "cisco-ftd" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
    aggs: {
      top_websites: {
        terms: {
          field: "data.WebApplication",
          size: 10,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top10AppsUsedInternally:", error);
    throw new Error(
      `Failed to fetch top10AppsUsedInternally data: ${error.message}`
    );
  }
};
// top10RequestedAppsGovNet
export const getTop10RequestedAppsGovNet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must: [
          { match: { "decoder.name": "Barracuda_custom" } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
    aggs: {
      top_websites: {
        terms: {
          field: "data.dhost",
          size: 10,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top10RequestedAppsGovNet:", error);
    throw new Error(
      `Failed to fetch top10RequestedAppsGovNet data: ${error.message}`
    );
  }
};
// top10RequestedAppsInternet////////////////
export const getTop10RequestedAppsInternet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must_not: [
          { wildcard: { "data.src": "10.*" } }
        ],
        must: [
          { match: { "decoder.name": "Barracuda_custom" } },
          { range: { "@timestamp": timeRange } }
        ],
      },
    },
    aggs: {
      top_websites: {
        terms: {
          field: "data.dhost",
          size: 10,
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top10RequestedAppsInternet:", error);
    throw new Error(
      `Failed to fetch top10RequestedAppsInternet data: ${error.message}`
    );
  }
};

// Add more functions for other API requests...

export default api;
