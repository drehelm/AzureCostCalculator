/**
 * Azure Cloud Cost Calculator
 * Calculator Logic
 */

const Calculator = (() => {
    // Private methods
    
    // Calculate Virtual Machine costs
    const _calculateVMCost = (config) => {
        const vmPricing = DataService.getVMPricing(config.region);
        
        // Get the pricing for the selected VM size
        const vmSizePricing = vmPricing.sizes[config.size] || vmPricing.sizes.Standard_D2s_v3;
        
        // Calculate compute cost
        let computeCost = vmSizePricing.price;
        
        // Adjust for OS (Windows usually costs more)
        if (config.os === 'windows' && vmSizePricing.windowsPremium) {
            computeCost += vmSizePricing.windowsPremium;
        }
        
        // Multiply by number of instances
        computeCost *= config.instances;
        
        // Calculate hours per month based on specified hours per day
        const hoursPerMonth = config.hours * 30;
        
        // Adjust for usage hours
        const monthlyComputeCost = computeCost * hoursPerMonth;
        
        // Calculate storage cost
        const storagePricing = vmPricing.storage[config.storageType] || vmPricing.storage.standard_hdd;
        const storageGBMonth = storagePricing.price;
        const monthlyStorageCost = storageGBMonth * config.storageSize;
        
        // Total cost
        const monthlyCost = monthlyComputeCost + monthlyStorageCost;
        const hourlyCost = monthlyCost / (30 * 24);
        const dailyCost = monthlyCost / 30;
        const yearlyCost = monthlyCost * 12;
        
        return {
            hourly: hourlyCost,
            daily: dailyCost,
            monthly: monthlyCost,
            yearly: yearlyCost,
            breakdown: [
                {
                    name: `${config.size} (${config.os}) × ${config.instances}`,
                    cost: monthlyComputeCost
                },
                {
                    name: `${config.storageType} Storage (${config.storageSize} GB)`,
                    cost: monthlyStorageCost
                }
            ]
        };
    };
    
    // Calculate App Service costs
    const _calculateAppServiceCost = (config) => {
        const appServicePricing = DataService.getAppServicePricing(config.region);
        
        // Get pricing for the selected tier and size
        const tierPricing = appServicePricing.tiers[config.tier] || appServicePricing.tiers.standard;
        const sizePricing = tierPricing.sizes[config.size] || tierPricing.sizes.s1;
        
        // Calculate monthly cost
        const monthlyInstanceCost = sizePricing.price;
        const monthlyCost = monthlyInstanceCost * config.instances;
        const hourlyCost = monthlyCost / (30 * 24);
        const dailyCost = monthlyCost / 30;
        const yearlyCost = monthlyCost * 12;
        
        return {
            hourly: hourlyCost,
            daily: dailyCost,
            monthly: monthlyCost,
            yearly: yearlyCost,
            breakdown: [
                {
                    name: `${config.tier.toUpperCase()} Tier - ${config.size.toUpperCase()} × ${config.instances}`,
                    cost: monthlyCost
                }
            ]
        };
    };
    
    // Calculate Azure Functions costs
    const _calculateFunctionsCost = (config) => {
        const functionsPricing = DataService.getFunctionsPricing(config.region);
        
        // Get pricing for the selected plan
        const planPricing = functionsPricing.plans[config.plan] || functionsPricing.plans.consumption;
        
        let executionCost = 0;
        let memoryCost = 0;
        let instanceCost = 0;
        
        if (config.plan === 'consumption') {
            // Consumption plan - pay for executions and GB-seconds
            const executionsPerMonth = config.executions;
            const freeExecutions = 1000000; // 1 million free executions
            const billableExecutions = Math.max(0, executionsPerMonth - freeExecutions);
            
            executionCost = billableExecutions * planPricing.executionPrice;
            
            // Calculate GB-seconds
            const executionTimeInSeconds = config.executionTime / 1000;
            const memoryInGB = config.memory;
            const gbSeconds = executionsPerMonth * executionTimeInSeconds * memoryInGB;
            const freeGbSeconds = 400000; // 400,000 GB-seconds free
            const billableGbSeconds = Math.max(0, gbSeconds - freeGbSeconds);
            
            memoryCost = billableGbSeconds * planPricing.gbSecondPrice;
        } else {
            // Premium or App Service plan - pay for instances
            instanceCost = planPricing.instancePrice;
        }
        
        // Total cost
        const monthlyCost = executionCost + memoryCost + instanceCost;
        const hourlyCost = monthlyCost / (30 * 24);
        const dailyCost = monthlyCost / 30;
        const yearlyCost = monthlyCost * 12;
        
        const breakdown = [];
        
        if (executionCost > 0) {
            breakdown.push({
                name: `Executions (${config.executions.toLocaleString()} per month)`,
                cost: executionCost
            });
        }
        
        if (memoryCost > 0) {
            breakdown.push({
                name: `Memory consumption (${config.memory} GB)`,
                cost: memoryCost
            });
        }
        
        if (instanceCost > 0) {
            breakdown.push({
                name: `${config.plan} plan instances`,
                cost: instanceCost
            });
        }
        
        return {
            hourly: hourlyCost,
            daily: dailyCost,
            monthly: monthlyCost,
            yearly: yearlyCost,
            breakdown: breakdown
        };
    };
    
    // Calculate Container Instances costs
    const _calculateContainerCost = (config) => {
        const containerPricing = DataService.getContainerPricing(config.region);
        
        // Calculate container group cost
        const cpuCost = config.cpu * containerPricing.cpuPrice;
        const memoryCost = config.memory * containerPricing.memoryPrice;
        
        // Calculate hours per month
        const hoursPerMonth = config.hours * config.days;
        
        // Monthly cost
        const monthlyCost = (cpuCost + memoryCost) * hoursPerMonth;
        const hourlyCost = cpuCost + memoryCost;
        const dailyCost = hourlyCost * config.hours;
        const yearlyCost = dailyCost * 365;
        
        return {
            hourly: hourlyCost,
            daily: dailyCost,
            monthly: monthlyCost,
            yearly: yearlyCost,
            breakdown: [
                {
                    name: `CPU (${config.cpu} cores)`,
                    cost: cpuCost * hoursPerMonth
                },
                {
                    name: `Memory (${config.memory} GB)`,
                    cost: memoryCost * hoursPerMonth
                }
            ]
        };
    };
    
    // Public methods
    return {
        calculateCost: function(service, config) {
            console.log(`Calculating costs for ${service} with config:`, config);
            
            switch(service) {
                case 'vm':
                    return _calculateVMCost(config);
                case 'appservice':
                    return _calculateAppServiceCost(config);
                case 'functions':
                    return _calculateFunctionsCost(config);
                case 'containers':
                    return _calculateContainerCost(config);
                default:
                    throw new Error(`Unknown service: ${service}`);
            }
        }
    };
})();