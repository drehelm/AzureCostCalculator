/**
 * Azure Pricing API Proxy Server
 * 
 * This simple Express server acts as a proxy between the frontend 
 * application and the Azure Retail Prices API to bypass CORS restrictions.
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Base URL for Azure Retail Prices API
const AZURE_API_URL = 'https://prices.azure.com/api/retail/prices';

// Main proxy endpoint
app.get('/api/prices', async (req, res) => {
  try {
    // Get the filter parameter from the query string
    const filter = req.query.filter || '';
    
    // Construct the Azure API URL with the filter
    const apiUrl = `${AZURE_API_URL}?$filter=${encodeURIComponent(filter)}`;
    
    console.log(`Proxying request to: ${apiUrl}`);
    
    // Fetch data from Azure API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    // Get the response data as JSON
    const data = await response.json();
    
    // Send the data back to the client
    res.json(data);
    
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Failed to fetch data from Azure API' });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Azure Pricing Proxy is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Azure Pricing Proxy server running on port ${PORT}`);
  console.log(`Access the proxy at http://localhost:${PORT}/api/prices`);
});