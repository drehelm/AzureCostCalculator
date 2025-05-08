/**
 * Azure Cloud Cost Calculator
 * Data Service
 *
 * Handles providing pricing data from the fallback pricing data file
 * This data is automatically updated weekly by GitHub Actions
 */

const DataService = (() => {
    // Private methods
    
    // Get the last updated date from the fallback pricing data
    const _getLastUpdated = () => {
        return new Date(FALLBACK_PRICING_DATA.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    // Public methods
    return {
        init: function() {
            console.log('Initializing Data Service');
            
            // Return last updated date from fallback pricing data
            return {
                lastUpdated: _getLastUpdated()
            };
        },
        
        getPricingData: function(serviceName, region) {
            // Direct access to fallback pricing data
            switch(serviceName) {
                case 'virtualMachines':
                    return this.getVMPricing(region);
                case 'appService':
                    return this.getAppServicePricing(region);
                case 'functions':
                    return this.getFunctionsPricing(region);
                case 'containerInstances':
                    return this.getContainerPricing(region);
                default:
                    throw new Error(`Unknown service: ${serviceName}`);
            }
        },
        
        getVMPricing: function(region = 'eastus') {
            return FALLBACK_PRICING_DATA.virtualMachines[region] || FALLBACK_PRICING_DATA.virtualMachines.eastus;
        },
        
        getAppServicePricing: function(region = 'eastus') {
            return FALLBACK_PRICING_DATA.appService[region] || FALLBACK_PRICING_DATA.appService.eastus;
        },
        
        getFunctionsPricing: function(region = 'eastus') {
            return FALLBACK_PRICING_DATA.functions[region] || FALLBACK_PRICING_DATA.functions.eastus;
        },
        
        getContainerPricing: function(region = 'eastus') {
            return FALLBACK_PRICING_DATA.containerInstances[region] || FALLBACK_PRICING_DATA.containerInstances.eastus;
        }
    };
})();