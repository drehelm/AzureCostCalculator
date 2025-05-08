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
    
    // Azure Retail Prices API URLs
    const _directApiUrl = 'https://prices.azure.com/api/retail/prices';
    // Base proxy URL that will be dynamically updated with available port
    let _proxyApiUrl = 'http://localhost:3000/api/prices';
    
    // Ports to try for the proxy server
    const _proxyPorts = [3000, 3001, 3002, 3003, 8080, 8081];
    
    // Check if proxy is available (can be overridden)
    let _useProxy = false;
    let _proxyPort = null;
    
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
    
    // Check if the proxy server is available on any port
    const _checkProxyAvailability = async () => {
        // If we've already found a working port, try that first
        if (_proxyPort) {
            try {
                const response = await fetch(`http://localhost:${_proxyPort}/health`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    timeout: 2000 // 2 second timeout
                });
                
                if (response.ok) {
                    console.log(`Azure pricing proxy server is available on port ${_proxyPort}`);
                    _useProxy = true;
                    _proxyApiUrl = `http://localhost:${_proxyPort}/api/prices`;
                    return true;
                }
            } catch (error) {
                console.log(`Previously working proxy port ${_proxyPort} is no longer available`);
                _proxyPort = null; // Reset since it's not working anymore
            }
        }
        
        // Try each port in sequence until we find a working one
        for (const port of _proxyPorts) {
            console.log(`Checking for proxy server on port ${port}...`);
            try {
                const response = await fetch(`http://localhost:${port}/health`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    timeout: 1000 // Quick timeout to avoid long waits
                });
                
                if (response.ok) {
                    console.log(`Azure pricing proxy server found on port ${port}!`);
                    _useProxy = true;
                    _proxyPort = port;
                    _proxyApiUrl = `http://localhost:${port}/api/prices`;
                    return true;
                }
            } catch (error) {
                // Just continue to the next port
                console.log(`No proxy server detected on port ${port}`);
            }
        }
        
        // If we get here, no proxy was found on any port
        console.log('Azure pricing proxy server is not available on any port');
        console.log('Make sure the proxy server is running with: cd azure-pricing-proxy && npm start');
        console.log('Using direct API (which will likely fail due to CORS restrictions)');
        _useProxy = false;
        return false;
    };
    
    // Fetch data from Azure Retail Prices API (with proxy fallback)
    const _fetchFromApi = async (params = {}) => {
        // Check if proxy is available
        await _checkProxyAvailability();
        
        try {
            const filter = _formatApiFilter(params);
            
            // Use proxy if available, otherwise try direct API (likely to fail with CORS error)
            const url = _useProxy
                ? `${_proxyApiUrl}?filter=${encodeURIComponent(filter)}`
                : `${_directApiUrl}?$filter=${encodeURIComponent(filter)}`;
            
            console.log(`Fetching pricing data from: ${url}`);
            
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
        },
        
        // Force refresh of pricing data from API
        refreshPricingData: async function() {
            try {
                // Force proxy check
                await _checkProxyAvailability();
                
                if (!_useProxy) {
                    alert("Proxy server is not available. You need to run the local proxy server to use live data.");
                    return {
                        success: false,
                        message: "Proxy server not available"
                    };
                }
                
                // Clear current cache
                localStorage.removeItem(_cacheKey);
                localStorage.removeItem(_cacheExpiryKey);
                
                // Fetch fresh data from API via proxy
                const apiData = await _fetchFromApi({
                    serviceName: 'Virtual Machines'
                });
                
                // Cache the data
                const cachedResult = _cacheData({
                    data: apiData,
                    lastUpdated: new Date().toISOString()
                });
                
                console.log('Successfully refreshed pricing data from Azure API');
                
                // Reload the page to show fresh data
                window.location.reload();
                
                return {
                    success: true,
                    message: "Data refreshed successfully"
                };
            } catch (error) {
                console.error('Failed to refresh pricing data:', error);
                alert("Failed to refresh pricing data. Please ensure the proxy server is running.");
                return {
                    success: false,
                    message: error.message
                };
            }
        }
    };
})();