const axios = require('axios');

const BASE_URL = process.env.NIBSS_BASE_URL;

const headers = {
     'x-NIBSS-API': process.env.NIBSS_API_URL,
     'x-api-key': process.env.NIBSS_API_KEY
};

// Name Enquiry
exports.nameEnquiry = async (accountNumber) => {
    return axios.get(`${BASE_URL}/api/nameEnquiry/${accountNumber}`, { headers });
};

// Transfer
exports.transfer = async (data) => {
    return axios.post(`${BASE_URL}/api/transfer`, data, { headers });
};

// Transaction Status
exports.getTransaction = async (ref) => {
    return axios.get(`${BASE_URL}/api/transaction/${ref}`, { headers });
};

