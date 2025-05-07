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
    DataService.init()
        .then(dataSourceInfo => {
            // Update the data source indicator
            const dataSourceText = document.getElementById('dataSourceText');
            const dataSourceDate = document.getElementById('dataSourceDate');
            
            dataSourceText.textContent = dataSourceInfo.isLive 
                ? 'Using live pricing data' 
                : 'Using cached pricing data';
            
            dataSourceDate.textContent = `Last updated: ${dataSourceInfo.lastUpdated}`;
            
            // If using fallback data, change the indicator styling
            if (!dataSourceInfo.isLive) {
                document.getElementById('dataSourceIndicator').style.borderLeftColor = '#ffb900';
            }
        })
        .catch(error => {
            console.error('Error initializing data service:', error);
            document.getElementById('dataSourceText').textContent = 'Error loading pricing data';
            document.getElementById('dataSourceIndicator').style.borderLeftColor = '#d13438';
        });
    
    // Set up the refresh data button event listener
    const refreshDataBtn = document.getElementById('refreshDataBtn');
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', async () => {
            // Add loading state
            refreshDataBtn.classList.add('loading');
            refreshDataBtn.disabled = true;
            
            try {
                // Call the data service to refresh pricing data
                await DataService.refreshPricingData();
                // Note: On success, the page will reload automatically
            } catch (error) {
                console.error('Failed to refresh data:', error);
                // Remove loading state if there was an error
                refreshDataBtn.classList.remove('loading');
                refreshDataBtn.disabled = false;
            }
        });
    }
    
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