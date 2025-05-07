/**
 * Azure Cloud Cost Calculator
 * UI Controller
 */

const UIController = (() => {
    // Private variables and functions
    const _services = ['vm', 'appservice', 'functions', 'containers'];
    
    // Initialize VM size options based on selected series
    const _initVMSizeOptions = () => {
        const series = document.getElementById('vm-series').value;
        const vmSizeSelect = document.getElementById('vm-size');
        
        // Clear existing options
        vmSizeSelect.innerHTML = '';
        
        // Add size options based on selected series
        let sizes = [];
        
        switch(series) {
            case 'dsv3':
                sizes = [
                    { value: 'Standard_D2s_v3', text: 'D2s v3 (2 vCPU, 8 GiB)' },
                    { value: 'Standard_D4s_v3', text: 'D4s v3 (4 vCPU, 16 GiB)' },
                    { value: 'Standard_D8s_v3', text: 'D8s v3 (8 vCPU, 32 GiB)' },
                    { value: 'Standard_D16s_v3', text: 'D16s v3 (16 vCPU, 64 GiB)' }
                ];
                break;
            case 'dv3':
                sizes = [
                    { value: 'Standard_D2_v3', text: 'D2 v3 (2 vCPU, 8 GiB)' },
                    { value: 'Standard_D4_v3', text: 'D4 v3 (4 vCPU, 16 GiB)' },
                    { value: 'Standard_D8_v3', text: 'D8 v3 (8 vCPU, 32 GiB)' },
                    { value: 'Standard_D16_v3', text: 'D16 v3 (16 vCPU, 64 GiB)' }
                ];
                break;
            case 'bs':
                sizes = [
                    { value: 'Standard_B1s', text: 'B1s (1 vCPU, 1 GiB)' },
                    { value: 'Standard_B1ms', text: 'B1ms (1 vCPU, 2 GiB)' },
                    { value: 'Standard_B2s', text: 'B2s (2 vCPU, 4 GiB)' },
                    { value: 'Standard_B2ms', text: 'B2ms (2 vCPU, 8 GiB)' }
                ];
                break;
            case 'fsv2':
                sizes = [
                    { value: 'Standard_F2s_v2', text: 'F2s v2 (2 vCPU, 4 GiB)' },
                    { value: 'Standard_F4s_v2', text: 'F4s v2 (4 vCPU, 8 GiB)' },
                    { value: 'Standard_F8s_v2', text: 'F8s v2 (8 vCPU, 16 GiB)' },
                    { value: 'Standard_F16s_v2', text: 'F16s v2 (16 vCPU, 32 GiB)' }
                ];
                break;
        }
        
        // Populate the select element
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.value;
            option.textContent = size.text;
            vmSizeSelect.appendChild(option);
        });
    };
    
    // Initialize App Service size options based on selected tier
    const _initAppServiceSizeOptions = () => {
        const tier = document.getElementById('app-tier').value;
        const appSizeSelect = document.getElementById('app-size');
        
        // Clear existing options
        appSizeSelect.innerHTML = '';
        
        // Add size options based on selected tier
        let sizes = [];
        
        switch(tier) {
            case 'free':
                sizes = [
                    { value: 'f1', text: 'F1 (1 core, 1 GB)' }
                ];
                break;
            case 'shared':
                sizes = [
                    { value: 'd1', text: 'D1 (1 core, 1 GB)' }
                ];
                break;
            case 'basic':
                sizes = [
                    { value: 'b1', text: 'B1 (1 core, 1.75 GB)' },
                    { value: 'b2', text: 'B2 (2 cores, 3.5 GB)' },
                    { value: 'b3', text: 'B3 (4 cores, 7 GB)' }
                ];
                break;
            case 'standard':
                sizes = [
                    { value: 's1', text: 'S1 (1 core, 1.75 GB)' },
                    { value: 's2', text: 'S2 (2 cores, 3.5 GB)' },
                    { value: 's3', text: 'S3 (4 cores, 7 GB)' }
                ];
                break;
            case 'premium':
                sizes = [
                    { value: 'p1v2', text: 'P1v2 (1 core, 3.5 GB)' },
                    { value: 'p2v2', text: 'P2v2 (2 cores, 7 GB)' },
                    { value: 'p3v2', text: 'P3v2 (4 cores, 14 GB)' }
                ];
                break;
        }
        
        // Populate the select element
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.value;
            option.textContent = size.text;
            appSizeSelect.appendChild(option);
        });
    };
    
    // Show the active service panel and hide others
    const _showActivePanel = (service) => {
        console.log('Switching to service:', service);
        
        // Hide all panels first
        document.querySelectorAll('.service-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show the active panel
        const activePanel = document.getElementById(`${service}-panel`);
        if (activePanel) {
            activePanel.classList.add('active');
        } else {
            console.error(`Active panel not found: ${service}-panel`);
        }
    };
    
    // Public methods
    return {
        init: function() {
            console.log('Initializing UI Controller');
            
            // Set up service tab buttons
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    tabButtons.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Show the corresponding service panel
                    _showActivePanel(btn.dataset.service);
                });
            });
            
            // Initialize VM size options when series changes
            document.getElementById('vm-series').addEventListener('change', _initVMSizeOptions);
            
            // Initialize App Service size options when tier changes
            document.getElementById('app-tier').addEventListener('change', _initAppServiceSizeOptions);
            
            // Initialize size options for VM and App Service
            _initVMSizeOptions();
            _initAppServiceSizeOptions();
        },
        
        getCurrentConfiguration: function(service) {
            // Get configuration based on the active service
            let config = {};
            
            switch(service) {
                case 'vm':
                    config = {
                        region: document.getElementById('vm-region').value,
                        series: document.getElementById('vm-series').value,
                        size: document.getElementById('vm-size').value,
                        os: document.getElementById('vm-os').value,
                        instances: parseInt(document.getElementById('vm-instances').value),
                        hours: parseInt(document.getElementById('vm-hours').value),
                        storageType: document.getElementById('vm-storage-type').value,
                        storageSize: parseInt(document.getElementById('vm-storage-size').value)
                    };
                    break;
                case 'appservice':
                    config = {
                        region: document.getElementById('app-region').value,
                        tier: document.getElementById('app-tier').value,
                        size: document.getElementById('app-size').value,
                        instances: parseInt(document.getElementById('app-instances').value)
                    };
                    break;
                case 'functions':
                    config = {
                        region: document.getElementById('func-region').value,
                        plan: document.getElementById('func-plan').value,
                        executions: parseInt(document.getElementById('func-executions').value),
                        memory: parseFloat(document.getElementById('func-memory').value),
                        executionTime: parseInt(document.getElementById('func-execution-time').value)
                    };
                    break;
                case 'containers':
                    config = {
                        region: document.getElementById('container-region').value,
                        cpu: parseFloat(document.getElementById('container-cpu').value),
                        memory: parseFloat(document.getElementById('container-memory').value),
                        hours: parseInt(document.getElementById('container-hours').value),
                        days: parseInt(document.getElementById('container-days').value)
                    };
                    break;
            }
            
            return config;
        },
        
        displayResults: function(results) {
            // Show the results panel
            document.getElementById('results-panel').classList.add('active');
            
            // Update the cost values
            document.getElementById('hourly-cost').textContent = `$${results.hourly.toFixed(2)}`;
            document.getElementById('daily-cost').textContent = `$${results.daily.toFixed(2)}`;
            document.getElementById('monthly-cost').textContent = `$${results.monthly.toFixed(2)}`;
            document.getElementById('yearly-cost').textContent = `$${results.yearly.toFixed(2)}`;
            
            // Update the cost breakdown
            const breakdownContainer = document.getElementById('breakdown-details');
            breakdownContainer.innerHTML = '';
            
            // Add breakdown items
            results.breakdown.forEach(item => {
                const breakdownItem = document.createElement('div');
                breakdownItem.classList.add('breakdown-item');
                breakdownItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.cost.toFixed(2)}/month</span>
                `;
                breakdownContainer.appendChild(breakdownItem);
            });
            
            // Scroll to results
            document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth' });
        }
    };
})();