/**
 * Azure Cloud Cost Calculator
 * Virtual Machine Calculator
 * 
 * Handles VM-specific calculations and pricing data
 */

// This file contains VM-specific logic that could be expanded
// in a more complex application. For now, the main calculation
// is handled in the central calculator.js file.

// VM Series information with details
const VM_SERIES_INFO = {
    dsv3: {
        name: 'Dsv3-series',
        description: 'General purpose compute with Premium Storage',
        bestFor: ['Production workloads', 'Web servers', 'Small to medium databases'],
        details: 'Features Intel® Xeon® Platinum 8370C (Ice Lake) processors with a sustained all core turbo frequency of 3.5 GHz and Intel® Xeon® Platinum 8272CL (Cascade Lake) processors with a sustained all core turbo frequency of 3.4 GHz.'
    },
    dv3: {
        name: 'Dv3-series',
        description: 'General purpose compute',
        bestFor: ['Web servers', 'Small to medium databases', 'Dev/test environments'],
        details: 'Features Intel® Xeon® Platinum 8370C (Ice Lake) processors with a sustained all core turbo frequency of 3.5 GHz and Intel® Xeon® Platinum 8272CL (Cascade Lake) processors with a sustained all core turbo frequency of 3.4 GHz.'
    },
    bs: {
        name: 'B-series',
        description: 'Economical burstable VMs',
        bestFor: ['Development and test', 'Small web servers', 'Small databases', 'Microservices'],
        details: 'Burstable VMs that provide a cost-effective way to deploy workloads that don\'t need continuous full CPU performance.'
    },
    fsv2: {
        name: 'Fsv2-series',
        description: 'Compute optimized VMs',
        bestFor: ['Batch processing', 'Web servers', 'Analytics', 'Gaming'],
        details: 'Features Intel® Xeon® Platinum 8272CL (Cascade Lake) processors with a sustained all core turbo frequency of 3.4 GHz and a maximum single core turbo frequency of 3.7 GHz.'
    }
};

// VM OS types with details
const VM_OS_TYPES = {
    linux: {
        name: 'Linux',
        options: ['Ubuntu', 'CentOS', 'Red Hat Enterprise Linux', 'Debian', 'SUSE Linux'],
        details: 'Linux VMs generally have lower licensing costs compared to Windows.'
    },
    windows: {
        name: 'Windows',
        options: ['Windows Server 2019', 'Windows Server 2016', 'Windows 10/11 Pro'],
        details: 'Windows VMs include licensing costs for the Windows operating system.'
    }
};

// Storage types with details
const VM_STORAGE_TYPES = {
    'standard-hdd': {
        name: 'Standard HDD',
        description: 'Cost-effective storage option for infrequently accessed data',
        iops: 'Up to 500 IOPS per disk',
        throughput: 'Up to 60 MB/s per disk'
    },
    'standard-ssd': {
        name: 'Standard SSD',
        description: 'Better performance than HDD with lower latency',
        iops: 'Up to 6,000 IOPS per disk',
        throughput: 'Up to 750 MB/s per disk'
    },
    'premium-ssd': {
        name: 'Premium SSD',
        description: 'High-performance, low-latency disk for I/O-intensive workloads',
        iops: 'Up to 20,000 IOPS per disk',
        throughput: 'Up to 900 MB/s per disk'
    }
};

// Helper function to get VM info (could be used for tooltips or detailed info)
function getVMSeriesInfo(series) {
    return VM_SERIES_INFO[series] || VM_SERIES_INFO.dsv3;
}

function getVMOSInfo(os) {
    return VM_OS_TYPES[os] || VM_OS_TYPES.linux;
}

function getVMStorageInfo(storageType) {
    return VM_STORAGE_TYPES[storageType] || VM_STORAGE_TYPES['standard-ssd'];
}