/**
 * Azure Cloud Cost Calculator
 * App Service Calculator
 * 
 * Handles App Service-specific calculations and pricing data
 */

// This file contains App Service-specific logic that could be expanded
// in a more complex application. For now, the main calculation
// is handled in the central calculator.js file.

// App Service Tier information
const APP_SERVICE_TIERS = {
    free: {
        name: 'Free',
        description: 'Try out App Service for free',
        features: ['Custom domains not supported', '1 GB storage', 'Shared compute resources'],
        limits: ['60 minutes of compute per day', 'No SLA', '10 apps per subscription'],
        bestFor: ['Development and testing', 'Learning and exploration']
    },
    shared: {
        name: 'Shared',
        description: 'Run low traffic sites',
        features: ['Custom domains supported', '1 GB storage', 'Shared compute resources'],
        limits: ['240 minutes of compute per day', 'No scaling', 'No SLA'],
        bestFor: ['Low-traffic websites', 'Dev/test scenarios']
    },
    basic: {
        name: 'Basic',
        description: 'Run production workloads',
        features: ['Custom domains with SSL', 'Manual scaling up to 3 instances', '10 GB storage'],
        limits: ['Limited auto scale', 'No staging environments'],
        bestFor: ['Low-traffic production websites', 'Development and testing environments']
    },
    standard: {
        name: 'Standard',
        description: 'Run production workloads with enhanced performance and scale',
        features: ['Custom domains with SSL', 'Auto scale up to 10 instances', '50 GB storage', 'Daily backups'],
        limits: ['Limited number of staging environments'],
        bestFor: ['Production web applications', 'Business applications with moderate traffic']
    },
    premium: {
        name: 'Premium',
        description: 'Enhanced performance and security features',
        features: ['Custom domains with SSL', 'Auto scale up to 30 instances', '250 GB storage', 'Hourly backups', 'More deployment slots'],
        limits: ['Higher cost'],
        bestFor: ['High-traffic applications', 'Enterprise applications', 'Applications requiring enhanced performance and scaling']
    }
};

// App Service Size information
const APP_SERVICE_SIZES = {
    f1: {
        name: 'F1',
        tier: 'free',
        cores: 1,
        memory: '1 GB',
        details: 'Shared infrastructure, 60 minutes compute per day'
    },
    d1: {
        name: 'D1',
        tier: 'shared',
        cores: 1,
        memory: '1 GB',
        details: 'Shared infrastructure, 240 minutes compute per day'
    },
    b1: {
        name: 'B1',
        tier: 'basic',
        cores: 1,
        memory: '1.75 GB',
        details: 'Dedicated compute'
    },
    b2: {
        name: 'B2',
        tier: 'basic',
        cores: 2,
        memory: '3.5 GB',
        details: 'Dedicated compute'
    },
    b3: {
        name: 'B3',
        tier: 'basic',
        cores: 4,
        memory: '7 GB',
        details: 'Dedicated compute'
    },
    s1: {
        name: 'S1',
        tier: 'standard',
        cores: 1,
        memory: '1.75 GB',
        details: 'Dedicated compute with auto-scale and daily backups'
    },
    s2: {
        name: 'S2',
        tier: 'standard',
        cores: 2,
        memory: '3.5 GB',
        details: 'Dedicated compute with auto-scale and daily backups'
    },
    s3: {
        name: 'S3',
        tier: 'standard',
        cores: 4,
        memory: '7 GB',
        details: 'Dedicated compute with auto-scale and daily backups'
    },
    p1v2: {
        name: 'P1v2',
        tier: 'premium',
        cores: 1,
        memory: '3.5 GB',
        details: 'Enhanced performance and more features'
    },
    p2v2: {
        name: 'P2v2',
        tier: 'premium',
        cores: 2,
        memory: '7 GB',
        details: 'Enhanced performance and more features'
    },
    p3v2: {
        name: 'P3v2',
        tier: 'premium',
        cores: 4,
        memory: '14 GB',
        details: 'Enhanced performance and more features'
    }
};

// Helper functions to get App Service information (could be used for tooltips or detailed info)
function getAppServiceTierInfo(tier) {
    return APP_SERVICE_TIERS[tier] || APP_SERVICE_TIERS.standard;
}

function getAppServiceSizeInfo(size) {
    return APP_SERVICE_SIZES[size] || APP_SERVICE_SIZES.s1;
}