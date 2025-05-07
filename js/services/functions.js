/**
 * Azure Cloud Cost Calculator
 * Azure Functions Calculator
 * 
 * Handles Functions-specific calculations and pricing data
 */

// This file contains Azure Functions-specific logic that could be expanded
// in a more complex application. For now, the main calculation
// is handled in the central calculator.js file.

// Azure Functions plan information
const FUNCTIONS_PLANS = {
    consumption: {
        name: 'Consumption Plan',
        description: 'Pay-per-execution model with automatic scaling',
        features: [
            'Auto-scales based on workload',
            'Pay only when your functions are running',
            'Free grant of 1M executions and 400,000 GB-s per month'
        ],
        limits: [
            'Execution timeout of 10 minutes',
            'Limited background processing capabilities',
            'Cold start latency for infrequently used functions'
        ],
        bestFor: [
            'Intermittent or unpredictable workloads',
            'Development and testing',
            'APIs and microservices with variable traffic'
        ]
    },
    premium: {
        name: 'Premium Plan',
        description: 'Enhanced performance and features with pre-warmed instances',
        features: [
            'Pre-warmed instances to eliminate cold starts',
            'Unlimited execution duration',
            'More powerful instances',
            'VNet connectivity'
        ],
        limits: [
            'Higher cost compared to Consumption plan',
            'Minimum of one always-ready instance'
        ],
        bestFor: [
            'Long-running functions',
            'More predictable workloads requiring faster response times',
            'Applications requiring VNet connectivity',
            'High-performance scenarios'
        ]
    },
    dedicated: {
        name: 'App Service Plan',
        description: 'Run on same VMs as App Service apps',
        features: [
            'Predictable costs',
            'Can leverage existing underutilized App Service plans',
            'Can scale horizontally with multiple instances'
        ],
        limits: [
            'No auto-scaling unless configured at the App Service plan level',
            'Always paying for the VM instances even when functions are idle'
        ],
        bestFor: [
            'Always-on workloads',
            'Predictable workloads',
            'Utilizing existing App Service resources',
            'Scenarios where other services are running on the same plan'
        ]
    }
};

// Memory size information
const FUNCTIONS_MEMORY_SIZES = {
    '0.125': {
        name: '128 MB',
        notes: 'Suitable for lightweight functions with minimal memory requirements'
    },
    '0.25': {
        name: '256 MB',
        notes: 'Good for most basic functions and simple data processing'
    },
    '0.5': {
        name: '512 MB',
        notes: 'Recommended for medium complexity functions with moderate data processing'
    },
    '1': {
        name: '1 GB',
        notes: 'Suitable for complex functions with larger memory requirements'
    },
    '1.5': {
        name: '1.5 GB',
        notes: 'For memory-intensive operations like image processing'
    },
    '2': {
        name: '2 GB',
        notes: 'Maximum memory allocation for high-demand scenarios'
    }
};

// Helper functions to get Azure Functions information
function getFunctionsPlanInfo(plan) {
    return FUNCTIONS_PLANS[plan] || FUNCTIONS_PLANS.consumption;
}

function getFunctionsMemoryInfo(memory) {
    return FUNCTIONS_MEMORY_SIZES[memory] || FUNCTIONS_MEMORY_SIZES['0.5'];
}

// Helper function to estimate execution time based on memory and complexity
function estimateExecutionTime(memorySize, complexity = 'medium') {
    const baseTime = {
        'low': 200,    // 200ms for simple operations
        'medium': 500, // 500ms for moderate complexity
        'high': 1000   // 1000ms for complex operations
    }[complexity] || 500;
    
    // More memory can sometimes mean faster execution for certain workloads
    const memoryFactor = 1 / Math.sqrt(parseFloat(memorySize) || 0.5);
    
    return Math.round(baseTime * memoryFactor);
}

// Calculate GB-seconds based on executions, execution time, and memory
function calculateGBSeconds(executions, executionTimeMs, memoryGB) {
    const executionTimeSeconds = executionTimeMs / 1000;
    return executions * executionTimeSeconds * memoryGB;
}