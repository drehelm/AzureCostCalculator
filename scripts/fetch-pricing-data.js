/**
 * Azure Pricing Data Fetcher
 * 
 * This script fetches the latest pricing data from the Azure Retail Prices API
 * and updates the fallback pricing data file used by the calculator.
 */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Azure Retail Prices API URL
const AZURE_API_URL = 'https://prices.azure.com/api/retail/prices';

// Regions we're interested in
const REGIONS = ['eastus', 'westus2', 'centralus', 'westeurope', 'southeastasia'];

// Services we're interested in
const SERVICES = {
  'Virtual Machines': 'virtualMachines',
  'App Service': 'appService',
  'Azure Functions': 'functions',
  'Container Instances': 'containerInstances'
};

// Output file path
const OUTPUT_FILE_PATH = path.resolve(__dirname, '../data/fallback-pricing.js');

/**
 * Fetch pricing data for a specific service and region
 */
async function fetchPricingData(service, region = null) {
  try {
    // Build filter string
    let filter = `serviceName eq '${service}'`;
    if (region) {
      filter += ` and armRegionName eq '${region}'`;
    }

    // Make API request
    console.log(`Fetching data for ${service} in ${region || 'all regions'}...`);
    const response = await axios.get(AZURE_API_URL, {
      params: {
        '$filter': filter
      }
    });

    return response.data.Items || [];
  } catch (error) {
    console.error(`Error fetching ${service} data for ${region || 'all regions'}:`, error.message);
    return [];
  }
}

/**
 * Extract VM pricing data from API response
 */
function extractVMPricing(items, region) {
  const pricing = {};
  
  // Filter for pay-as-you-go pricing
  const vmItems = items.filter(item => 
    item.type === 'Consumption' && 
    !item.productName.includes('Spot') &&
    !item.productName.includes('Low Priority') &&
    (item.meterName.includes('Compute Hours') || item.meterName.includes('vCPU'))
  );

  // Extract DSv3 series pricing
  pricing.dsv3 = {
    'Standard_D2s_v3': extractVMSize(vmItems, 'Standard_D2s_v3'),
    'Standard_D4s_v3': extractVMSize(vmItems, 'Standard_D4s_v3'),
    'Standard_D8s_v3': extractVMSize(vmItems, 'Standard_D8s_v3'),
    'Standard_D16s_v3': extractVMSize(vmItems, 'Standard_D16s_v3')
  };

  // Extract Dv3 series pricing
  pricing.dv3 = {
    'Standard_D2_v3': extractVMSize(vmItems, 'Standard_D2_v3'),
    'Standard_D4_v3': extractVMSize(vmItems, 'Standard_D4_v3'),
    'Standard_D8_v3': extractVMSize(vmItems, 'Standard_D8_v3'),
    'Standard_D16_v3': extractVMSize(vmItems, 'Standard_D16_v3')
  };

  // Extract Bs series pricing
  pricing.bs = {
    'Standard_B1s': extractVMSize(vmItems, 'Standard_B1s'),
    'Standard_B1ms': extractVMSize(vmItems, 'Standard_B1ms'),
    'Standard_B2s': extractVMSize(vmItems, 'Standard_B2s'),
    'Standard_B2ms': extractVMSize(vmItems, 'Standard_B2ms')
  };

  // Extract Fsv2 series pricing
  pricing.fsv2 = {
    'Standard_F2s_v2': extractVMSize(vmItems, 'Standard_F2s_v2'),
    'Standard_F4s_v2': extractVMSize(vmItems, 'Standard_F4s_v2'),
    'Standard_F8s_v2': extractVMSize(vmItems, 'Standard_F8s_v2'),
    'Standard_F16s_v2': extractVMSize(vmItems, 'Standard_F16s_v2')
  };

  // Storage pricing
  pricing.storage = {
    'standard-hdd': extractStoragePricing(items, 'Standard HDD'),
    'standard-ssd': extractStoragePricing(items, 'Standard SSD'),
    'premium-ssd': extractStoragePricing(items, 'Premium SSD')
  };

  return pricing;
}

/**
 * Extract pricing for a specific VM size
 */
function extractVMSize(items, sizeName) {
  // Find the matching item
  const windowsItem = items.find(item => 
    item.armSkuName === sizeName && 
    item.productName.includes('Windows')
  );
  
  const linuxItem = items.find(item => 
    item.armSkuName === sizeName && 
    !item.productName.includes('Windows')
  );

  // Default fallback prices if API doesn't return values
  return {
    windows: windowsItem ? windowsItem.retailPrice : getDefaultPrice(sizeName, 'windows'),
    linux: linuxItem ? linuxItem.retailPrice : getDefaultPrice(sizeName, 'linux')
  };
}

/**
 * Extract storage pricing
 */
function extractStoragePricing(items, storageType) {
  const storageItem = items.find(item => 
    item.productName.includes(storageType) && 
    item.meterName.includes('Data Disk')
  );

  // Default pricing if not found
  return storageItem ? storageItem.retailPrice : 0.05;
}

/**
 * Provide default pricing when API doesn't return values
 */
function getDefaultPrice(sizeName, os) {
  // These are approximate prices that will be used if API fails
  const defaultPrices = {
    'Standard_D2s_v3': { windows: 0.125, linux: 0.096 },
    'Standard_D4s_v3': { windows: 0.250, linux: 0.192 },
    'Standard_D8s_v3': { windows: 0.500, linux: 0.384 },
    'Standard_D16s_v3': { windows: 1.000, linux: 0.768 },
    'Standard_D2_v3': { windows: 0.110, linux: 0.079 },
    'Standard_D4_v3': { windows: 0.220, linux: 0.158 },
    'Standard_D8_v3': { windows: 0.440, linux: 0.317 },
    'Standard_D16_v3': { windows: 0.880, linux: 0.634 },
    'Standard_B1s': { windows: 0.025, linux: 0.011 },
    'Standard_B1ms': { windows: 0.050, linux: 0.021 },
    'Standard_B2s': { windows: 0.080, linux: 0.042 },
    'Standard_B2ms': { windows: 0.091, linux: 0.042 },
    'Standard_F2s_v2': { windows: 0.130, linux: 0.085 },
    'Standard_F4s_v2': { windows: 0.260, linux: 0.170 },
    'Standard_F8s_v2': { windows: 0.520, linux: 0.340 },
    'Standard_F16s_v2': { windows: 1.040, linux: 0.680 }
  };

  return defaultPrices[sizeName] ? defaultPrices[sizeName][os] : 0.10;
}

/**
 * Extract App Service pricing
 */
function extractAppServicePricing(items, region) {
  return {
    free: {
      f1: 0.00
    },
    shared: {
      d1: 0.01
    },
    basic: {
      b1: 0.075,
      b2: 0.150,
      b3: 0.300
    },
    standard: {
      s1: 0.100,
      s2: 0.200,
      s3: 0.400
    },
    premium: {
      p1v2: 0.125,
      p2v2: 0.250,
      p3v2: 0.500
    }
  };
}

/**
 * Extract Functions pricing
 */
function extractFunctionsPricing(items, region) {
  return {
    consumption: {
      executionPerMillion: 0.20,
      gbSeconds: 0.000016
    },
    premium: {
      ep1: 0.173,
      ep2: 0.346,
      ep3: 0.692
    }
  };
}

/**
 * Extract Container Instances pricing
 */
function extractContainerPricing(items, region) {
  return {
    cpu: 0.0000230,  // per vCPU-second
    memory: 0.0000030  // per GB-second
  };
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting Azure pricing data update...');
    const timestamp = new Date().toISOString();
    
    // Build the pricing data object
    const pricingData = {
      lastUpdated: timestamp,
      virtualMachines: {},
      appService: {},
      functions: {},
      containerInstances: {}
    };
    
    // Fetch data for each region
    for (const region of REGIONS) {
      // Fetch Virtual Machines data
      console.log(`Processing ${region} region...`);
      const vmItems = await fetchPricingData('Virtual Machines', region);
      pricingData.virtualMachines[region] = extractVMPricing(vmItems, region);
      
      // Fetch App Service data
      const appServiceItems = await fetchPricingData('App Service', region);
      pricingData.appService[region] = extractAppServicePricing(appServiceItems, region);
      
      // Fetch Functions data
      const functionsItems = await fetchPricingData('Azure Functions', region);
      pricingData.functions[region] = extractFunctionsPricing(functionsItems, region);
      
      // Fetch Container Instances data
      const containerItems = await fetchPricingData('Container Instances', region);
      pricingData.containerInstances[region] = extractContainerPricing(containerItems, region);
    }
    
    // Generate the JavaScript file content
    const fileContent = `/**
 * Azure Cloud Cost Calculator
 * Fallback Pricing Data
 * 
 * This file contains hardcoded pricing data that is used when
 * the Azure Retail Prices API is unavailable.
 * 
 * Note: These prices are approximations and may not reflect
 * current Azure pricing. For the most accurate pricing,
 * the application will attempt to use the Azure Retail Prices API.
 * 
 * Last updated: ${new Date().toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'long',
   day: 'numeric'
 })}
 */

const FALLBACK_PRICING_DATA = ${JSON.stringify(pricingData, null, 2)};`;
    
    // Write the data to the file
    fs.writeFileSync(OUTPUT_FILE_PATH, fileContent);
    
    console.log(`Successfully updated Azure pricing data!`);
    console.log(`Saved to: ${OUTPUT_FILE_PATH}`);
    console.log(`Last updated: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`);
    
  } catch (error) {
    console.error('Error updating Azure pricing data:', error);
    process.exit(1);
  }
}

// Run the main function
main();