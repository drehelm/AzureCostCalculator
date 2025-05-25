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
 * Last updated: May 25, 2025
 */

const FALLBACK_PRICING_DATA = {
  "lastUpdated": "2025-05-25T01:47:32.137Z",
  "virtualMachines": {
    "eastus": {
      "dsv3": {
        "Standard_D2s_v3": {
          "windows": 0.125,
          "linux": 0.096
        },
        "Standard_D4s_v3": {
          "windows": 0.25,
          "linux": 0.192
        },
        "Standard_D8s_v3": {
          "windows": 0.5,
          "linux": 0.384
        },
        "Standard_D16s_v3": {
          "windows": 1,
          "linux": 0.768
        }
      },
      "dv3": {
        "Standard_D2_v3": {
          "windows": 0.11,
          "linux": 0.079
        },
        "Standard_D4_v3": {
          "windows": 0.22,
          "linux": 0.158
        },
        "Standard_D8_v3": {
          "windows": 0.44,
          "linux": 0.317
        },
        "Standard_D16_v3": {
          "windows": 0.88,
          "linux": 0.634
        }
      },
      "bs": {
        "Standard_B1s": {
          "windows": 0.025,
          "linux": 0.011
        },
        "Standard_B1ms": {
          "windows": 0.05,
          "linux": 0.021
        },
        "Standard_B2s": {
          "windows": 0.08,
          "linux": 0.042
        },
        "Standard_B2ms": {
          "windows": 0.091,
          "linux": 0.042
        }
      },
      "fsv2": {
        "Standard_F2s_v2": {
          "windows": 0.13,
          "linux": 0.085
        },
        "Standard_F4s_v2": {
          "windows": 0.26,
          "linux": 0.17
        },
        "Standard_F8s_v2": {
          "windows": 0.52,
          "linux": 0.34
        },
        "Standard_F16s_v2": {
          "windows": 1.04,
          "linux": 0.68
        }
      },
      "storage": {
        "standard-hdd": 0.05,
        "standard-ssd": 0.05,
        "premium-ssd": 0.05
      }
    },
    "westus2": {
      "dsv3": {
        "Standard_D2s_v3": {
          "windows": 0.125,
          "linux": 0.096
        },
        "Standard_D4s_v3": {
          "windows": 0.25,
          "linux": 0.192
        },
        "Standard_D8s_v3": {
          "windows": 0.5,
          "linux": 0.384
        },
        "Standard_D16s_v3": {
          "windows": 1,
          "linux": 0.768
        }
      },
      "dv3": {
        "Standard_D2_v3": {
          "windows": 0.11,
          "linux": 0.079
        },
        "Standard_D4_v3": {
          "windows": 0.22,
          "linux": 0.158
        },
        "Standard_D8_v3": {
          "windows": 0.44,
          "linux": 0.317
        },
        "Standard_D16_v3": {
          "windows": 0.88,
          "linux": 0.634
        }
      },
      "bs": {
        "Standard_B1s": {
          "windows": 0.025,
          "linux": 0.011
        },
        "Standard_B1ms": {
          "windows": 0.05,
          "linux": 0.021
        },
        "Standard_B2s": {
          "windows": 0.08,
          "linux": 0.042
        },
        "Standard_B2ms": {
          "windows": 0.091,
          "linux": 0.042
        }
      },
      "fsv2": {
        "Standard_F2s_v2": {
          "windows": 0.13,
          "linux": 0.085
        },
        "Standard_F4s_v2": {
          "windows": 0.26,
          "linux": 0.17
        },
        "Standard_F8s_v2": {
          "windows": 0.52,
          "linux": 0.34
        },
        "Standard_F16s_v2": {
          "windows": 1.04,
          "linux": 0.68
        }
      },
      "storage": {
        "standard-hdd": 0.05,
        "standard-ssd": 0.05,
        "premium-ssd": 0.05
      }
    },
    "centralus": {
      "dsv3": {
        "Standard_D2s_v3": {
          "windows": 0.125,
          "linux": 0.096
        },
        "Standard_D4s_v3": {
          "windows": 0.25,
          "linux": 0.192
        },
        "Standard_D8s_v3": {
          "windows": 0.5,
          "linux": 0.384
        },
        "Standard_D16s_v3": {
          "windows": 1,
          "linux": 0.768
        }
      },
      "dv3": {
        "Standard_D2_v3": {
          "windows": 0.11,
          "linux": 0.079
        },
        "Standard_D4_v3": {
          "windows": 0.22,
          "linux": 0.158
        },
        "Standard_D8_v3": {
          "windows": 0.44,
          "linux": 0.317
        },
        "Standard_D16_v3": {
          "windows": 0.88,
          "linux": 0.634
        }
      },
      "bs": {
        "Standard_B1s": {
          "windows": 0.025,
          "linux": 0.011
        },
        "Standard_B1ms": {
          "windows": 0.05,
          "linux": 0.021
        },
        "Standard_B2s": {
          "windows": 0.08,
          "linux": 0.042
        },
        "Standard_B2ms": {
          "windows": 0.091,
          "linux": 0.042
        }
      },
      "fsv2": {
        "Standard_F2s_v2": {
          "windows": 0.13,
          "linux": 0.085
        },
        "Standard_F4s_v2": {
          "windows": 0.26,
          "linux": 0.17
        },
        "Standard_F8s_v2": {
          "windows": 0.52,
          "linux": 0.34
        },
        "Standard_F16s_v2": {
          "windows": 1.04,
          "linux": 0.68
        }
      },
      "storage": {
        "standard-hdd": 0.05,
        "standard-ssd": 0.05,
        "premium-ssd": 0.05
      }
    },
    "westeurope": {
      "dsv3": {
        "Standard_D2s_v3": {
          "windows": 0.125,
          "linux": 0.096
        },
        "Standard_D4s_v3": {
          "windows": 0.25,
          "linux": 0.192
        },
        "Standard_D8s_v3": {
          "windows": 0.5,
          "linux": 0.384
        },
        "Standard_D16s_v3": {
          "windows": 1,
          "linux": 0.768
        }
      },
      "dv3": {
        "Standard_D2_v3": {
          "windows": 0.11,
          "linux": 0.079
        },
        "Standard_D4_v3": {
          "windows": 0.22,
          "linux": 0.158
        },
        "Standard_D8_v3": {
          "windows": 0.44,
          "linux": 0.317
        },
        "Standard_D16_v3": {
          "windows": 0.88,
          "linux": 0.634
        }
      },
      "bs": {
        "Standard_B1s": {
          "windows": 0.025,
          "linux": 0.011
        },
        "Standard_B1ms": {
          "windows": 0.05,
          "linux": 0.021
        },
        "Standard_B2s": {
          "windows": 0.08,
          "linux": 0.042
        },
        "Standard_B2ms": {
          "windows": 0.091,
          "linux": 0.042
        }
      },
      "fsv2": {
        "Standard_F2s_v2": {
          "windows": 0.13,
          "linux": 0.085
        },
        "Standard_F4s_v2": {
          "windows": 0.26,
          "linux": 0.17
        },
        "Standard_F8s_v2": {
          "windows": 0.52,
          "linux": 0.34
        },
        "Standard_F16s_v2": {
          "windows": 1.04,
          "linux": 0.68
        }
      },
      "storage": {
        "standard-hdd": 0.05,
        "standard-ssd": 0.05,
        "premium-ssd": 0.05
      }
    },
    "southeastasia": {
      "dsv3": {
        "Standard_D2s_v3": {
          "windows": 0.125,
          "linux": 0.096
        },
        "Standard_D4s_v3": {
          "windows": 0.25,
          "linux": 0.192
        },
        "Standard_D8s_v3": {
          "windows": 0.5,
          "linux": 0.384
        },
        "Standard_D16s_v3": {
          "windows": 1,
          "linux": 0.768
        }
      },
      "dv3": {
        "Standard_D2_v3": {
          "windows": 0.11,
          "linux": 0.079
        },
        "Standard_D4_v3": {
          "windows": 0.22,
          "linux": 0.158
        },
        "Standard_D8_v3": {
          "windows": 0.44,
          "linux": 0.317
        },
        "Standard_D16_v3": {
          "windows": 0.88,
          "linux": 0.634
        }
      },
      "bs": {
        "Standard_B1s": {
          "windows": 0.025,
          "linux": 0.011
        },
        "Standard_B1ms": {
          "windows": 0.05,
          "linux": 0.021
        },
        "Standard_B2s": {
          "windows": 0.08,
          "linux": 0.042
        },
        "Standard_B2ms": {
          "windows": 0.091,
          "linux": 0.042
        }
      },
      "fsv2": {
        "Standard_F2s_v2": {
          "windows": 0.13,
          "linux": 0.085
        },
        "Standard_F4s_v2": {
          "windows": 0.26,
          "linux": 0.17
        },
        "Standard_F8s_v2": {
          "windows": 0.52,
          "linux": 0.34
        },
        "Standard_F16s_v2": {
          "windows": 1.04,
          "linux": 0.68
        }
      },
      "storage": {
        "standard-hdd": 0.05,
        "standard-ssd": 0.05,
        "premium-ssd": 0.05
      }
    }
  },
  "appService": {
    "eastus": {
      "free": {
        "f1": 0
      },
      "shared": {
        "d1": 0.01
      },
      "basic": {
        "b1": 0.075,
        "b2": 0.15,
        "b3": 0.3
      },
      "standard": {
        "s1": 0.1,
        "s2": 0.2,
        "s3": 0.4
      },
      "premium": {
        "p1v2": 0.125,
        "p2v2": 0.25,
        "p3v2": 0.5
      }
    },
    "westus2": {
      "free": {
        "f1": 0
      },
      "shared": {
        "d1": 0.01
      },
      "basic": {
        "b1": 0.075,
        "b2": 0.15,
        "b3": 0.3
      },
      "standard": {
        "s1": 0.1,
        "s2": 0.2,
        "s3": 0.4
      },
      "premium": {
        "p1v2": 0.125,
        "p2v2": 0.25,
        "p3v2": 0.5
      }
    },
    "centralus": {
      "free": {
        "f1": 0
      },
      "shared": {
        "d1": 0.01
      },
      "basic": {
        "b1": 0.075,
        "b2": 0.15,
        "b3": 0.3
      },
      "standard": {
        "s1": 0.1,
        "s2": 0.2,
        "s3": 0.4
      },
      "premium": {
        "p1v2": 0.125,
        "p2v2": 0.25,
        "p3v2": 0.5
      }
    },
    "westeurope": {
      "free": {
        "f1": 0
      },
      "shared": {
        "d1": 0.01
      },
      "basic": {
        "b1": 0.075,
        "b2": 0.15,
        "b3": 0.3
      },
      "standard": {
        "s1": 0.1,
        "s2": 0.2,
        "s3": 0.4
      },
      "premium": {
        "p1v2": 0.125,
        "p2v2": 0.25,
        "p3v2": 0.5
      }
    },
    "southeastasia": {
      "free": {
        "f1": 0
      },
      "shared": {
        "d1": 0.01
      },
      "basic": {
        "b1": 0.075,
        "b2": 0.15,
        "b3": 0.3
      },
      "standard": {
        "s1": 0.1,
        "s2": 0.2,
        "s3": 0.4
      },
      "premium": {
        "p1v2": 0.125,
        "p2v2": 0.25,
        "p3v2": 0.5
      }
    }
  },
  "functions": {
    "eastus": {
      "consumption": {
        "executionPerMillion": 0.2,
        "gbSeconds": 0.000016
      },
      "premium": {
        "ep1": 0.173,
        "ep2": 0.346,
        "ep3": 0.692
      }
    },
    "westus2": {
      "consumption": {
        "executionPerMillion": 0.2,
        "gbSeconds": 0.000016
      },
      "premium": {
        "ep1": 0.173,
        "ep2": 0.346,
        "ep3": 0.692
      }
    },
    "centralus": {
      "consumption": {
        "executionPerMillion": 0.2,
        "gbSeconds": 0.000016
      },
      "premium": {
        "ep1": 0.173,
        "ep2": 0.346,
        "ep3": 0.692
      }
    },
    "westeurope": {
      "consumption": {
        "executionPerMillion": 0.2,
        "gbSeconds": 0.000016
      },
      "premium": {
        "ep1": 0.173,
        "ep2": 0.346,
        "ep3": 0.692
      }
    },
    "southeastasia": {
      "consumption": {
        "executionPerMillion": 0.2,
        "gbSeconds": 0.000016
      },
      "premium": {
        "ep1": 0.173,
        "ep2": 0.346,
        "ep3": 0.692
      }
    }
  },
  "containerInstances": {
    "eastus": {
      "cpu": 0.000023,
      "memory": 0.000003
    },
    "westus2": {
      "cpu": 0.000023,
      "memory": 0.000003
    },
    "centralus": {
      "cpu": 0.000023,
      "memory": 0.000003
    },
    "westeurope": {
      "cpu": 0.000023,
      "memory": 0.000003
    },
    "southeastasia": {
      "cpu": 0.000023,
      "memory": 0.000003
    }
  }
};