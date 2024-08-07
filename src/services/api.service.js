import axios from "axios";

const BASE_URL = process.env.ELASTICSEARCH_URL || "http://172.17.7.12:9200";

const api = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: process.env.API_USERNAME || "frontend", // Username
    password: process.env.API_PASSWORD || "1qazXSW@", // Password
  },
});
////////////////////////////////////////////////////////////////////////
// Fetch existing users
export const getUsers = async () => {
  try {
    console.log("Fetching users...");
    const response = await axios.get('http://localhost/user_management/getUsers.php');
    console.log("Users fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(`Failed to fetch users data: ${error.message}`);
  }
};
// Create new users
export const saveUser = async (userData) => {
  try {
    console.log("Creating new users...");
    const response = await axios.post('http://localhost/user_management/save-user.php', userData);
    console.log("Users created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving users:", error);
    throw new Error(`Failed to save users data: ${error.message}`);
  }
};
// Set new user passwords
export const setPassword = async (token, password) => {
  try {
    console.log("Creating new user password...");
    const response = await axios.post('http://localhost/user_management/set-password.php', { token, password });
    console.log("Users password created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error setting users password:", error);
    throw new Error(`Failed to set users password: ${error.message}`);
  }
};
// Save reset token for user
export const saveResetToken = async (userId, token) => {
  try {
    console.log("Saving reset token...");
    const response = await axios.post(`http://localhost/user_management/save-reset-token.php`, { userId, token });
    console.log("Reset token saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving reset token:", error);
    throw new Error(`Failed to save reset token: ${error.message}`);
  }
};
// Delete user
export const deleteUser = async (userId) => {
  try {
    console.log("Deleting user...");
    const response = await axios.post(`http://localhost/user_management/delete-user.php`, { userId });
    console.log("User deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};
////////////////////////////////////////////////////////////////////////////////////
// Chart Traffic Data For WEEK 1
// allowedTrafficWeek1
export const getAllowedTrafficWeek1 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-7d/d", lte: "now/d" } } },
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
// droppedTrafficWeek1
export const getDroppedTrafficWeek1 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-7d/d", lte: "now/d" } } },
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
// Chart Traffic Data For WEEK 2
// allowedTrafficWeek2
export const getAllowedTrafficWeek2 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-14d/d", lte: "now-7d/d" } } },
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
// droppedTrafficWeek2
export const getDroppedTrafficWeek2 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-14d/d", lte: "now-7d/d" } } },
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
// Chart Traffic Data For WEEK 3
// allowedTrafficWeek3
export const getAllowedTrafficWeek3 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-21d/d", lte: "now-14d/d" } } },
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
// droppedTrafficWeek3
export const getDroppedTrafficWeek3 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-21d/d", lte: "now-14d/d" } } },
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
// Chart Traffic Data For WEEK 4
// allowedTrafficWeek4
export const getAllowedTrafficWeek4 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-28d/d", lte: "now-21d/d" } } },
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
// droppedTrafficWeek4
export const getDroppedTrafficWeek4 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-28d/d", lte: "now-21d/d" } } },
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
// Chart Traffic Data For WEEK 5
// allowedTrafficWeek5
export const getAllowedTrafficWeek5 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-35d/d", lte: "now-28d/d" } } },
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
// droppedTrafficWeek5
export const getDroppedTrafficWeek5 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-35d/d", lte: "now-28d/d" } } },
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
// Chart Traffic Data For WEEK 6
// allowedTrafficWeek6
export const getAllowedTrafficWeek6 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-42d/d", lte: "now-35d/d" } } },
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
// droppedTrafficWeek6
export const getDroppedTrafficWeek6 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-42d/d", lte: "now-35d/d" } } },
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
// Chart Traffic Data For WEEK 7
// allowedTrafficWeek7
export const getAllowedTrafficWeek7 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "pass" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-49d/d", lte: "now-42d/d" } } },
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
// droppedTrafficWeek7
export const getDroppedTrafficWeek7 = async () => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { wildcard: { "data.action": "dropped" } },
          { wildcard: { "decoder.name": "fortigate-firewall-v5" } },
          { range: { "@timestamp": { gte: "now-49d/d", lte: "now-42d/d" } } },
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
// failedReceivedEmail
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
          { terms: { "data.apprisk": ["low", "medium", "high"] } }
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
        must: [{ terms: { "data.apprisk": ["low", "medium", "high"] } }],
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
        must_not: [{ term: { "data.srccountry": "Reserved" } }],
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
        must_not: [{ term: { "data.srccountry": "Reserved" } }],
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
          { prefix: { "data.srcip": "10." } },
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
// top10RequestedAppsInternet
export const getTop10RequestedAppsInternet = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      bool: {
        must_not: [
          { prefix: { "data.src": "10.*" } }
        ],
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
    console.error("Error fetching top10RequestedAppsInternet:", error);
    throw new Error(
      `Failed to fetch top10RequestedAppsInternet data: ${error.message}`
    );
  }
};
// allEventData
export const getAllEventData = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 100, // Increase size to fetch more hits
    query: {
      range: { "@timestamp": timeRange },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching allEventData:", error);
    throw new Error(`Failed to fetch allEventData data: ${error.message}`);
  }
};
// filterSrcipOptions
export const getFilterSrcipOptions = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      range: { "@timestamp": timeRange },
    },
    aggs: {
      unique_source_ips: {
        terms: {
          field: "data.srcip",
          size: 1000, ////////////
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getFilterSrcipOptions:", error);
    throw new Error(
      `Failed to fetch getFilterSrcipOptions data: ${error.message}`
    );
  }
};
// filterDstipOptions
export const getFilterDstipOptions = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      range: { "@timestamp": timeRange },
    },
    aggs: {
      unique_destination_ips: {
        terms: {
          field: "data.dstip",
          size: 1000, /////////////
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getFilterDstipOptions:", error);
    throw new Error(
      `Failed to fetch getFilterDstipOptions data: ${error.message}`
    );
  }
};
// filteredEventData
export const getFilteredEventData = async (
  selectedSrcIP,
  selectedDstIP,
  timeRange = {}
) => {
  const url = "/raven*/_search?pretty";
  const query = {
    size: 100, // Increase size to fetch more hits
    query: {
      bool: {
        must: [{ range: { "@timestamp": timeRange } }],
      },
    },
  };
  if (selectedSrcIP) {
    query.query.bool.must.push({ match: { "data.srcip": selectedSrcIP } });
  }
  if (selectedDstIP) {
    query.query.bool.must.push({ match: { "data.dstip": selectedDstIP } });
  }
  try {
    const response = await api.post(url, query);
    return response.data;
  } catch (error) {
    console.error("Error fetching filteredEventData:", error);
    throw new Error(`Failed to fetch filteredEventData data: ${error.message}`);
  }
};
// totalEventNumbers
export const getTotalEventNumbers = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      range: { "@timestamp": timeRange },
    },
    aggs: {
      total_count: {
        filter: {
          exists: { field: "data.apprisk" },
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching allEventData:", error);
    throw new Error(`Failed to fetch allEventData data: ${error.message}`);
  }
};
// riskyEventNumbers
export const getRiskyEventNumbers = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          { terms: { "data.apprisk": ["high", "critical"] } },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getRiskyEventNumbers:", error);
    throw new Error(
      `Failed to fetch getRiskyEventNumbers data: ${error.message}`
    );
  }
};
// endpointOperationCount
export const getEndpointOperationCount = async (timeRange = {}) => {
  const url = "/raven*/_count";
  const data = {
    query: {
      bool: {
        must: [
          {
            wildcard: { "data.event.OperationName": "quarantined_file_update" },
          },
          { range: { "@timestamp": timeRange } },
        ],
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getEndpointOperationCount:", error);
    throw new Error(
      `Failed to fetch getEndpointOperationCount data: ${error.message}`
    );
  }
};
// endpointSeverityNumbers
export const getEndpointSeverityNumbers = async (timeRange = {}) => {
  const url = "/raven*/_search?pretty";
  const data = {
    size: 0,
    query: {
      range: { "@timestamp": timeRange },
    },
    aggs: {
      severity_counts: {
        terms: {
          field: "data.event.SeverityName",
        },
      },
    },
  };
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getEndpointSeverityNumbers:", error);
    throw new Error(
      `Failed to fetch getEndpointSeverityNumbers data: ${error.message}`
    );
  }
};
////////////////////////////////////////////////////////////////////////////

export default api;
