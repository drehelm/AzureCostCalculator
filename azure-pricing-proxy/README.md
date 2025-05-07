# Azure Pricing API Proxy Server

This is a simple proxy server that allows the Azure Cloud Cost Calculator to bypass CORS restrictions when fetching pricing data from the Azure Retail Prices API.

## Why is this needed?

The Azure Retail Prices API doesn't include CORS headers that allow direct browser access, resulting in errors like:

```
Access to fetch at 'https://prices.azure.com/api/retail/prices' has been blocked by CORS policy
```

This proxy server acts as a middleware between your application and the Azure API, adding the necessary CORS headers to allow browser access.

## Installation

1. Make sure you have Node.js installed (version 14 or higher)
2. Navigate to this directory
3. Install dependencies:

```bash
npm install
```

## Running the Proxy Server

Start the server with:

```bash
npm start
```

The server will run on port 3000 by default. You should see:

```
Azure Pricing Proxy server running on port 3000
Access the proxy at http://localhost:3000/api/prices
```

## How It Works

1. The proxy server forwards requests to the Azure Retail Prices API
2. It adds proper CORS headers to the response
3. Your web application can then access current Azure pricing data

## Testing the Connection

You can verify the proxy is working by:

1. Opening your browser to: http://localhost:3000/health
2. You should see: `{"status":"ok","message":"Azure Pricing Proxy is running"}`

## Using Live Data in the Calculator

Once the proxy server is running:

1. Open the Azure Cloud Cost Calculator
2. Click the "Refresh Data" button in the top data source indicator
3. If successful, the page will reload and show "Using live pricing data"

## Troubleshooting

- If you see "Proxy server is not available" when refreshing data, make sure the proxy server is running
- Check the console logs in both the proxy server terminal and browser developer tools for error details