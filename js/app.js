/**
 * Azure Cloud Cost Calculator
 * Main Application File
 */

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Azure Cloud Cost Calculator initialized');
    
    // Initialize the UI controller
    UIController.init();
    
    // Initialize the data service
    const dataSourceInfo = DataService.init();
        
    // Update the data source indicator
    const dataSourceText = document.getElementById('dataSourceText');
    const dataSourceDate = document.getElementById('dataSourceDate');
    
    dataSourceText.textContent = 'Azure pricing data';
    dataSourceDate.textContent = `Last updated: ${dataSourceInfo.lastUpdated}`;
    
    // Set the data source indicator styling
    document.getElementById('dataSourceIndicator').style.borderLeftColor = '#0078d4';
    
    // Set up the calculate button event listener
    document.getElementById('calculate-btn').addEventListener('click', () => {
        // Get the active service
        const activeService = document.querySelector('.tab-btn.active').dataset.service;
        
        // Get the configuration for the active service
        const config = UIController.getCurrentConfiguration(activeService);
        
        // Calculate the costs
        const results = Calculator.calculateCost(activeService, config);
        
        // Display the results
        UIController.displayResults(results);
    });
    
    // Set the last updated date in the footer
    document.getElementById('last-updated-date').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
});