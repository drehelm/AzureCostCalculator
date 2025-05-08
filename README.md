# Azure Cloud Cost Calculator

A simple web application for estimating Azure cloud service costs.

## Features

- Calculate costs for multiple Azure services:
  - Virtual Machines
  - App Service
  - Azure Functions
  - Container Instances
- View hourly, daily, monthly, and yearly cost estimates
- Detailed cost breakdowns for each service
- Works offline with cached pricing data
- Optional proxy server for fetching live Azure pricing data

## How to Use

1. Download and extract all files to a folder on your computer
2. Open the `index.html` file in any modern web browser
3. Select the Azure service you want to calculate costs for
4. Configure the service parameters
5. Click "Calculate Cost" to see the estimated costs

## Pricing Data Updates

The calculator uses pricing data that is regularly updated through two methods:

### Automated Updates via GitHub Actions

A GitHub Action automatically fetches fresh Azure pricing data on a weekly schedule:

- Runs every Sunday at midnight UTC
- Updates the fallback pricing file with current Azure prices
- Automatically commits and pushes the changes
- No manual intervention required

This ensures that the GitHub Pages deployment always has reasonably up-to-date pricing, even without running a local server.

### Local Development with Live Data

For development or to get real-time pricing updates:

1. Navigate to the `azure-pricing-proxy` directory
2. Install dependencies with `npm install`
3. Start the proxy server with `npm start`
4. Once the proxy is running, click the "Refresh Data" button in the calculator

The proxy server will automatically find an available port if 3000 is already in use.

Detailed instructions can be found in the `azure-pricing-proxy/README.md` file.

## Notes

- The application uses cached pricing data when run locally due to CORS restrictions.
- All calculations are estimates and may not reflect actual Azure pricing.
- Last updated: May 2025

## Technical Details

This is a static web application built with HTML, CSS, and JavaScript. No server-side code or build process is required to run it.