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

## How to Use

1. Download and extract all files to a folder on your computer
2. Open the `index.html` file in any modern web browser
3. Select the Azure service you want to calculate costs for
4. Configure the service parameters
5. Click "Calculate Cost" to see the estimated costs

## Notes

- The application uses cached pricing data when run locally due to CORS restrictions.
- All calculations are estimates and may not reflect actual Azure pricing.
- Last updated: May 2025

## Technical Details

This is a static web application built with HTML, CSS, and JavaScript. No server-side code or build process is required to run it.