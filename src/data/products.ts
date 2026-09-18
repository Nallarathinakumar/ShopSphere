import type { Product } from "../types";

// Catalog is intentionally rich (category, sub-category, SKU, variants, specs,
// seller, stock, ratings) so every commerce data layer attribute you want to
// test has a real source value behind it.
export const products: Product[] = [
  {
    "id": "ELC-1001",
    "sku": "ELC-1001-BLK-128",
    "name": "Nimbus X5 5G Smartphone",
    "brand": "Nimbus",
    "categoryId": "electronics",
    "categoryName": "Electronics",
    "subCategory": "Smartphones",
    "listPrice": 42999,
    "salePrice": 34999,
    "rating": 4.4,
    "reviewCount": 1832,
    "stock": 42,
    "shortDescription": "6.7-inch AMOLED, 120Hz, 50MP triple camera and 5000mAh battery.",
    "description": "The Nimbus X5 pairs a 6.7-inch 120Hz AMOLED display with an efficient octa-core processor and a 50MP triple camera system. A 5000mAh battery with 67W fast charging keeps a full day of heavy usage comfortable, while the in-display fingerprint sensor and IP67 rating handle daily life.",
    "highlights": [
      "6.7-inch FHD+ AMOLED, 120Hz refresh",
      "50MP + 12MP ultrawide + 5MP macro",
      "5000mAh battery with 67W fast charging",
      "IP67 dust and water resistance",
      "Dual SIM with 5G on both slots"
    ],
    "specs": {
      "Display": "6.7-inch FHD+ AMOLED",
      "Refresh Rate": "120Hz",
      "Processor": "OctaCore 4nm",
      "RAM": "8GB LPDDR5",
      "Storage": "128GB / 256GB UFS 3.1",
      "Rear Camera": "50MP + 12MP + 5MP",
      "Front Camera": "16MP",
      "Battery": "5000mAh",
      "Charging": "67W wired",
      "OS": "Android 15",
      "Weight": "189g",
      "Rating": "IP67"
    },
    "variants": [
      {
        "sku": "ELC-1001-BLK-128",
        "optionName": "Storage",
        "optionValue": "128GB",
        "priceDelta": 0,
        "stock": 24
      },
      {
        "sku": "ELC-1001-BLK-256",
        "optionName": "Storage",
        "optionValue": "256GB",
        "priceDelta": 4000,
        "stock": 18
      }
    ],
    "tags": [
      "5g",
      "bestseller",
      "new-arrival"
    ],
    "colorway": "#5b7cfa",
    "emoji": "📱",
    "returnWindowDays": 7,
    "warrantyMonths": 12,
    "seller": "Nimbus Official Store",
    "deliveryEstimateDays": 2,
    "currency": "INR"
  },
  {
    "id": "ELC-1002",
    "sku": "ELC-1002-GRY-STD",
    "name": "AeroPods Pro ANC Earbuds",
    "brand": "Aero",
    "categoryId": "electronics",
    "categoryName": "Electronics",
    "subCategory": "Audio",
    "listPrice": 12999,
    "salePrice": 8499,
    "rating": 4.3,
    "reviewCount": 964,
    "stock": 120,
    "shortDescription": "Hybrid active noise cancellation with 38-hour total playback.",
    "description": "AeroPods Pro deliver hybrid active noise cancellation, transparency mode and low-latency gaming mode. The charging case extends total playback to 38 hours, and quick charge gives 90 minutes of listening from a 10-minute top-up.",
    "highlights": [
      "Hybrid ANC up to 45dB",
      "Transparency mode",
      "38 hours total playback",
      "Bluetooth 5.3 with dual pairing",
      "IPX5 sweat resistance"
    ],
    "specs": {
      "Driver": "11mm dynamic",
      "ANC": "Hybrid, up to 45dB",
      "Playback": "8h buds / 38h with case",
      "Bluetooth": "5.3",
      "Codec": "AAC, SBC, LDAC",
      "Charging": "USB-C + wireless",
      "Water Resistance": "IPX5",
      "Weight": "4.6g per bud"
    },
    "variants": [
      {
        "sku": "ELC-1002-GRY-STD",
        "optionName": "Colour",
        "optionValue": "Graphite",
        "priceDelta": 0,
        "stock": 70
      },
      {
        "sku": "ELC-1002-WHT-STD",
        "optionName": "Colour",
        "optionValue": "Pearl White",
        "priceDelta": 0,
        "stock": 50
      }
    ],
    "tags": [
      "audio",
      "deal-of-the-day"
    ],
    "colorway": "#8b7cf6",
    "emoji": "🎧",
    "returnWindowDays": 10,
    "warrantyMonths": 12,
    "seller": "Aero Audio India",
    "deliveryEstimateDays": 3,
    "currency": "INR"
  },
  {
    "id": "ELC-1003",
    "sku": "ELC-1003-SLV-14",
    "name": "Vertex Ultrabook 14 Core i5",
    "brand": "Vertex",
    "categoryId": "electronics",
    "categoryName": "Electronics",
    "subCategory": "Laptops",
    "listPrice": 84990,
    "salePrice": 71990,
    "rating": 4.5,
    "reviewCount": 421,
    "stock": 17,
    "shortDescription": "1.29kg magnesium chassis, 14-inch 2.8K OLED, 16GB RAM.",
    "description": "The Vertex Ultrabook 14 is built for long working days: a 2.8K OLED panel, 16GB of soldered LPDDR5 memory, a 512GB NVMe drive and a 65Wh battery in a 1.29kg magnesium alloy body. Thunderbolt 4 supports dual external displays.",
    "highlights": [
      "14-inch 2.8K OLED 90Hz",
      "16GB LPDDR5 / 512GB NVMe",
      "1.29kg magnesium chassis",
      "65Wh battery, 15h rated",
      "2x Thunderbolt 4"
    ],
    "specs": {
      "Display": "14-inch 2.8K OLED",
      "Processor": "Core i5 13th Gen",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB NVMe SSD",
      "Graphics": "Integrated Iris Xe",
      "Battery": "65Wh",
      "Ports": "2x TB4, USB-A, HDMI 2.1",
      "Weight": "1.29kg",
      "OS": "Windows 11 Home"
    },
    "variants": [
      {
        "sku": "ELC-1003-SLV-14",
        "optionName": "Configuration",
        "optionValue": "i5 / 16GB / 512GB",
        "priceDelta": 0,
        "stock": 11
      },
      {
        "sku": "ELC-1003-SLV-14P",
        "optionName": "Configuration",
        "optionValue": "i7 / 16GB / 1TB",
        "priceDelta": 18000,
        "stock": 6
      }
    ],
    "tags": [
      "work",
      "premium"
    ],
    "colorway": "#64748b",
    "emoji": "💻",
    "returnWindowDays": 7,
    "warrantyMonths": 24,
    "seller": "Vertex Computing",
    "deliveryEstimateDays": 4,
    "currency": "INR"
  },
  {
    "id": "ELC-1004",
    "sku": "ELC-1004-BLK-46",
    "name": "Pulse Fit 3 Smartwatch",
    "brand": "Pulse",
    "categoryId": "electronics",
    "categoryName": "Electronics",
    "subCategory": "Wearables",
    "listPrice": 9999,
    "salePrice": 5499,
    "rating": 4.1,
    "reviewCount": 2210,
    "stock": 210,
    "shortDescription": "AMOLED always-on display, SpO2, and 14-day battery life.",
    "description": "Pulse Fit 3 tracks heart rate, SpO2, sleep stages and 120 workout modes on a 1.43-inch AMOLED display. Bluetooth calling, 5ATM water resistance and up to 14 days of battery make it a practical daily wearable.",
    "highlights": [
      "1.43-inch AMOLED always-on",
      "120 sports modes",
      "SpO2 and sleep staging",
      "Bluetooth calling",
      "5ATM water resistance"
    ],
    "specs": {
      "Display": "1.43-inch AMOLED",
      "Battery": "Up to 14 days",
      "Sensors": "HR, SpO2, accelerometer, gyroscope",
      "Water Resistance": "5ATM",
      "Connectivity": "Bluetooth 5.2",
      "Compatibility": "Android 8+/iOS 13+",
      "Weight": "38g"
    },
    "variants": [
      {
        "sku": "ELC-1004-BLK-46",
        "optionName": "Strap",
        "optionValue": "Midnight Silicone",
        "priceDelta": 0,
        "stock": 140
      },
      {
        "sku": "ELC-1004-BRN-46",
        "optionName": "Strap",
        "optionValue": "Tan Leather",
        "priceDelta": 700,
        "stock": 70
      }
    ],
    "tags": [
      "wearables",
      "budget"
    ],
    "colorway": "#0ea5e9",
    "emoji": "⌚",
    "returnWindowDays": 10,
    "warrantyMonths": 12,
    "seller": "Pulse Wearables",
    "deliveryEstimateDays": 2,
    "currency": "INR"
  },
  {
    "id": "ELC-1005",
    "sku": "ELC-1005-BLK-STD",
    "name": "EchoDome Smart Speaker",
    "brand": "EchoDome",
    "categoryId": "electronics",
    "categoryName": "Electronics",
    "subCategory": "Smart Home",
    "listPrice": 5999,
    "salePrice": 3799,
    "rating": 4.0,
    "reviewCount": 688,
    "stock": 95,
    "shortDescription": "Room-filling 360-degree sound with built-in voice assistant.",
    "description": "EchoDome combines a 2.5-inch woofer with dual tweeters for 360-degree audio, and acts as a hub for smart lights, plugs and cameras. Far-field microphones with a hardware mute switch handle voice control.",
    "highlights": [
      "360-degree room-filling audio",
      "Smart home hub built in",
      "Far-field mic array",
      "Hardware mic mute switch",
      "Multi-room grouping"
    ],
    "specs": {
      "Speaker": "2.5-inch woofer + 2 tweeters",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.2",
      "Voice": "Far-field 4-mic array",
      "Smart Home": "Zigbee + Matter",
      "Power": "30W adapter",
      "Dimensions": "142 x 142 x 122 mm"
    },
    "variants": [
      {
        "sku": "ELC-1005-BLK-STD",
        "optionName": "Colour",
        "optionValue": "Charcoal",
        "priceDelta": 0,
        "stock": 55
      },
      {
        "sku": "ELC-1005-BLU-STD",
        "optionName": "Colour",
        "optionValue": "Deep Blue",
        "priceDelta": 0,
        "stock": 40
      }
    ],
    "tags": [
      "smart-home"
    ],
    "colorway": "#6366f1",
    "emoji": "🔊",
    "returnWindowDays": 10,
    "warrantyMonths": 12,
    "seller": "EchoDome Retail",
    "deliveryEstimateDays": 3,
    "currency": "INR"
  },
  {
    "id": "FSH-2001",
    "sku": "FSH-2001-NVY-M",
    "name": "Harbour Oxford Cotton Shirt",
    "brand": "Harbour",
    "categoryId": "fashion",
    "categoryName": "Fashion",
    "subCategory": "Men's Shirts",
    "listPrice": 2999,
    "salePrice": 1499,
    "rating": 4.2,
    "reviewCount": 512,
    "stock": 180,
    "shortDescription": "Breathable 100% cotton oxford weave in a regular fit.",
    "description": "A wardrobe staple cut from 100% breathable cotton oxford with a soft button-down collar and reinforced side seams. Finished for easy ironing and designed to hold shape across repeated washes.",
    "highlights": [
      "100% cotton oxford weave",
      "Regular fit, button-down collar",
      "Reinforced side seams",
      "Machine washable",
      "Available in five sizes"
    ],
    "specs": {
      "Fabric": "100% Cotton",
      "Fit": "Regular",
      "Collar": "Button-down",
      "Sleeve": "Full sleeve",
      "Pattern": "Solid",
      "Care": "Machine wash cold",
      "Origin": "India"
    },
    "variants": [
      {
        "sku": "FSH-2001-NVY-S",
        "optionName": "Size",
        "optionValue": "S",
        "priceDelta": 0,
        "stock": 30
      },
      {
        "sku": "FSH-2001-NVY-M",
        "optionName": "Size",
        "optionValue": "M",
        "priceDelta": 0,
        "stock": 60
      },
      {
        "sku": "FSH-2001-NVY-L",
        "optionName": "Size",
        "optionValue": "L",
        "priceDelta": 0,
        "stock": 50
      },
      {
        "sku": "FSH-2001-NVY-XL",
        "optionName": "Size",
        "optionValue": "XL",
        "priceDelta": 100,
        "stock": 40
      }
    ],
    "tags": [
      "essentials",
      "bestseller"
    ],
    "colorway": "#1e3a8a",
    "emoji": "👕",
    "returnWindowDays": 14,
    "warrantyMonths": 0,
    "seller": "Harbour Apparel",
    "deliveryEstimateDays": 4,
    "currency": "INR"
  },
  {
    "id": "FSH-2002",
    "sku": "FSH-2002-BLK-8",
    "name": "Stride Runner 2.0 Sneakers",
    "brand": "Stride",
    "categoryId": "fashion",
    "categoryName": "Fashion",
    "subCategory": "Footwear",
    "listPrice": 5499,
    "salePrice": 3299,
    "rating": 4.4,
    "reviewCount": 1340,
    "stock": 96,
    "shortDescription": "Cushioned EVA midsole with breathable knit upper.",
    "description": "Stride Runner 2.0 uses a responsive EVA midsole and a seamless knit upper for all-day comfort. A rubber outsole with a multi-directional tread pattern provides grip on road and gym surfaces.",
    "highlights": [
      "Responsive EVA midsole",
      "Seamless breathable knit upper",
      "Rubber multi-grip outsole",
      "Padded collar and tongue",
      "Lightweight at 255g"
    ],
    "specs": {
      "Upper": "Engineered knit",
      "Midsole": "Compression-moulded EVA",
      "Outsole": "Rubber",
      "Closure": "Lace-up",
      "Weight": "255g (UK 8)",
      "Use": "Running and training",
      "Care": "Spot clean"
    },
    "variants": [
      {
        "sku": "FSH-2002-BLK-7",
        "optionName": "Size",
        "optionValue": "UK 7",
        "priceDelta": 0,
        "stock": 22
      },
      {
        "sku": "FSH-2002-BLK-8",
        "optionName": "Size",
        "optionValue": "UK 8",
        "priceDelta": 0,
        "stock": 34
      },
      {
        "sku": "FSH-2002-BLK-9",
        "optionName": "Size",
        "optionValue": "UK 9",
        "priceDelta": 0,
        "stock": 26
      },
      {
        "sku": "FSH-2002-BLK-10",
        "optionName": "Size",
        "optionValue": "UK 10",
        "priceDelta": 0,
        "stock": 14
      }
    ],
    "tags": [
      "footwear",
      "trending"
    ],
    "colorway": "#111827",
    "emoji": "👟",
    "returnWindowDays": 14,
    "warrantyMonths": 3,
    "seller": "Stride Sports",
    "deliveryEstimateDays": 3,
    "currency": "INR"
  },
  {
    "id": "FSH-2003",
    "sku": "FSH-2003-TEA-M",
    "name": "Meadow Rayon Wrap Dress",
    "brand": "Meadow",
    "categoryId": "fashion",
    "categoryName": "Fashion",
    "subCategory": "Women's Dresses",
    "listPrice": 3499,
    "salePrice": 2099,
    "rating": 4.3,
    "reviewCount": 376,
    "stock": 74,
    "shortDescription": "Flowy rayon wrap dress with adjustable waist tie.",
    "description": "A lightweight rayon wrap dress with a flattering V-neckline, three-quarter sleeves and an adjustable waist tie. Falls just below the knee and moves easily from workday to evening.",
    "highlights": [
      "Soft flowy rayon",
      "Adjustable wrap waist tie",
      "Three-quarter sleeves",
      "Below-knee length",
      "Machine washable"
    ],
    "specs": {
      "Fabric": "100% Rayon",
      "Fit": "Regular",
      "Length": "Below knee",
      "Neck": "V-neck",
      "Sleeve": "3/4 sleeve",
      "Pattern": "Solid",
      "Care": "Gentle machine wash"
    },
    "variants": [
      {
        "sku": "FSH-2003-TEA-S",
        "optionName": "Size",
        "optionValue": "S",
        "priceDelta": 0,
        "stock": 20
      },
      {
        "sku": "FSH-2003-TEA-M",
        "optionName": "Size",
        "optionValue": "M",
        "priceDelta": 0,
        "stock": 30
      },
      {
        "sku": "FSH-2003-TEA-L",
        "optionName": "Size",
        "optionValue": "L",
        "priceDelta": 0,
        "stock": 24
      }
    ],
    "tags": [
      "womenswear",
      "new-arrival"
    ],
    "colorway": "#0d9488",
    "emoji": "👗",
    "returnWindowDays": 14,
    "warrantyMonths": 0,
    "seller": "Meadow Studio",
    "deliveryEstimateDays": 4,
    "currency": "INR"
  },
  {
    "id": "FSH-2004",
    "sku": "FSH-2004-BRN-STD",
    "name": "Atlas Leather Weekender Bag",
    "brand": "Atlas",
    "categoryId": "fashion",
    "categoryName": "Fashion",
    "subCategory": "Bags & Luggage",
    "listPrice": 8999,
    "salePrice": 6499,
    "rating": 4.6,
    "reviewCount": 208,
    "stock": 38,
    "shortDescription": "Full-grain leather duffle with 40L capacity and laptop sleeve.",
    "description": "Hand-finished full-grain leather duffle with brass hardware, a padded 15-inch laptop sleeve and a 40L main compartment. The detachable shoulder strap and cabin-friendly dimensions suit short trips.",
    "highlights": [
      "Full-grain leather",
      "40L capacity",
      "Padded 15-inch laptop sleeve",
      "Detachable shoulder strap",
      "Cabin-friendly size"
    ],
    "specs": {
      "Material": "Full-grain leather",
      "Capacity": "40L",
      "Dimensions": "52 x 26 x 28 cm",
      "Hardware": "Antique brass",
      "Compartments": "1 main, 2 zip, 1 laptop",
      "Weight": "1.6kg"
    },
    "variants": [
      {
        "sku": "FSH-2004-BRN-STD",
        "optionName": "Finish",
        "optionValue": "Vintage Brown",
        "priceDelta": 0,
        "stock": 24
      },
      {
        "sku": "FSH-2004-BLK-STD",
        "optionName": "Finish",
        "optionValue": "Classic Black",
        "priceDelta": 500,
        "stock": 14
      }
    ],
    "tags": [
      "premium",
      "travel"
    ],
    "colorway": "#92400e",
    "emoji": "👜",
    "returnWindowDays": 14,
    "warrantyMonths": 6,
    "seller": "Atlas Leather Co",
    "deliveryEstimateDays": 5,
    "currency": "INR"
  },
  {
    "id": "HKC-3001",
    "sku": "HKC-3001-SLV-STD",
    "name": "BrewCraft Drip Coffee Maker",
    "brand": "BrewCraft",
    "categoryId": "home-kitchen",
    "categoryName": "Home & Kitchen",
    "subCategory": "Kitchen Appliances",
    "listPrice": 7499,
    "salePrice": 4999,
    "rating": 4.2,
    "reviewCount": 530,
    "stock": 64,
    "shortDescription": "10-cup programmable drip brewer with reusable filter.",
    "description": "A 10-cup programmable drip coffee maker with a 24-hour timer, adjustable keep-warm plate and a reusable stainless filter. The removable water reservoir and dishwasher-safe carafe make cleanup straightforward.",
    "highlights": [
      "10-cup glass carafe",
      "24-hour programmable timer",
      "Reusable stainless filter",
      "Keep-warm plate",
      "Pause and serve"
    ],
    "specs": {
      "Capacity": "1.25L (10 cups)",
      "Power": "900W",
      "Filter": "Reusable stainless mesh",
      "Timer": "24-hour programmable",
      "Carafe": "Dishwasher safe glass",
      "Cord": "1.2m"
    },
    "variants": [
      {
        "sku": "HKC-3001-SLV-STD",
        "optionName": "Finish",
        "optionValue": "Brushed Steel",
        "priceDelta": 0,
        "stock": 40
      },
      {
        "sku": "HKC-3001-BLK-STD",
        "optionName": "Finish",
        "optionValue": "Matte Black",
        "priceDelta": 0,
        "stock": 24
      }
    ],
    "tags": [
      "kitchen",
      "bestseller"
    ],
    "colorway": "#b45309",
    "emoji": "☕",
    "returnWindowDays": 10,
    "warrantyMonths": 24,
    "seller": "BrewCraft Home",
    "deliveryEstimateDays": 4,
    "currency": "INR"
  },
  {
    "id": "HKC-3002",
    "sku": "HKC-3002-GRN-STD",
    "name": "PureAir 300 Room Air Purifier",
    "brand": "PureAir",
    "categoryId": "home-kitchen",
    "categoryName": "Home & Kitchen",
    "subCategory": "Home Appliances",
    "listPrice": 18999,
    "salePrice": 13499,
    "rating": 4.5,
    "reviewCount": 412,
    "stock": 29,
    "shortDescription": "True HEPA H13 filtration for rooms up to 400 sq ft.",
    "description": "PureAir 300 uses a three-stage system with pre-filter, True HEPA H13 and activated carbon to handle dust, pollen and odours in rooms up to 400 sq ft. An auto mode adjusts fan speed against a real-time PM2.5 reading.",
    "highlights": [
      "True HEPA H13 filtration",
      "Covers up to 400 sq ft",
      "Real-time PM2.5 display",
      "Auto and sleep modes",
      "Filter replacement indicator"
    ],
    "specs": {
      "Coverage": "Up to 400 sq ft",
      "CADR": "330 m3/h",
      "Filtration": "Pre-filter + H13 HEPA + carbon",
      "Noise": "24-52 dB",
      "Power": "45W",
      "Filter Life": "8-12 months",
      "Dimensions": "330 x 330 x 560 mm"
    },
    "variants": [
      {
        "sku": "HKC-3002-GRN-STD",
        "optionName": "Pack",
        "optionValue": "Purifier only",
        "priceDelta": 0,
        "stock": 20
      },
      {
        "sku": "HKC-3002-GRN-BND",
        "optionName": "Pack",
        "optionValue": "Purifier + spare filter",
        "priceDelta": 2400,
        "stock": 9
      }
    ],
    "tags": [
      "wellness",
      "premium"
    ],
    "colorway": "#15803d",
    "emoji": "🍃",
    "returnWindowDays": 10,
    "warrantyMonths": 24,
    "seller": "PureAir India",
    "deliveryEstimateDays": 5,
    "currency": "INR"
  },
  {
    "id": "HKC-3003",
    "sku": "HKC-3003-WHT-QN",
    "name": "CloudRest Memory Foam Mattress",
    "brand": "CloudRest",
    "categoryId": "home-kitchen",
    "categoryName": "Home & Kitchen",
    "subCategory": "Furnishing",
    "listPrice": 32999,
    "salePrice": 21999,
    "rating": 4.4,
    "reviewCount": 289,
    "stock": 22,
    "shortDescription": "6-inch orthopaedic memory foam with breathable knit cover.",
    "description": "A 6-inch orthopaedic mattress combining high-resilience base foam with a memory foam comfort layer. The removable breathable knit cover is washable, and the medium-firm feel suits back and side sleepers.",
    "highlights": [
      "6-inch orthopaedic construction",
      "Medium-firm support",
      "Removable washable cover",
      "Motion isolation layer",
      "10-year warranty"
    ],
    "specs": {
      "Thickness": "6 inch",
      "Firmness": "Medium-firm",
      "Top Layer": "Memory foam 2 inch",
      "Base": "High-resilience foam 4 inch",
      "Cover": "Knitted, removable",
      "Warranty": "10 years"
    },
    "variants": [
      {
        "sku": "HKC-3003-WHT-SG",
        "optionName": "Size",
        "optionValue": "Single 72x36",
        "priceDelta": -6000,
        "stock": 8
      },
      {
        "sku": "HKC-3003-WHT-QN",
        "optionName": "Size",
        "optionValue": "Queen 78x60",
        "priceDelta": 0,
        "stock": 9
      },
      {
        "sku": "HKC-3003-WHT-KG",
        "optionName": "Size",
        "optionValue": "King 78x72",
        "priceDelta": 5500,
        "stock": 5
      }
    ],
    "tags": [
      "furnishing",
      "high-value"
    ],
    "colorway": "#94a3b8",
    "emoji": "🛏",
    "returnWindowDays": 10,
    "warrantyMonths": 120,
    "seller": "CloudRest Sleep",
    "deliveryEstimateDays": 7,
    "currency": "INR"
  },
  {
    "id": "HKC-3004",
    "sku": "HKC-3004-MUL-12",
    "name": "Terra Ceramic Dinner Set 12-Piece",
    "brand": "Terra",
    "categoryId": "home-kitchen",
    "categoryName": "Home & Kitchen",
    "subCategory": "Dining",
    "listPrice": 4999,
    "salePrice": 2799,
    "rating": 4.1,
    "reviewCount": 344,
    "stock": 88,
    "shortDescription": "Microwave and dishwasher safe stoneware for four people.",
    "description": "A 12-piece stoneware dinner set with a reactive glaze finish, including dinner plates, quarter plates and bowls for four. Chip-resistant, microwave safe and dishwasher friendly.",
    "highlights": [
      "12-piece set for four",
      "Reactive glaze stoneware",
      "Microwave and dishwasher safe",
      "Chip-resistant rims",
      "Lead and cadmium free"
    ],
    "specs": {
      "Material": "Stoneware ceramic",
      "Pieces": "4 dinner plates, 4 side plates, 4 bowls",
      "Microwave": "Safe",
      "Dishwasher": "Safe",
      "Finish": "Reactive glaze",
      "Weight": "5.4kg"
    },
    "variants": [
      {
        "sku": "HKC-3004-MUL-12",
        "optionName": "Pattern",
        "optionValue": "Earth Multi",
        "priceDelta": 0,
        "stock": 52
      },
      {
        "sku": "HKC-3004-BLU-12",
        "optionName": "Pattern",
        "optionValue": "Indigo Fade",
        "priceDelta": 300,
        "stock": 36
      }
    ],
    "tags": [
      "dining",
      "value"
    ],
    "colorway": "#c2410c",
    "emoji": "🍽",
    "returnWindowDays": 10,
    "warrantyMonths": 6,
    "seller": "Terra Living",
    "deliveryEstimateDays": 5,
    "currency": "INR"
  },
  {
    "id": "BTY-4001",
    "sku": "BTY-4001-STD-50",
    "name": "Lumia Vitamin C Day Serum",
    "brand": "Lumia",
    "categoryId": "beauty",
    "categoryName": "Beauty & Personal Care",
    "subCategory": "Skincare",
    "listPrice": 1899,
    "salePrice": 1199,
    "rating": 4.3,
    "reviewCount": 1720,
    "stock": 260,
    "shortDescription": "10% stabilised vitamin C with hyaluronic acid, 30ml.",
    "description": "A lightweight day serum with 10% stabilised vitamin C, hyaluronic acid and vitamin E, formulated to support brightness and hydration. Fragrance-free, non-comedogenic and dermatologically tested.",
    "highlights": [
      "10% stabilised vitamin C",
      "Hyaluronic acid and vitamin E",
      "Fragrance-free formula",
      "Non-comedogenic",
      "Dermatologically tested"
    ],
    "specs": {
      "Volume": "30ml",
      "Key Actives": "Vitamin C 10%, HA, Vitamin E",
      "Skin Type": "All skin types",
      "Usage": "Morning, before sunscreen",
      "Shelf Life": "24 months",
      "Cruelty Free": "Yes"
    },
    "variants": [
      {
        "sku": "BTY-4001-STD-30",
        "optionName": "Size",
        "optionValue": "30ml",
        "priceDelta": 0,
        "stock": 180
      },
      {
        "sku": "BTY-4001-STD-50",
        "optionName": "Size",
        "optionValue": "50ml",
        "priceDelta": 600,
        "stock": 80
      }
    ],
    "tags": [
      "skincare",
      "bestseller",
      "repeat-purchase"
    ],
    "colorway": "#f59e0b",
    "emoji": "🧴",
    "returnWindowDays": 7,
    "warrantyMonths": 0,
    "seller": "Lumia Beauty",
    "deliveryEstimateDays": 2,
    "currency": "INR"
  },
  {
    "id": "BTY-4002",
    "sku": "BTY-4002-STD-200",
    "name": "Verde Botanical Repair Shampoo",
    "brand": "Verde",
    "categoryId": "beauty",
    "categoryName": "Beauty & Personal Care",
    "subCategory": "Hair Care",
    "listPrice": 899,
    "salePrice": 649,
    "rating": 4.0,
    "reviewCount": 908,
    "stock": 340,
    "shortDescription": "Sulphate-free shampoo with argan oil and aloe, 200ml.",
    "description": "A sulphate-free daily shampoo with argan oil, aloe vera and wheat protein for dry or colour-treated hair. Gentle enough for frequent use and safe for keratin-treated hair.",
    "highlights": [
      "Sulphate and paraben free",
      "Argan oil and aloe vera",
      "Safe for colour-treated hair",
      "Suitable for daily use",
      "Vegan formula"
    ],
    "specs": {
      "Volume": "200ml",
      "Hair Type": "Dry, frizzy, colour-treated",
      "Free From": "Sulphates, parabens, silicones",
      "Key Ingredients": "Argan oil, aloe vera, wheat protein",
      "Vegan": "Yes"
    },
    "variants": [
      {
        "sku": "BTY-4002-STD-200",
        "optionName": "Size",
        "optionValue": "200ml",
        "priceDelta": 0,
        "stock": 220
      },
      {
        "sku": "BTY-4002-STD-400",
        "optionName": "Size",
        "optionValue": "400ml",
        "priceDelta": 420,
        "stock": 120
      }
    ],
    "tags": [
      "haircare",
      "value"
    ],
    "colorway": "#16a34a",
    "emoji": "🧴",
    "returnWindowDays": 7,
    "warrantyMonths": 0,
    "seller": "Verde Personal Care",
    "deliveryEstimateDays": 2,
    "currency": "INR"
  },
  {
    "id": "BTY-4003",
    "sku": "BTY-4003-STD-KIT",
    "name": "Clyde Grooming Kit 5-in-1",
    "brand": "Clyde",
    "categoryId": "beauty",
    "categoryName": "Beauty & Personal Care",
    "subCategory": "Grooming",
    "listPrice": 3499,
    "salePrice": 2199,
    "rating": 4.2,
    "reviewCount": 655,
    "stock": 110,
    "shortDescription": "Cordless trimmer with five attachments and 90-minute runtime.",
    "description": "A cordless 5-in-1 grooming kit covering beard, body, nose, ear and precision detailing. Self-sharpening stainless steel blades, 20 length settings and 90 minutes of runtime from a USB-C charge.",
    "highlights": [
      "5 interchangeable attachments",
      "20 length settings",
      "90-minute cordless runtime",
      "USB-C fast charge",
      "Washable blades"
    ],
    "specs": {
      "Runtime": "90 minutes",
      "Charging": "USB-C, 90 minutes",
      "Blades": "Self-sharpening stainless steel",
      "Attachments": "Beard, body, nose, ear, precision",
      "Waterproof": "IPX6",
      "Warranty": "24 months"
    },
    "variants": [
      {
        "sku": "BTY-4003-STD-KIT",
        "optionName": "Pack",
        "optionValue": "Standard kit",
        "priceDelta": 0,
        "stock": 70
      },
      {
        "sku": "BTY-4003-PRO-KIT",
        "optionName": "Pack",
        "optionValue": "Pro kit + travel case",
        "priceDelta": 600,
        "stock": 40
      }
    ],
    "tags": [
      "grooming",
      "gifting"
    ],
    "colorway": "#7c3aed",
    "emoji": "🪒",
    "returnWindowDays": 10,
    "warrantyMonths": 24,
    "seller": "Clyde Grooming",
    "deliveryEstimateDays": 3,
    "currency": "INR"
  },
  {
    "id": "SPT-5001",
    "sku": "SPT-5001-PUR-6",
    "name": "ZenFlow Yoga Mat 6mm",
    "brand": "ZenFlow",
    "categoryId": "sports",
    "categoryName": "Sports & Fitness",
    "subCategory": "Yoga & Wellness",
    "listPrice": 2499,
    "salePrice": 1399,
    "rating": 4.4,
    "reviewCount": 1105,
    "stock": 190,
    "shortDescription": "Non-slip 6mm TPE mat with alignment markings and strap.",
    "description": "A 6mm dual-layer TPE mat with a textured non-slip surface and printed alignment markings. Lightweight at 1kg, free from PVC and latex, and supplied with a carrying strap.",
    "highlights": [
      "6mm cushioned TPE",
      "Non-slip textured surface",
      "Alignment markings",
      "PVC and latex free",
      "Carry strap included"
    ],
    "specs": {
      "Thickness": "6mm",
      "Material": "TPE dual-layer",
      "Size": "183 x 61 cm",
      "Weight": "1kg",
      "Surface": "Textured non-slip",
      "Care": "Wipe clean"
    },
    "variants": [
      {
        "sku": "SPT-5001-PUR-6",
        "optionName": "Colour",
        "optionValue": "Lavender",
        "priceDelta": 0,
        "stock": 110
      },
      {
        "sku": "SPT-5001-TEA-6",
        "optionName": "Colour",
        "optionValue": "Teal",
        "priceDelta": 0,
        "stock": 80
      }
    ],
    "tags": [
      "fitness",
      "bestseller"
    ],
    "colorway": "#a855f7",
    "emoji": "🧘",
    "returnWindowDays": 10,
    "warrantyMonths": 6,
    "seller": "ZenFlow Fitness",
    "deliveryEstimateDays": 3,
    "currency": "INR"
  },
  {
    "id": "SPT-5002",
    "sku": "SPT-5002-BLK-20",
    "name": "IronCore Adjustable Dumbbell 20kg",
    "brand": "IronCore",
    "categoryId": "sports",
    "categoryName": "Sports & Fitness",
    "subCategory": "Strength Training",
    "listPrice": 11999,
    "salePrice": 8299,
    "rating": 4.5,
    "reviewCount": 372,
    "stock": 41,
    "shortDescription": "Single dial adjustable dumbbell replacing 15 weight pairs.",
    "description": "An adjustable dumbbell with a single-dial mechanism covering 2.5kg to 20kg in 1.25kg increments. The knurled handle and secure locking plates replace a full rack in a compact footprint.",
    "highlights": [
      "2.5kg to 20kg in one unit",
      "Single-dial adjustment",
      "Knurled anti-slip handle",
      "Compact storage tray",
      "Replaces 15 dumbbell pairs"
    ],
    "specs": {
      "Weight Range": "2.5kg - 20kg",
      "Increment": "1.25kg",
      "Material": "Cast iron with nylon casing",
      "Handle": "Knurled steel",
      "Includes": "1 dumbbell + storage tray",
      "Warranty": "24 months"
    },
    "variants": [
      {
        "sku": "SPT-5002-BLK-20",
        "optionName": "Pack",
        "optionValue": "Single dumbbell",
        "priceDelta": 0,
        "stock": 26
      },
      {
        "sku": "SPT-5002-BLK-20P",
        "optionName": "Pack",
        "optionValue": "Pair of dumbbells",
        "priceDelta": 7600,
        "stock": 15
      }
    ],
    "tags": [
      "strength",
      "high-value"
    ],
    "colorway": "#334155",
    "emoji": "🏋",
    "returnWindowDays": 10,
    "warrantyMonths": 24,
    "seller": "IronCore Equipment",
    "deliveryEstimateDays": 5,
    "currency": "INR"
  },
  {
    "id": "SPT-5003",
    "sku": "SPT-5003-ORG-STD",
    "name": "Trailhead 35L Hiking Backpack",
    "brand": "Trailhead",
    "categoryId": "sports",
    "categoryName": "Sports & Fitness",
    "subCategory": "Outdoor",
    "listPrice": 5999,
    "salePrice": 3999,
    "rating": 4.3,
    "reviewCount": 246,
    "stock": 57,
    "shortDescription": "Water-resistant 35L pack with rain cover and hydration sleeve.",
    "description": "A 35L ripstop nylon hiking pack with a ventilated back panel, padded hip belt, hydration bladder sleeve and an integrated rain cover. Multiple compartments keep gear organised on day hikes and weekend treks.",
    "highlights": [
      "35L capacity",
      "Ventilated back panel",
      "Hydration bladder sleeve",
      "Integrated rain cover",
      "Padded hip belt"
    ],
    "specs": {
      "Capacity": "35L",
      "Fabric": "420D ripstop nylon",
      "Weight": "1.1kg",
      "Back System": "Ventilated mesh",
      "Compartments": "Main, lid, 2 side, hip belt",
      "Rain Cover": "Included"
    },
    "variants": [
      {
        "sku": "SPT-5003-ORG-STD",
        "optionName": "Colour",
        "optionValue": "Trail Orange",
        "priceDelta": 0,
        "stock": 32
      },
      {
        "sku": "SPT-5003-GRY-STD",
        "optionName": "Colour",
        "optionValue": "Slate Grey",
        "priceDelta": 0,
        "stock": 25
      }
    ],
    "tags": [
      "outdoor",
      "travel"
    ],
    "colorway": "#ea580c",
    "emoji": "🎒",
    "returnWindowDays": 10,
    "warrantyMonths": 12,
    "seller": "Trailhead Outdoors",
    "deliveryEstimateDays": 4,
    "currency": "INR"
  },
  {
    "id": "SPT-5004",
    "sku": "SPT-5004-BLU-STD",
    "name": "AquaPure Insulated Bottle 1L",
    "brand": "AquaPure",
    "categoryId": "sports",
    "categoryName": "Sports & Fitness",
    "subCategory": "Accessories",
    "listPrice": 1799,
    "salePrice": 999,
    "rating": 4.1,
    "reviewCount": 1488,
    "stock": 400,
    "shortDescription": "Double-wall steel bottle keeping drinks cold 24h, hot 12h.",
    "description": "A 1L double-wall vacuum insulated stainless steel bottle with a leak-proof lid and powder-coated grip finish. Keeps beverages cold for 24 hours or hot for 12 hours.",
    "highlights": [
      "24h cold, 12h hot",
      "Double-wall vacuum insulation",
      "Leak-proof screw lid",
      "Powder-coated anti-slip finish",
      "BPA free"
    ],
    "specs": {
      "Capacity": "1L",
      "Material": "304 stainless steel",
      "Insulation": "Double-wall vacuum",
      "Lid": "Leak-proof screw",
      "Weight": "420g",
      "BPA Free": "Yes"
    },
    "variants": [
      {
        "sku": "SPT-5004-BLU-STD",
        "optionName": "Colour",
        "optionValue": "Ocean Blue",
        "priceDelta": 0,
        "stock": 220
      },
      {
        "sku": "SPT-5004-BLK-STD",
        "optionName": "Colour",
        "optionValue": "Matte Black",
        "priceDelta": 0,
        "stock": 180
      }
    ],
    "tags": [
      "accessories",
      "impulse-buy"
    ],
    "colorway": "#2563eb",
    "emoji": "🧊",
    "returnWindowDays": 7,
    "warrantyMonths": 6,
    "seller": "AquaPure Gear",
    "deliveryEstimateDays": 2,
    "currency": "INR"
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function searchProducts(term: string): Product[] {
  const q = term.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.brand, p.categoryName, p.subCategory, p.shortDescription, ...p.tags]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}
