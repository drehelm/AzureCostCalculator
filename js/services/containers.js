/**
 * Azure Cloud Cost Calculator
 * Container Instances Calculator
 * 
 * Handles Container Instances-specific calculations and pricing data
 */

// This file contains Container Instances-specific logic that could be expanded
// in a more complex application. For now, the main calculation
// is handled in the central calculator.js file.

// Container Instances configuration information
const CONTAINER_INSTANCES_INFO = {
    description: 'Azure Container Instances (ACI) is a serverless container service that allows you to run containers without managing the underlying infrastructure.',
    features: [
        'Fast startup times',
        'Per-second billing',
        'Custom sizes for CPU and memory',
        'Persistent storage options',
        'Virtual network deployment',
        'Linux and Windows containers'
    ],
    useCases: [
        'Simple applications',
        'Task automation and scheduled jobs',
        'Build jobs',
        'Event-driven applications that require rapid scaling',
        'Batch processing'
    ],
    limits: {
        maxCpu: 16,
        maxMemory: 64,
        maxContainersPerGroup: 60,
        availableRegions: [
            'East US', 'West US 2', 'Central US', 'West Europe', 'Southeast Asia',
            'Australia East', 'North Europe', 'South Central US', 'UK South'
        ]
    }
};

// Container sizing recommendations
const CONTAINER_SIZE_RECOMMENDATIONS = [
    {
        name: 'Small',
        cpu: 1,
        memory: 1,
        description: 'Good for small web applications, microservices, and simple batch jobs',
        examples: ['API endpoints', 'Small web servers', 'Automation scripts']
    },
    {
        name: 'Medium',
        cpu: 2,
        memory: 4,
        description: 'Suitable for moderate workloads and applications with higher memory requirements',
        examples: ['Content management systems', 'Development environments', 'Medium batch processing']
    },
    {
        name: 'Large',
        cpu: 4,
        memory: 8,
        description: 'For CPU-intensive applications and workloads requiring significant memory',
        examples: ['Data processing', 'CI/CD build agents', 'Testing environments']
    },
    {
        name: 'Extra Large',
        cpu: 8,
        memory: 16,
        description: 'For demanding applications requiring substantial resources',
        examples: ['Large data transformations', 'Video processing', 'ML model training']
    }
];

// Common container scenarios with estimated resource usage
const CONTAINER_SCENARIOS = {
    webServer: {
        name: 'Web Server',
        recommendedSize: { cpu: 1, memory: 2 },
        estimatedUsage: { hoursPerDay: 24, daysPerMonth: 30 },
        description: 'Running a containerized web server like Nginx or Apache'
    },
    batchJob: {
        name: 'Batch Processing Job',
        recommendedSize: { cpu: 2, memory: 4 },
        estimatedUsage: { hoursPerDay: 8, daysPerMonth: 20 },
        description: 'Running periodic batch jobs like data processing or report generation'
    },
    apiEndpoint: {
        name: 'API Microservice',
        recommendedSize: { cpu: 1, memory: 1 },
        estimatedUsage: { hoursPerDay: 24, daysPerMonth: 30 },
        description: 'Containerized API service as part of a microservices architecture'
    },
    devEnvironment: {
        name: 'Development Environment',
        recommendedSize: { cpu: 2, memory: 4 },
        estimatedUsage: { hoursPerDay: 8, daysPerMonth: 22 },
        description: 'Containerized development environment for testing and development'
    },
    cicdAgent: {
        name: 'CI/CD Build Agent',
        recommendedSize: { cpu: 4, memory: 8 },
        estimatedUsage: { hoursPerDay: 12, daysPerMonth: 22 },
        description: 'Container running continuous integration and deployment tasks'
    }
};

// Helper functions
function getContainerSizeRecommendation(cpu, memory) {
    // Find the closest recommendation based on CPU and memory
    return CONTAINER_SIZE_RECOMMENDATIONS.reduce((closest, current) => {
        const currentDiff = Math.abs(current.cpu - cpu) + Math.abs(current.memory - memory);
        const closestDiff = Math.abs(closest.cpu - cpu) + Math.abs(closest.memory - memory);
        
        return currentDiff < closestDiff ? current : closest;
    }, CONTAINER_SIZE_RECOMMENDATIONS[0]);
}

function getScenarioEstimate(scenarioName) {
    return CONTAINER_SCENARIOS[scenarioName] || CONTAINER_SCENARIOS.webServer;
}

// Calculate container group monthly cost
function estimateContainerMonthlyCost(cpu, memory, hoursPerDay, daysPerMonth, region = 'eastus') {
    // This is just a placeholder for the actual calculation logic that's in calculator.js
    // In a more complex application, you might want to move the calculation logic here
    
    // For now, return null to indicate that this is handled elsewhere
    return null;
}