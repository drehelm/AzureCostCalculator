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
// Allow configuring the port via environment variable, with multiple fallback options
const DEFAULT_PORTS = [3000, 3001, 3002, 3003, 8080, 8081];
let PORT = process.env.PORT ? parseInt(process.env.PORT) : null;

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

// Function to attempt starting the server on different ports
function startServer(ports, index = 0) {
  // If we've tried all ports, show error message
  if (index >= ports.length) {
    console.error('Could not start server. All ports are in use.');
    console.error('Please free up one of these ports or set a different port using:');
    console.error('PORT=<port_number> npm start');
    process.exit(1);
    return;
  }
  
  const currentPort = ports[index];
  
  const server = app.listen(currentPort)
    .on('listening', () => {
      PORT = currentPort; // Store the successful port
      console.log(`\x1b[32m✓ Azure Pricing Proxy server running on port ${PORT}\x1b[0m`);
      console.log(`Access the proxy at http://localhost:${PORT}/api/prices`);
      console.log(`Health check at http://localhost:${PORT}/health`);
      
      // Update the DataService code with this port
      console.log('\nTo use this proxy with a different port, update the _proxyApiUrl in js/data-service.js to:');
      console.log(`\x1b[36mhttp://localhost:${PORT}/api/prices\x1b[0m\n`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${currentPort} is already in use, trying next port...`);
        server.close();
        // Try the next port
        startServer(ports, index + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
}

// Try to start the server with the environment PORT or with default ports sequentially
if (PORT) {
  // If PORT is specified via environment variable, only try that one
  startServer([PORT]);
} else {
  // Otherwise try the default ports in sequence
  startServer(DEFAULT_PORTS);
}