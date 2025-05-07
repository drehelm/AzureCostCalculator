/**
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
 * Last updated: May 2025
 */

const FALLBACK_PRICING_DATA = {
    lastUpdated: "2025-05-01T00:00:00.000Z",
    
    // Virtual Machines pricing
    virtualMachines: {
        eastus: {
            sizes: {
                // Dsv3 series
                "Standard_D2s_v3": { price: 0.096, windowsPremium: 0.064 },  // per hour
                "Standard_D4s_v3": { price: 0.192, windowsPremium: 0.128 },
                "Standard_D8s_v3": { price: 0.384, windowsPremium: 0.256 },
                "Standard_D16s_v3": { price: 0.768, windowsPremium: 0.512 },
                
                // Dv3 series
                "Standard_D2_v3": { price: 0.096, windowsPremium: 0.064 },
                "Standard_D4_v3": { price: 0.192, windowsPremium: 0.128 },
                "Standard_D8_v3": { price: 0.384, windowsPremium: 0.256 },
                "Standard_D16_v3": { price: 0.768, windowsPremium: 0.512 },
                
                // Bs series
                "Standard_B1s": { price: 0.0124, windowsPremium: 0.016 },
                "Standard_B1ms": { price: 0.0207, windowsPremium: 0.016 },
                "Standard_B2s": { price: 0.0416, windowsPremium: 0.032 },
                "Standard_B2ms": { price: 0.0832, windowsPremium: 0.064 },
                
                // Fsv2 series
                "Standard_F2s_v2": { price: 0.085, windowsPremium: 0.064 },
                "Standard_F4s_v2": { price: 0.169, windowsPremium: 0.128 },
                "Standard_F8s_v2": { price: 0.338, windowsPremium: 0.256 },
                "Standard_F16s_v2": { price: 0.677, windowsPremium: 0.512 }
            },
            storage: {
                "standard-hdd": { price: 0.05 },  // per GB per month
                "standard-ssd": { price: 0.08 },
                "premium-ssd": { price: 0.17 }
            }
        },
        westus2: {
            sizes: {
                // Dsv3 series
                "Standard_D2s_v3": { price: 0.110, windowsPremium: 0.064 },
                "Standard_D4s_v3": { price: 0.220, windowsPremium: 0.128 },
                "Standard_D8s_v3": { price: 0.441, windowsPremium: 0.256 },
                "Standard_D16s_v3": { price: 0.883, windowsPremium: 0.512 },
                
                // Dv3 series
                "Standard_D2_v3": { price: 0.110, windowsPremium: 0.064 },
                "Standard_D4_v3": { price: 0.220, windowsPremium: 0.128 },
                "Standard_D8_v3": { price: 0.441, windowsPremium: 0.256 },
                "Standard_D16_v3": { price: 0.883, windowsPremium: 0.512 },
                
                // Bs series
                "Standard_B1s": { price: 0.0134, windowsPremium: 0.016 },
                "Standard_B1ms": { price: 0.0227, windowsPremium: 0.016 },
                "Standard_B2s": { price: 0.0456, windowsPremium: 0.032 },
                "Standard_B2ms": { price: 0.0912, windowsPremium: 0.064 },
                
                // Fsv2 series
                "Standard_F2s_v2": { price: 0.093, windowsPremium: 0.064 },
                "Standard_F4s_v2": { price: 0.186, windowsPremium: 0.128 },
                "Standard_F8s_v2": { price: 0.372, windowsPremium: 0.256 },
                "Standard_F16s_v2": { price: 0.744, windowsPremium: 0.512 }
            },
            storage: {
                "standard-hdd": { price: 0.05 },
                "standard-ssd": { price: 0.08 },
                "premium-ssd": { price: 0.17 }
            }
        },
        centralus: {
            sizes: {
                // Dsv3 series
                "Standard_D2s_v3": { price: 0.104, windowsPremium: 0.064 },
                "Standard_D4s_v3": { price: 0.208, windowsPremium: 0.128 },
                "Standard_D8s_v3": { price: 0.416, windowsPremium: 0.256 },
                "Standard_D16s_v3": { price: 0.832, windowsPremium: 0.512 },
                
                // Dv3 series
                "Standard_D2_v3": { price: 0.104, windowsPremium: 0.064 },
                "Standard_D4_v3": { price: 0.208, windowsPremium: 0.128 },
                "Standard_D8_v3": { price: 0.416, windowsPremium: 0.256 },
                "Standard_D16_v3": { price: 0.832, windowsPremium: 0.512 },
                
                // Bs series
                "Standard_B1s": { price: 0.0134, windowsPremium: 0.016 },
                "Standard_B1ms": { price: 0.0227, windowsPremium: 0.016 },
                "Standard_B2s": { price: 0.0456, windowsPremium: 0.032 },
                "Standard_B2ms": { price: 0.0912, windowsPremium: 0.064 },
                
                // Fsv2 series
                "Standard_F2s_v2": { price: 0.090, windowsPremium: 0.064 },
                "Standard_F4s_v2": { price: 0.180, windowsPremium: 0.128 },
                "Standard_F8s_v2": { price: 0.360, windowsPremium: 0.256 },
                "Standard_F16s_v2": { price: 0.720, windowsPremium: 0.512 }
            },
            storage: {
                "standard-hdd": { price: 0.05 },
                "standard-ssd": { price: 0.08 },
                "premium-ssd": { price: 0.17 }
            }
        },
        westeurope: {
            sizes: {
                // Dsv3 series
                "Standard_D2s_v3": { price: 0.114, windowsPremium: 0.064 },
                "Standard_D4s_v3": { price: 0.228, windowsPremium: 0.128 },
                "Standard_D8s_v3": { price: 0.456, windowsPremium: 0.256 },
                "Standard_D16s_v3": { price: 0.912, windowsPremium: 0.512 },
                
                // Dv3 series
                "Standard_D2_v3": { price: 0.114, windowsPremium: 0.064 },
                "Standard_D4_v3": { price: 0.228, windowsPremium: 0.128 },
                "Standard_D8_v3": { price: 0.456, windowsPremium: 0.256 },
                "Standard_D16_v3": { price: 0.912, windowsPremium: 0.512 },
                
                // Bs series
                "Standard_B1s": { price: 0.0132, windowsPremium: 0.016 },
                "Standard_B1ms": { price: 0.0223, windowsPremium: 0.016 },
                "Standard_B2s": { price: 0.0447, windowsPremium: 0.032 },
                "Standard_B2ms": { price: 0.0894, windowsPremium: 0.064 },
                
                // Fsv2 series
                "Standard_F2s_v2": { price: 0.097, windowsPremium: 0.064 },
                "Standard_F4s_v2": { price: 0.194, windowsPremium: 0.128 },
                "Standard_F8s_v2": { price: 0.388, windowsPremium: 0.256 },
                "Standard_F16s_v2": { price: 0.776, windowsPremium: 0.512 }
            },
            storage: {
                "standard-hdd": { price: 0.054 },
                "standard-ssd": { price: 0.085 },
                "premium-ssd": { price: 0.18 }
            }
        },
        southeastasia: {
            sizes: {
                // Dsv3 series
                "Standard_D2s_v3": { price: 0.116, windowsPremium: 0.064 },
                "Standard_D4s_v3": { price: 0.232, windowsPremium: 0.128 },
                "Standard_D8s_v3": { price: 0.464, windowsPremium: 0.256 },
                "Standard_D16s_v3": { price: 0.928, windowsPremium: 0.512 },
                
                // Dv3 series
                "Standard_D2_v3": { price: 0.116, windowsPremium: 0.064 },
                "Standard_D4_v3": { price: 0.232, windowsPremium: 0.128 },
                "Standard_D8_v3": { price: 0.464, windowsPremium: 0.256 },
                "Standard_D16_v3": { price: 0.928, windowsPremium: 0.512 },
                
                // Bs series
                "Standard_B1s": { price: 0.0136, windowsPremium: 0.016 },
                "Standard_B1ms": { price: 0.0230, windowsPremium: 0.016 },
                "Standard_B2s": { price: 0.0461, windowsPremium: 0.032 },
                "Standard_B2ms": { price: 0.0922, windowsPremium: 0.064 },
                
                // Fsv2 series
                "Standard_F2s_v2": { price: 0.097, windowsPremium: 0.064 },
                "Standard_F4s_v2": { price: 0.195, windowsPremium: 0.128 },
                "Standard_F8s_v2": { price: 0.390, windowsPremium: 0.256 },
                "Standard_F16s_v2": { price: 0.780, windowsPremium: 0.512 }
            },
            storage: {
                "standard-hdd": { price: 0.056 },
                "standard-ssd": { price: 0.088 },
                "premium-ssd": { price: 0.186 }
            }
        }
    },
    
    // App Service pricing
    appService: {
        eastus: {
            tiers: {
                free: {
                    sizes: {
                        f1: { price: 0 }
                    }
                },
                shared: {
                    sizes: {
                        d1: { price: 9.67 }  // per month
                    }
                },
                basic: {
                    sizes: {
                        b1: { price: 54.75 },
                        b2: { price: 109.50 },
                        b3: { price: 219.00 }
                    }
                },
                standard: {
                    sizes: {
                        s1: { price: 73.00 },
                        s2: { price: 146.00 },
                        s3: { price: 292.00 }
                    }
                },
                premium: {
                    sizes: {
                        p1v2: { price: 75.00 },
                        p2v2: { price: 150.00 },
                        p3v2: { price: 300.00 }
                    }
                }
            }
        },
        westus2: {
            tiers: {
                free: {
                    sizes: {
                        f1: { price: 0 }
                    }
                },
                shared: {
                    sizes: {
                        d1: { price: 9.67 }
                    }
                },
                basic: {
                    sizes: {
                        b1: { price: 54.75 },
                        b2: { price: 109.50 },
                        b3: { price: 219.00 }
                    }
                },
                standard: {
                    sizes: {
                        s1: { price: 73.00 },
                        s2: { price: 146.00 },
                        s3: { price: 292.00 }
                    }
                },
                premium: {
                    sizes: {
                        p1v2: { price: 75.00 },
                        p2v2: { price: 150.00 },
                        p3v2: { price: 300.00 }
                    }
                }
            }
        },
        centralus: {
            tiers: {
                free: {
                    sizes: {
                        f1: { price: 0 }
                    }
                },
                shared: {
                    sizes: {
                        d1: { price: 9.67 }
                    }
                },
                basic: {
                    sizes: {
                        b1: { price: 54.75 },
                        b2: { price: 109.50 },
                        b3: { price: 219.00 }
                    }
                },
                standard: {
                    sizes: {
                        s1: { price: 73.00 },
                        s2: { price: 146.00 },
                        s3: { price: 292.00 }
                    }
                },
                premium: {
                    sizes: {
                        p1v2: { price: 75.00 },
                        p2v2: { price: 150.00 },
                        p3v2: { price: 300.00 }
                    }
                }
            }
        },
        westeurope: {
            tiers: {
                free: {
                    sizes: {
                        f1: { price: 0 }
                    }
                },
                shared: {
                    sizes: {
                        d1: { price: 10.95 }
                    }
                },
                basic: {
                    sizes: {
                        b1: { price: 62.05 },
                        b2: { price: 124.10 },
                        b3: { price: 248.20 }
                    }
                },
                standard: {
                    sizes: {
                        s1: { price: 82.77 },
                        s2: { price: 165.54 },
                        s3: { price: 331.07 }
                    }
                },
                premium: {
                    sizes: {
                        p1v2: { price: 85.00 },
                        p2v2: { price: 170.00 },
                        p3v2: { price: 340.00 }
                    }
                }
            }
        },
        southeastasia: {
            tiers: {
                free: {
                    sizes: {
                        f1: { price: 0 }
                    }
                },
                shared: {
                    sizes: {
                        d1: { price: 10.95 }
                    }
                },
                basic: {
                    sizes: {
                        b1: { price: 62.05 },
                        b2: { price: 124.10 },
                        b3: { price: 248.20 }
                    }
                },
                standard: {
                    sizes: {
                        s1: { price: 82.77 },
                        s2: { price: 165.54 },
                        s3: { price: 331.07 }
                    }
                },
                premium: {
                    sizes: {
                        p1v2: { price: 85.00 },
                        p2v2: { price: 170.00 },
                        p3v2: { price: 340.00 }
                    }
                }
            }
        }
    },
    
    // Azure Functions pricing
    functions: {
        eastus: {
            plans: {
                consumption: {
                    executionPrice: 0.0000002, // per execution after free grant
                    gbSecondPrice: 0.000016,   // per GB-second after free grant
                    instancePrice: 0           // no instance charge for consumption plan
                },
                premium: {
                    instancePrice: 0.173,      // per hour for EP1 instance
                    executionPrice: 0,
                    gbSecondPrice: 0
                },
                dedicated: {
                    instancePrice: 0,          // varies by App Service Plan
                    executionPrice: 0,
                    gbSecondPrice: 0
                }
            }
        },
        westus2: {
            plans: {
                consumption: {
                    executionPrice: 0.0000002,
                    gbSecondPrice: 0.000016,
                    instancePrice: 0
                },
                premium: {
                    instancePrice: 0.173,
                    executionPrice: 0,
                    gbSecondPrice: 0
                },
                dedicated: {
                    instancePrice: 0,
                    executionPrice: 0,
                    gbSecondPrice: 0
                }
            }
        },
        centralus: {
            plans: {
                consumption: {
                    executionPrice: 0.0000002,
                    gbSecondPrice: 0.000016,
                    instancePrice: 0
                },
                premium: {
                    instancePrice: 0.173,
                    executionPrice: 0,
                    gbSecondPrice: 0
                },
                dedicated: {
                    instancePrice: 0,
                    executionPrice: 0,
                    gbSecondPrice: 0
                }
            }
        },
        westeurope: {
            plans: {
                consumption: {
                    executionPrice: 0.000000225,
                    gbSecondPrice: 0.000018,
                    instancePrice: 0
                },
                premium: {
                    instancePrice: 0.193,
                    executionPrice: 0,
                    gbSecondPrice: 0
                },
                dedicated: {
                    instancePrice: 0,
                    executionPrice: 0,
                    gbSecondPrice: 0
                }
            }
        },
        southeastasia: {
            plans: {
                consumption: {
                    executionPrice: 0.000000225,
                    gbSecondPrice: 0.000018,
                    instancePrice: 0
                },
                premium: {
                    instancePrice: 0.193,
                    executionPrice: 0,
                    gbSecondPrice: 0
                },
                dedicated: {
                    instancePrice: 0,
                    executionPrice: 0,
                    gbSecondPrice: 0
                }
            }
        }
    },
    
    // Container Instances pricing
    containerInstances: {
        eastus: {
            cpuPrice: 0.0000215,   // per vCPU-second
            memoryPrice: 0.0000028 // per GB-second
        },
        westus2: {
            cpuPrice: 0.0000215,
            memoryPrice: 0.0000028
        },
        centralus: {
            cpuPrice: 0.0000215,
            memoryPrice: 0.0000028
        },
        westeurope: {
            cpuPrice: 0.0000243,
            memoryPrice: 0.0000032
        },
        southeastasia: {
            cpuPrice: 0.0000243,
            memoryPrice: 0.0000032
        }
    }
};