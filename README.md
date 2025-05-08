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
- Uses pricing data that's automatically updated weekly via GitHub Actions

## How to Use

1. Download and extract all files to a folder on your computer
2. Open the `index.html` file in any modern web browser
3. Select the Azure service you want to calculate costs for
4. Configure the service parameters
5. Click "Calculate Cost" to see the estimated costs

## Automated Pricing Data Updates

The calculator uses pricing data that is automatically updated on a weekly schedule via GitHub Actions:

- Runs every Sunday at midnight UTC
- Connects to the Azure Retail Prices API to fetch the latest pricing data
- Updates the pricing data file with current Azure prices
- Automatically commits and pushes the changes
- No manual intervention required

This ensures that both the local version and GitHub Pages deployment always have up-to-date pricing information without requiring any additional setup or configuration.

## Notes

- All calculations are estimates and may not reflect actual Azure pricing with 100% accuracy.
- Pricing data is automatically updated weekly through GitHub Actions.
- Last updated: May 2025

## Technical Details

This is a static web application built with HTML, CSS, and JavaScript. No server-side code or build process is required to run it.
