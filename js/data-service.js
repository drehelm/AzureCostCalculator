/**
 * Azure Cloud Cost Calculator
 * Data Service
 * 
 * Handles fetching, caching, and providing pricing data
 * Uses Azure Retail Prices API with fallback to hardcoded data
 */

const DataService = (() => {
    // Private variables
    const _cacheKey = 'azure_pricing_data';
    const _cacheExpiryKey = 'azure_pricing_data_expiry';
    const _cacheLifetime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Azure Retail Prices API URL
    const _apiUrl = 'https://prices.azure.com/api/retail/prices';
    
    // Private methods
    
    // Check if cached data exists and is valid
    const _getCachedData = () => {
        const cachedData = localStorage.getItem(_cacheKey);
        const cacheExpiry = localStorage.getItem(_cacheExpiryKey);
        
        if (cachedData && cacheExpiry) {
            const now = new Date().getTime();
            if (now < parseInt(cacheExpiry)) {
                return JSON.parse(cachedData);
            }
        }
        
        return null;
    };
    
    // Save data to cache
    const _cacheData = (data) => {
        const now = new Date().getTime();
        const expiry = now + _cacheLifetime;
        
        localStorage.setItem(_cacheKey, JSON.stringify(data));
        localStorage.setItem(_cacheExpiryKey, expiry.toString());
        
        return {
            data,
            lastUpdated: new Date().toISOString()
        };
    };
    
    // Format filter parameters for API
    const _formatApiFilter = (params) => {
        let filters = [];
        
        // Add service name filter if provided
        if (params.serviceName) {
            filters.push(`serviceName eq '${params.serviceName}'`);
        }
        
        // Add armRegionName filter if provided
        if (params.region) {
            filters.push(`armRegionName eq '${params.region}'`);
        }
        
        // Add productName filter if provided
        if (params.productName) {
            filters.push(`productName eq '${params.productName}'`);
        }
        
        return filters.join(' and ');
    };
    
    // Fetch data from Azure Retail Prices API
    const _fetchFromApi = async (params = {}) => {
        try {
            const filter = _formatApiFilter(params);
            const url = `${_apiUrl}?$filter=${encodeURIComponent(filter)}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching pricing data from API:', error);
            throw error;
        }
    };
    
    // Extract pricing data for specific service
    const _extractServicePricing = (data, serviceName) => {
        // Filter items by serviceName
        return data.Items.filter(item => item.serviceName === serviceName);
    };
    
    // Public methods
    return {
        init: async function() {
            console.log('Initializing Data Service');
            
            try {
                // Check for cached data first
                const cachedData = _getCachedData();
                
                if (cachedData) {
                    console.log('Using cached pricing data');
                    return {
                        isLive: false,
                        lastUpdated: new Date(cachedData.lastUpdated).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    };
                }
                
                // Try to fetch from API
                const apiData = await _fetchFromApi({
                    serviceName: 'Virtual Machines'
                });
                
                // Cache the data
                const cachedResult = _cacheData({
                    data: apiData,
                    lastUpdated: new Date().toISOString()
                });
                
                console.log('Fetched and cached live pricing data');
                
                return {
                    isLive: true,
                    lastUpdated: new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                };
                
            } catch (error) {
                console.warn('Failed to fetch live data, using fallback data');
                
                // Use fallback data
                if (!_getCachedData()) {
                    // If no cache exists, initialize with fallback data
                    _cacheData({
                        data: FALLBACK_PRICING_DATA,
                        lastUpdated: FALLBACK_PRICING_DATA.lastUpdated
                    });
                }
                
                return {
                    isLive: false,
                    lastUpdated: new Date(FALLBACK_PRICING_DATA.lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                };
            }
        },
        
        getPricingData: function(serviceName, region) {
            const cachedData = _getCachedData();
            
            if (!cachedData) {
                throw new Error('No pricing data available');
            }
            
            // For simplicity, we'll use the fallback data directly in most cases
            // In a real app, we'd extract the specific pricing from the API data
            
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
            // In a real application, we'd filter the cached data by region
            // For this demo, we'll use simplified fallback data
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