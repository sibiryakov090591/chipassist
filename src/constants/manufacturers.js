const manufacturers = [
  {
    id: 1797,
    name: "2J",
  },
  {
    id: 13864,
    name: "2J Antenna",
  },
  {
    id: 15467,
    name: "2-Power",
  },
  {
    id: 14396,
    name: "3D Printz",
  },
  {
    id: 2540,
    name: "3L",
  },
  {
    id: 1700,
    name: "3M",
  },
  {
    id: 14317,
    name: "3M Cubitron",
  },
  {
    id: 1593,
    name: "3M Interconnect Solutions",
  },
  {
    id: 6878,
    name: "3PEAK",
  },
  {
    id: 2018,
    name: "4CarMedia",
  },
  {
    id: 2428,
    name: "4D LCD",
  },
  {
    id: 1715,
    name: "4D Systems",
  },
  {
    id: 14662,
    name: "4lite UK",
  },
  {
    id: 14512,
    name: "52Pi",
  },
  {
    id: 9241,
    name: "7Q-TEK",
  },
  {
    id: 3601,
    name: "A4 TECH",
  },
  {
    id: 3996,
    name: "AAEON",
  },
  {
    id: 2410,
    name: "AAEON UP",
  },
  {
    id: 3691,
    name: "AA Portable Power",
  },
  {
    id: 14704,
    name: "Aaronia Ag",
  },
  {
    id: 8339,
    name: "AATC",
  },
  {
    id: 2269,
    name: "Aavid, Thermal Division of Boyd Corporation",
  },
  {
    id: 1574,
    name: "ABB",
  },
  {
    id: 2314,
    name: "ABB - Adaptaflex",
  },
  {
    id: 2359,
    name: "ABB AG",
  },
  {
    id: 12637,
    name: "Abbatron",
  },
  {
    id: 2473,
    name: "Abbatron HH Smith",
  },
  {
    id: 13691,
    name: "ABB Control",
  },
  {
    id: 2761,
    name: "ABB - Furse",
  },
  {
    id: 16836,
    name: "ABB Group",
  },
  {
    id: 2749,
    name: "ABB - Jokab",
  },
  {
    id: 2880,
    name: "ABB - Kopex",
  },
  {
    id: 2023,
    name: "ABB Power Electronics Inc.",
  },
  {
    id: 2809,
    name: "ABB - Soule",
  },
  {
    id: 1573,
    name: "ABB - Thomas & Betts",
  },
  {
    id: 3674,
    name: "ABC Taiwan Electronics",
  },
  {
    id: 14211,
    name: "Able Systems",
  },
  {
    id: 2651,
    name: "ABL Heatsinks",
  },
  {
    id: 1332,
    name: "ABLIC",
  },
  {
    id: 15596,
    name: "ABLIC Inc",
  },
  {
    id: 14193,
    name: "ABL Sursum",
  },
  {
    id: 1569,
    name: "Abracon Corporation",
  },
  {
    id: 19611,
    name: "Absolute Process Instruments",
  },
  {
    id: 14232,
    name: "Aburnet",
  },
  {
    id: 10531,
    name: "ABUS",
  },
  {
    id: 14739,
    name: "ABUS Security-Center",
  },
  {
    id: 13677,
    name: "Acc Silicones",
  },
  {
    id: 9952,
    name: "ACCURIDE",
  },
  {
    id: 5976,
    name: "ACE",
  },
  {
    id: 2174,
    name: "ACEINNA",
  },
  {
    id: 19268,
    name: "Aces Connectors",
  },
  {
    id: 14183,
    name: "Acim Jouanin",
  },
  {
    id: 16816,
    name: "acl staticide inc",
  },
  {
    id: 14507,
    name: "ACOEM",
  },
  {
    id: 3743,
    name: "aconno",
  },
  {
    id: 1373,
    name: "Actel",
  },
  {
    id: 2141,
    name: "Action Circuits",
  },
  {
    id: 14384,
    name: "Active-Semi",
  },
  {
    id: 14001,
    name: "Actuonix",
  },
  {
    id: 6546,
    name: "ACX",
  },
  {
    id: 2297,
    name: "Adactus",
  },
  {
    id: 21264,
    name: "Adactus AB",
  },
  {
    id: 1951,
    name: "Adafruit Industries LLC",
  },
  {
    id: 2367,
    name: "Adam Technologies",
  },
  {
    id: 13776,
    name: "Adaptaflex",
  },
  {
    id: 5022,
    name: "ADAPTIVE",
  },
  {
    id: 3620,
    name: "Adaptive Interconnect Electronics",
  },
  {
    id: 2779,
    name: "Adastra",
  },
  {
    id: 1600,
    name: "ADDA",
  },
  {
    id: 19851,
    name: "ADDA Corporation",
  },
  {
    id: 14749,
    name: "Adder",
  },
  {
    id: 3340,
    name: "ADDTEK",
  },
  {
    id: 1598,
    name: "Adesto Technologies",
  },
  {
    id: 22757,
    name: "ADIMPEX",
  },
  {
    id: 1086,
    name: "ADLINK Technology",
  },
  {
    id: 3744,
    name: "ADL Insulflex",
  },
  {
    id: 3215,
    name: "AD/MOT",
  },
  {
    id: 3973,
    name: "AdvancED",
  },
  {
    id: 11299,
    name: "Advanced Analog Circuits",
  },
  {
    id: 15168,
    name: "Advanced Ceramic X",
  },
  {
    id: 2386,
    name: "Advanced Energy",
  },
  {
    id: 3342,
    name: "Advanced Micro Devices",
  },
  {
    id: 13557,
    name: "Advanced Photonix",
  },
  {
    id: 12236,
    name: "Advanced Power Electronics Corp",
  },
  {
    id: 20014,
    name: "Advanced Semiconductor",
  },
  {
    id: 2776,
    name: "Advanced Thermal Solutions Inc.",
  },
  {
    id: 1993,
    name: "Advanced Thermal Solutions – Qpedia",
  },
  {
    id: 2808,
    name: "Advance Tapes",
  },
  {
    id: 3440,
    name: "Advantech B+B SmartWorx",
  },
  {
    id: 2207,
    name: "Advantech Corp",
  },
  {
    id: 2537,
    name: "AEL Crystals",
  },
  {
    id: 3341,
    name: "Aeluros",
  },
  {
    id: 2608,
    name: "AEM",
  },
  {
    id: 19773,
    name: "AEM Components",
  },
  {
    id: 8514,
    name: "AEROFLEX",
  },
  {
    id: 14789,
    name: "Aerotight",
  },
  {
    id: 10715,
    name: "AF",
  },
  {
    id: 1910,
    name: "AF International",
  },
  {
    id: 4129,
    name: "AGERE",
  },
  {
    id: 1513,
    name: "Agere Systems",
  },
  {
    id: 2966,
    name: "AG Geophysic",
  },
  {
    id: 2953,
    name: "Agilent",
  },
  {
    id: 14385,
    name: "Aiko Denshi",
  },
  {
    id: 2472,
    name: "AIM",
  },
  {
    id: 18307,
    name: "AIM Cambridge",
  },
  {
    id: 1333,
    name: "Aimtec",
  },
  {
    id: 3417,
    name: "AIM-TTI",
  },
  {
    id: 6396,
    name: "AIR",
  },
  {
    id: 19482,
    name: "AIRAM",
  },
  {
    id: 1417,
    name: "AirBorn",
  },
  {
    id: 14262,
    name: "Air Engineering Controls Ltd",
  },
  {
    id: 1583,
    name: "Airpax",
  },
  {
    id: 2896,
    name: "Aishi",
  },
  {
    id: 3475,
    name: "Akasa",
  },
  {
    id: 3589,
    name: "Aker",
  },
  {
    id: 18682,
    name: "aker technology corp",
  },
  {
    id: 3399,
    name: "AKM Semiconductor Inc.",
  },
  {
    id: 17068,
    name: "Akro Mills",
  },
  {
    id: 14904,
    name: "Albrecht Jung",
  },
  {
    id: 19484,
    name: "aleph international corporation",
  },
  {
    id: 10458,
    name: "ALFATRONIX",
  },
  {
    id: 1802,
    name: "Allegro Industries",
  },
  {
    id: 1840,
    name: "Allegro Microsystems",
  },
  {
    id: 10579,
    name: "Allen Bradley",
  },
  {
    id: 3028,
    name: "Allen-Bradley",
  },
  {
    id: 14867,
    name: "Allen Bradley Guardmaster",
  },
  {
    id: 2249,
    name: "Alliance Memory Inc.",
  },
  {
    id: 3650,
    name: "Alliance Semiconductor",
  },
  {
    id: 18047,
    name: "Allied Components International",
  },
  {
    id: 14728,
    name: "Allied Telesis",
  },
  {
    id: 2709,
    name: "Allit",
  },
  {
    id: 17845,
    name: "All Sensors",
  },
  {
    id: 2364,
    name: "Alpha Electronics",
  },
  {
    id: 2371,
    name: "Alpha & Omega Semiconductor Inc.",
  },
  {
    id: 13835,
    name: "Alpha Solway",
  },
  {
    id: 3742,
    name: "Alpha (Taiwan)",
  },
  {
    id: 3745,
    name: "Alpha Wire",
  },
  {
    id: 1489,
    name: "Alps Alpine",
  },
  {
    id: 13806,
    name: "Alsico",
  },
  {
    id: 1815,
    name: "Altech Corporation",
  },
  {
    id: 1362,
    name: "Altera",
  },
  {
    id: 16780,
    name: "Altera Corporation",
  },
  {
    id: 2415,
    name: "Altitude Tech",
  },
  {
    id: 3746,
    name: "Altium",
  },
  {
    id: 3115,
    name: "ALTMA",
  },
  {
    id: 20049,
    name: "altran magnetics, llc",
  },
  {
    id: 14394,
    name: "Alttec",
  },
  {
    id: 2783,
    name: "ALW",
  },
  {
    id: 1509,
    name: "Ambersil",
  },
  {
    id: 3211,
    name: "AMCC",
  },
  {
    id: 1896,
    name: "AMEC Thermasol",
  },
  {
    id: 3513,
    name: "American Bright",
  },
  {
    id: 10843,
    name: "American Denki",
  },
  {
    id: 16959,
    name: "american electrical inc.",
  },
  {
    id: 20227,
    name: "American Electronic Components",
  },
  {
    id: 18240,
    name: "American Power Conversion",
  },
  {
    id: 2731,
    name: "American Power Devices",
  },
  {
    id: 9390,
    name: "American Zettler",
  },
  {
    id: 14082,
    name: "Ametek",
  },
  {
    id: 2105,
    name: "Ametherm",
  },
  {
    id: 1718,
    name: "AMIC Technology",
  },
  {
    id: 1712,
    name: "AMI Metals",
  },
  {
    id: 2935,
    name: "AMP",
  },
  {
    id: 1499,
    name: "Amphenol Advanced Sensors",
  },
  {
    id: 1315,
    name: "Amphenol Aerospace",
  },
  {
    id: 1731,
    name: "Amphenol - Air LB",
  },
  {
    id: 3370,
    name: "Amphenol - Air LB France",
  },
  {
    id: 2548,
    name: "Amphenol - Air LB Germany",
  },
  {
    id: 3490,
    name: "Amphenol Alden Products Company",
  },
  {
    id: 3602,
    name: "Amphenol All Sensors Corporation",
  },
  {
    id: 1972,
    name: "Amphenol Anytek",
  },
  {
    id: 2754,
    name: "Amphenol Audio",
  },
  {
    id: 2389,
    name: "Amphenol Cables on Demand",
  },
  {
    id: 3386,
    name: "Amphenol Canada",
  },
  {
    id: 2488,
    name: "Amphenol Casco",
  },
  {
    id: 3748,
    name: "Amphenol Commercial Products",
  },
  {
    id: 10997,
    name: "AMPHENOL COMMUNICATIONS SOLUTIONS",
  },
  {
    id: 19463,
    name: "Amphenol CONEC",
  },
  {
    id: 1645,
    name: "Amphenol Connex",
  },
  {
    id: 3310,
    name: "Amphenol Corporation",
  },
  {
    id: 2306,
    name: "Amphenol Fiber Optics",
  },
  {
    id: 2284,
    name: "Amphenol FSI",
  },
  {
    id: 2289,
    name: "Amphenol i2s",
  },
  {
    id: 1961,
    name: "Amphenol ICC (FCI)",
  },
  {
    id: 13925,
    name: "Amphenol India",
  },
  {
    id: 1498,
    name: "Amphenol Industrial",
  },
  {
    id: 3514,
    name: "Amphenol Interconnect India",
  },
  {
    id: 3754,
    name: "Amphenol IPG",
  },
  {
    id: 261,
    name: "Amphenol LTW",
  },
  {
    id: 2469,
    name: "Amphenol Mao",
  },
  {
    id: 3755,
    name: "Amphenol MCP",
  },
  {
    id: 3578,
    name: "Amphenol Nexus Technologies",
  },
  {
    id: 2427,
    name: "Amphenol Oil & Gas Technology",
  },
  {
    id: 3749,
    name: "Amphenol PCD",
  },
  {
    id: 2216,
    name: "Amphenol PCD Shenzhen",
  },
  {
    id: 13987,
    name: "Amphenol / Piher",
  },
  {
    id: 13991,
    name: "Amphenol / Positronic",
  },
  {
    id: 2677,
    name: "Amphenol RF",
  },
  {
    id: 2362,
    name: "Amphenol SGX Sensortech",
  },
  {
    id: 2374,
    name: "Amphenol Sine Systems Corp",
  },
  {
    id: 3753,
    name: "Amphenol Sine / Tuchel",
  },
  {
    id: 1791,
    name: "Amphenol Socapex",
  },
  {
    id: 3476,
    name: "Amphenol Spectra-Strip",
  },
  {
    id: 2475,
    name: "Amphenol / SSI Technologies",
  },
  {
    id: 1656,
    name: "Amphenol / SV Microwave",
  },
  {
    id: 2184,
    name: "Amphenol TCS",
  },
  {
    id: 2522,
    name: "Amphenol Technical Products",
  },
  {
    id: 2826,
    name: "Amphenol Thermometrics",
  },
  {
    id: 2038,
    name: "Amphenol Times Microwave Systems",
  },
  {
    id: 3425,
    name: "Amphenol Tuchel Industrial",
  },
  {
    id: 2452,
    name: "Amphenol Wilcoxon",
  },
  {
    id: 9717,
    name: "AMPIRE",
  },
  {
    id: 1837,
    name: "Ampleon",
  },
  {
    id: 1861,
    name: "Amprobe",
  },
  {
    id: 2057,
    name: "ams AG",
  },
  {
    id: 2336,
    name: "Amseco",
  },
  {
    id: 8714,
    name: "AMS Osram Group",
  },
  {
    id: 14525,
    name: "AMS TREX",
  },
  {
    id: 16743,
    name: "Amulet Technologies LLC",
  },
  {
    id: 4111,
    name: "ANADIGICS",
  },
  {
    id: 1986,
    name: "Analog Devices Inc.",
  },
  {
    id: 1924,
    name: "Analog Devices / Linear Technology",
  },
  {
    id: 15158,
    name: "Anaren Microwave",
  },
  {
    id: 2833,
    name: "Anaren Microwave Inc",
  },
  {
    id: 20220,
    name: "Anderson Electronics",
  },
  {
    id: 3556,
    name: "Anderson Power Products Inc",
  },
  {
    id: 3235,
    name: "Andon",
  },
  {
    id: 2277,
    name: "AND Optoelectronics",
  },
  {
    id: 2262,
    name: "Ansmann",
  },
  {
    id: 10541,
    name: "Antaira",
  },
  {
    id: 2298,
    name: "Antenova",
  },
  {
    id: 2588,
    name: "Antex",
  },
  {
    id: 3409,
    name: "Antistat",
  },
  {
    id: 2507,
    name: "Apacer",
  },
  {
    id: 6403,
    name: "APC",
  },
  {
    id: 1578,
    name: "APC by Schneider Electric",
  },
  {
    id: 1701,
    name: "Apem Components",
  },
  {
    id: 4908,
    name: "APEX",
  },
  {
    id: 2683,
    name: "Apex Linvar",
  },
  {
    id: 2620,
    name: "Apex Microtechnology",
  },
  {
    id: 312,
    name: "Apex Tool Group",
  },
  {
    id: 3165,
    name: "API",
  },
  {
    id: 2593,
    name: "API Delevan Inc.",
  },
  {
    id: 15244,
    name: "APITech",
  },
  {
    id: 15243,
    name: "API Technologies",
  },
  {
    id: 1739,
    name: "APM Hexseal",
  },
  {
    id: 14775,
    name: "Apollo",
  },
  {
    id: 1532,
    name: "Applied Motion",
  },
  {
    id: 16855,
    name: "Applied Motion Products",
  },
  {
    id: 14625,
    name: "Applied Motion Systems",
  },
  {
    id: 14424,
    name: "Apricorn",
  },
  {
    id: 3609,
    name: "APSA",
  },
  {
    id: 4619,
    name: "APTINA",
  },
  {
    id: 1653,
    name: "Aptiv (formerly Delphi)",
  },
  {
    id: 19847,
    name: "APW Electronic Solutions",
  },
  {
    id: 15214,
    name: "Aquasol",
  },
  {
    id: 14635,
    name: "Araldite",
  },
  {
    id: 2125,
    name: "Arbor Technology",
  },
  {
    id: 2075,
    name: "Arcol",
  },
  {
    id: 3976,
    name: "ARCOLECTRIC",
  },
  {
    id: 2266,
    name: "Arcolectric (Bulgin Limited)",
  },
  {
    id: 16148,
    name: "Arcolectric (Bulgin) Ltd",
  },
  {
    id: 1621,
    name: "Arcol / Ohmite",
  },
  {
    id: 3096,
    name: "Arcotron",
  },
  {
    id: 1164,
    name: "Arduino",
  },
  {
    id: 2794,
    name: "ArduSimple",
  },
  {
    id: 14861,
    name: "Argon 40",
  },
  {
    id: 2432,
    name: "Aries Electronics",
  },
  {
    id: 3695,
    name: "Arima Lasers",
  },
  {
    id: 3615,
    name: "Ark-Les Connectors",
  },
  {
    id: 1380,
    name: "ARM",
  },
  {
    id: 4717,
    name: "ARTESYN",
  },
  {
    id: 1835,
    name: "Artesyn Embedded Technologies",
  },
  {
    id: 16797,
    name: "Artesyn Technologies",
  },
  {
    id: 14072,
    name: "ARX",
  },
  {
    id: 3593,
    name: "Asahi Kasei Microdevices / AKM",
  },
  {
    id: 1728,
    name: "AS Components Co Ltd",
  },
  {
    id: 3756,
    name: "ASI Semiconductor",
  },
  {
    id: 16266,
    name: "ASIX Electronics",
  },
  {
    id: 1755,
    name: "ASJ",
  },
  {
    id: 10609,
    name: "Assemtech",
  },
  {
    id: 17025,
    name: "Assman Electronics",
  },
  {
    id: 3339,
    name: "Assmann WSW Components",
  },
  {
    id: 15193,
    name: "Astec Power",
  },
  {
    id: 3569,
    name: "Astera Labs",
  },
  {
    id: 9374,
    name: "Astrodyne TDI Corporation",
  },
  {
    id: 3330,
    name: "Astro Tool",
  },
  {
    id: 2881,
    name: "ASUS",
  },
  {
    id: 18544,
    name: "ASUS Electronics",
  },
  {
    id: 8654,
    name: "ATC / Kyocera AVX",
  },
  {
    id: 13855,
    name: "ATE Electronics",
  },
  {
    id: 13740,
    name: "Atem",
  },
  {
    id: 16811,
    name: "Aten",
  },
  {
    id: 14415,
    name: "Atlantic",
  },
  {
    id: 19361,
    name: "Atlas Sound",
  },
  {
    id: 15456,
    name: "Atmark Techno",
  },
  {
    id: 3288,
    name: "Atmel Corporation",
  },
  {
    id: 14730,
    name: "ATMI",
  },
  {
    id: 14490,
    name: "Atoms",
  },
  {
    id: 10960,
    name: "ATP Electronics",
  },
  {
    id: 14870,
    name: "Atrato",
  },
  {
    id: 16133,
    name: "atten",
  },
  {
    id: 12300,
    name: "Attend Technology",
  },
  {
    id: 20233,
    name: "Audio-Technica Corporation",
  },
  {
    id: 20224,
    name: "audiowell international llc",
  },
  {
    id: 13749,
    name: "AUER Signal",
  },
  {
    id: 3940,
    name: "AUK",
  },
  {
    id: 3580,
    name: "AU Optronics",
  },
  {
    id: 1697,
    name: "auris GmbH",
  },
  {
    id: 14118,
    name: "Aurora Bearing Company",
  },
  {
    id: 2780,
    name: "Aurora Motors",
  },
  {
    id: 14844,
    name: "Austins",
  },
  {
    id: 9505,
    name: "AUTONICS",
  },
  {
    id: 2280,
    name: "Auvidea",
  },
  {
    id: 10368,
    name: "AVDEL",
  },
  {
    id: 2165,
    name: "Aven Tools",
  },
  {
    id: 6223,
    name: "AVERLOGIC",
  },
  {
    id: 1419,
    name: "Avery Dennison",
  },
  {
    id: 20163,
    name: "avico",
  },
  {
    id: 2699,
    name: "Avid",
  },
  {
    id: 13851,
    name: "AVK",
  },
  {
    id: 2278,
    name: "AV:LINK",
  },
  {
    id: 2328,
    name: "Avnet",
  },
  {
    id: 2829,
    name: "Avnet Design Service",
  },
  {
    id: 2834,
    name: "Avnet Silica IoT Kits",
  },
  {
    id: 2061,
    name: "AVX Corporation",
  },
  {
    id: 12099,
    name: "AVX/TPC",
  },
  {
    id: 13675,
    name: "Axicom / Siemens",
  },
  {
    id: 897,
    name: "Axiomet",
  },
  {
    id: 1846,
    name: "Axiomtek",
  },
  {
    id: 2939,
    name: "Axon",
  },
  {
    id: 14831,
    name: "AZ Displays",
  },
  {
    id: 1776,
    name: "Azoteq",
  },
  {
    id: 2835,
    name: "Azurewave Technologies Inc",
  },
  {
    id: 2662,
    name: "Bahco",
  },
  {
    id: 15236,
    name: "Baldwin Filters",
  },
  {
    id: 10642,
    name: "BALLUFF",
  },
  {
    id: 10604,
    name: "Banner",
  },
  {
    id: 2270,
    name: "Banner Engineering Corporation",
  },
  {
    id: 14688,
    name: "Bare Conductive",
  },
  {
    id: 14893,
    name: "Bas Components",
  },
  {
    id: 3446,
    name: "Basler Inc.",
  },
  {
    id: 10611,
    name: "Baumer",
  },
  {
    id: 14602,
    name: "Baumer Electric",
  },
  {
    id: 16121,
    name: "B B Battery",
  },
  {
    id: 2721,
    name: "BB Battery",
  },
  {
    id: 2782,
    name: "B&B SmartWorx Inc",
  },
  {
    id: 3173,
    name: "BC Components",
  },
  {
    id: 3040,
    name: "BCD",
  },
  {
    id: 2062,
    name: "Beacon EmbeddedWorks",
  },
  {
    id: 2290,
    name: "BeagleBoard by Seeed Studio",
  },
  {
    id: 19752,
    name: "Bear Grylls",
  },
  {
    id: 2751,
    name: "BECOM",
  },
  {
    id: 14672,
    name: "Bedea",
  },
  {
    id: 14427,
    name: "Beeswift",
  },
  {
    id: 1860,
    name: "Beha - Amprobe",
  },
  {
    id: 14003,
    name: "Beijer Electronics",
  },
  {
    id: 2055,
    name: "BEI Sensors",
  },
  {
    id: 2786,
    name: "Belden Inc.",
  },
  {
    id: 16735,
    name: "Belden Solutions",
  },
  {
    id: 1139,
    name: "Belden Wire & Cable",
  },
  {
    id: 2073,
    name: "Bel Fuse Inc.",
  },
  {
    id: 14433,
    name: "Belimo",
  },
  {
    id: 14927,
    name: "Belkin",
  },
  {
    id: 9365,
    name: "Bellin Dynamic Systems",
  },
  {
    id: 3391,
    name: "Belling Lee",
  },
  {
    id: 13668,
    name: "Bellnix",
  },
  {
    id: 13669,
    name: "Bellwave",
  },
  {
    id: 13673,
    name: "Bellwether",
  },
  {
    id: 2467,
    name: "Bend Labs",
  },
  {
    id: 2563,
    name: "Benewake",
  },
  {
    id: 2136,
    name: "Bergquist Company",
  },
  {
    id: 21392,
    name: "berkeley nuclonics corporation (directed energy inc)",
  },
  {
    id: 2719,
    name: "Bernstein",
  },
  {
    id: 13790,
    name: "Bernstein AG",
  },
  {
    id: 19868,
    name: "best",
  },
  {
    id: 13666,
    name: "BeStar Electronics",
  },
  {
    id: 13812,
    name: "BETA",
  },
  {
    id: 14172,
    name: "Betaduct",
  },
  {
    id: 13930,
    name: "Beta Duct",
  },
  {
    id: 2361,
    name: "Betatherm",
  },
  {
    id: 19820,
    name: "Bevco",
  },
  {
    id: 1702,
    name: "Binder",
  },
  {
    id: 14859,
    name: "BioBlocked",
  },
  {
    id: 2639,
    name: "Bi-Sonic",
  },
  {
    id: 2732,
    name: "BittWare",
  },
  {
    id: 2271,
    name: "Bivar Inc.",
  },
  {
    id: 9357,
    name: "BJB",
  },
  {
    id: 1688,
    name: "B&K Precision",
  },
  {
    id: 3924,
    name: "Black Box",
  },
  {
    id: 13784,
    name: "Black & Decker",
  },
  {
    id: 2549,
    name: "Blackhawk",
  },
  {
    id: 14500,
    name: "Black n Red",
  },
  {
    id: 14399,
    name: "BlindBolt",
  },
  {
    id: 2148,
    name: "BLOCK",
  },
  {
    id: 20111,
    name: "BlockMaster Electronics",
  },
  {
    id: 14845,
    name: "Blue Box Disposables GB Ltd",
  },
  {
    id: 1365,
    name: "Bluegiga Technologies",
  },
  {
    id: 13816,
    name: "BM Polyco",
  },
  {
    id: 14448,
    name: "BNL",
  },
  {
    id: 14120,
    name: "Bodo Ehmann",
  },
  {
    id: 20159,
    name: "Bogen Communications",
  },
  {
    id: 13792,
    name: "Böllhoff",
  },
  {
    id: 2686,
    name: "Bomar Interconnect",
  },
  {
    id: 17855,
    name: "Bondhus Corporation",
  },
  {
    id: 2157,
    name: "Bopla",
  },
  {
    id: 2561,
    name: "Bosch",
  },
  {
    id: 3428,
    name: "Bosch AE",
  },
  {
    id: 1693,
    name: "Bosch China",
  },
  {
    id: 3565,
    name: "Bosch Connected Devices",
  },
  {
    id: 10540,
    name: "Bosch Rexroth",
  },
  {
    id: 14906,
    name: "Bosch Rexroth Oil Control",
  },
  {
    id: 3509,
    name: "Bosch SE",
  },
  {
    id: 1950,
    name: "Bosch Sensortec",
  },
  {
    id: 19368,
    name: "Bose",
  },
  {
    id: 16268,
    name: "botron company inc.",
  },
  {
    id: 13598,
    name: "Bott",
  },
  {
    id: 3479,
    name: "Boundary Devices",
  },
  {
    id: 16136,
    name: "Bourns Electronics",
  },
  {
    id: 2005,
    name: "Bourns Inc.",
  },
  {
    id: 2315,
    name: "Bourns / J.W. Miller",
  },
  {
    id: 1476,
    name: "Box Enclosures",
  },
  {
    id: 14751,
    name: "BQ",
  },
  {
    id: 2471,
    name: "Brady",
  },
  {
    id: 16719,
    name: "Brady Corporation",
  },
  {
    id: 3459,
    name: "Brainboxes",
  },
  {
    id: 2197,
    name: "Brand - Rex",
  },
  {
    id: 13803,
    name: "Brannan",
  },
  {
    id: 3414,
    name: "Brauer",
  },
  {
    id: 3511,
    name: "Brennenstuhl",
  },
  {
    id: 20881,
    name: "Bresser Optik",
  },
  {
    id: 2609,
    name: "Bridgelux",
  },
  {
    id: 2438,
    name: "Bridgetek (FTDI)",
  },
  {
    id: 3159,
    name: "BrightKing",
  },
  {
    id: 3512,
    name: "BrightLED",
  },
  {
    id: 19984,
    name: "Brilliance Semiconductor",
  },
  {
    id: 13975,
    name: "Briton",
  },
  {
    id: 1306,
    name: "Broadcom (Avago)",
  },
  {
    id: 8124,
    name: "BROCADE",
  },
  {
    id: 14129,
    name: "Brodersen Controls",
  },
  {
    id: 19633,
    name: "Brodersen Systems",
  },
  {
    id: 1455,
    name: "Brother",
  },
  {
    id: 15017,
    name: "Broughton",
  },
  {
    id: 2723,
    name: "Broyce Control",
  },
  {
    id: 16987,
    name: "BS Teasdale",
  },
  {
    id: 1725,
    name: "Btl Fuse",
  },
  {
    id: 1506,
    name: "Bud Industries",
  },
  {
    id: 8449,
    name: "Bulgin Components",
  },
  {
    id: 2172,
    name: "Bulgin Limited",
  },
  {
    id: 20928,
    name: "bulldozer",
  },
  {
    id: 14617,
    name: "Burco",
  },
  {
    id: 11462,
    name: "BURNDY",
  },
  {
    id: 3489,
    name: "Burr Brown",
  },
  {
    id: 1185,
    name: "BusBoard Prototype Systems",
  },
  {
    id: 13972,
    name: "Buschjost",
  },
  {
    id: 3530,
    name: "BYD",
  },
  {
    id: 10659,
    name: "Cablofil International",
  },
  {
    id: 2363,
    name: "Caddock",
  },
  {
    id: 13971,
    name: "CAE Groupe",
  },
  {
    id: 13762,
    name: "CAE Multimedia Connect",
  },
  {
    id: 10682,
    name: "CAHORS",
  },
  {
    id: 10615,
    name: "Calex",
  },
  {
    id: 4071,
    name: "California Eastern Laboratories",
  },
  {
    id: 4123,
    name: "Calogic",
  },
  {
    id: 2085,
    name: "Cal Test",
  },
  {
    id: 16821,
    name: "Cal Test Electronics",
  },
  {
    id: 2232,
    name: "Cambion",
  },
  {
    id: 2246,
    name: "CamdenBoss",
  },
  {
    id: 13719,
    name: "Camloc Gas Springs",
  },
  {
    id: 14765,
    name: "CAMLOK",
  },
  {
    id: 15234,
    name: "Campbell",
  },
  {
    id: 14827,
    name: "Campini Corel Spa",
  },
  {
    id: 14246,
    name: "Canakit",
  },
  {
    id: 14010,
    name: "Canon",
  },
  {
    id: 16930,
    name: "CANTHERM",
  },
  {
    id: 2334,
    name: "Canyon",
  },
  {
    id: 19651,
    name: "cao group inc",
  },
  {
    id: 1216,
    name: "Caplugs",
  },
  {
    id: 3334,
    name: "Capxon",
  },
  {
    id: 14656,
    name: "CAP-XX",
  },
  {
    id: 2838,
    name: "Carclo Optics",
  },
  {
    id: 3354,
    name: "Carclo Technical Plastics",
  },
  {
    id: 10561,
    name: "Carel",
  },
  {
    id: 1219,
    name: "Carling Technologies",
  },
  {
    id: 1818,
    name: "Carlo Gavazzi Computing Solutions",
  },
  {
    id: 10622,
    name: "Carroll & Meynell",
  },
  {
    id: 13738,
    name: "Casio",
  },
  {
    id: 13789,
    name: "Castle",
  },
  {
    id: 14237,
    name: "Castrol",
  },
  {
    id: 3294,
    name: "Catalyst",
  },
  {
    id: 11363,
    name: "Catalyst Semiconductor",
  },
  {
    id: 14788,
    name: "Caterpillar",
  },
  {
    id: 1575,
    name: "CDE / Illinois Capacitor",
  },
  {
    id: 10539,
    name: "CEAG",
  },
  {
    id: 2716,
    name: "Ceenorm",
  },
  {
    id: 10636,
    name: "CEJN",
  },
  {
    id: 2728,
    name: "Celduc",
  },
  {
    id: 17104,
    name: "celduc inc.",
  },
  {
    id: 14236,
    name: "Cembre",
  },
  {
    id: 7241,
    name: "CENTILLIUM",
  },
  {
    id: 2247,
    name: "Central Semiconductor Corp",
  },
  {
    id: 20204,
    name: "Centronic Electro-Optics",
  },
  {
    id: 14506,
    name: "Centurion Safety",
  },
  {
    id: 14225,
    name: "CE-TEK",
  },
  {
    id: 3559,
    name: "Challenge",
  },
  {
    id: 3553,
    name: "Chang",
  },
  {
    id: 19992,
    name: "changzhou huawei electronic",
  },
  {
    id: 2894,
    name: "Changzhou Yinhe Century Microelectronics Co Ltd",
  },
  {
    id: 11021,
    name: "Chaun Choung Technology Corp. ( CCI )",
  },
  {
    id: 2743,
    name: "Chauvin Airnox",
  },
  {
    id: 14783,
    name: "Chauvin Arnoux Energy",
  },
  {
    id: 1839,
    name: "Chemtronics",
  },
  {
    id: 3217,
    name: "Chenmko",
  },
  {
    id: 13516,
    name: "Cherry",
  },
  {
    id: 2982,
    name: "Chicago",
  },
  {
    id: 16728,
    name: "Chilisin Electronics Corp",
  },
  {
    id: 8411,
    name: "Chinfa",
  },
  {
    id: 4004,
    name: "Chinmore Industry Co",
  },
  {
    id: 17793,
    name: "chinsan (elite)",
  },
  {
    id: 14961,
    name: "Chipanalog",
  },
  {
    id: 3430,
    name: "Chip Quik Inc.",
  },
  {
    id: 15235,
    name: "Chips and Technologies",
  },
  {
    id: 3549,
    name: "Chipsee",
  },
  {
    id: 14880,
    name: "Chipsee Co. Limited",
  },
  {
    id: 16130,
    name: "chogori technologies inc.",
  },
  {
    id: 12440,
    name: "Chomerics",
  },
  {
    id: 13746,
    name: "CH Products",
  },
  {
    id: 7042,
    name: "CHRONTEL",
  },
  {
    id: 3477,
    name: "CHT",
  },
  {
    id: 1997,
    name: "CIF",
  },
  {
    id: 14185,
    name: "Cimberio",
  },
  {
    id: 2022,
    name: "Cinch Connectivity Solutions",
  },
  {
    id: 3486,
    name: "Cinch Connectivity Solutions / AIM-Cambridge",
  },
  {
    id: 3431,
    name: "Cinch Connectivity Solutions / Dura-Con",
  },
  {
    id: 2047,
    name: "Cinch Connectivity Solutions / Johnson",
  },
  {
    id: 2509,
    name: "Cinch Connectivity Solutions / Midwest Microwave",
  },
  {
    id: 3522,
    name: "Cinch Connectivity Solutions / Semflex",
  },
  {
    id: 19609,
    name: "Cinch Midwest Microwave",
  },
  {
    id: 16817,
    name: "Cincon Electronics",
  },
  {
    id: 2228,
    name: "Cincon Electronics Co. LTD",
  },
  {
    id: 15963,
    name: "Circuitmess d.o.o",
  },
  {
    id: 2193,
    name: "Cirrus Logic Inc.",
  },
  {
    id: 14629,
    name: "CISA",
  },
  {
    id: 17746,
    name: "Cisco Systems",
  },
  {
    id: 16152,
    name: "citel inc",
  },
  {
    id: 5061,
    name: "CITIZEN",
  },
  {
    id: 15175,
    name: "Citizen Electronics",
  },
  {
    id: 2544,
    name: "Citizen Finedevice Co Ltd",
  },
  {
    id: 11429,
    name: "Citizen Finetech Miyota",
  },
  {
    id: 2969,
    name: "Cixi LANLING Electronic Co Ltd",
  },
  {
    id: 3281,
    name: "CJT",
  },
  {
    id: 16775,
    name: "CJT（ ）",
  },
  {
    id: 3478,
    name: "CK Magma",
  },
  {
    id: 2702,
    name: "CK Tools",
  },
  {
    id: 3068,
    name: "Clare",
  },
  {
    id: 19283,
    name: "CLC",
  },
  {
    id: 2627,
    name: "Clever Little Box",
  },
  {
    id: 2379,
    name: "CLIFF Electronic Components",
  },
  {
    id: 13802,
    name: "Cliff Electronics",
  },
  {
    id: 3362,
    name: "Clifford and Snell",
  },
  {
    id: 13926,
    name: "Clifford & Snell",
  },
  {
    id: 2600,
    name: "Cloud",
  },
  {
    id: 2118,
    name: "CML Innovative Technologies",
  },
  {
    id: 8445,
    name: "CML Microcircuits",
  },
  {
    id: 9271,
    name: "CNC Tech",
  },
  {
    id: 3557,
    name: "Coast",
  },
  {
    id: 14496,
    name: "COAX Connectors",
  },
  {
    id: 10580,
    name: "Coba Europe",
  },
  {
    id: 14476,
    name: "Codelock",
  },
  {
    id: 2949,
    name: "Coilcraft Inc",
  },
  {
    id: 13715,
    name: "Colder Products",
  },
  {
    id: 18624,
    name: "COLIBRYS",
  },
  {
    id: 2904,
    name: "Cologne",
  },
  {
    id: 17615,
    name: "COMAIR",
  },
  {
    id: 944,
    name: "Comark",
  },
  {
    id: 14116,
    name: "Comatec",
  },
  {
    id: 1188,
    name: "Comchip Technology",
  },
  {
    id: 15182,
    name: "COMFORTABLE ELECTRONIC CO., LTD.",
  },
  {
    id: 14253,
    name: "COMMSCOPE",
  },
  {
    id: 19850,
    name: "Compact Instruments",
  },
  {
    id: 12052,
    name: "COMPONENTS CORPORATION",
  },
  {
    id: 20520,
    name: "Comtop Connectivity Solutions",
  },
  {
    id: 1401,
    name: "Comus",
  },
  {
    id: 4093,
    name: "Concord Electronics",
  },
  {
    id: 1742,
    name: "Condor / SL Power",
  },
  {
    id: 13515,
    name: "Conec",
  },
  {
    id: 1713,
    name: "Conexant Systems",
  },
  {
    id: 14212,
    name: "Conex-Banninger",
  },
  {
    id: 20929,
    name: "conex-it",
  },
  {
    id: 1384,
    name: "Congatec",
  },
  {
    id: 2578,
    name: "Connective Peripherals",
  },
  {
    id: 2824,
    name: "Connectix Cabling Systems",
  },
  {
    id: 8435,
    name: "Connfly",
  },
  {
    id: 13512,
    name: "Connor - Winfield Corporation",
  },
  {
    id: 4005,
    name: "Conquer",
  },
  {
    id: 14493,
    name: "Contitech",
  },
  {
    id: 3427,
    name: "Contrinex Gmbh",
  },
  {
    id: 13969,
    name: "Controlec",
  },
  {
    id: 13699,
    name: "Control Techniques",
  },
  {
    id: 1759,
    name: "Conxall / Switchcraft",
  },
  {
    id: 20060,
    name: "coolgear",
  },
  {
    id: 14864,
    name: "Cooper B-Line",
  },
  {
    id: 13492,
    name: "Cooper Bussmann / Coiltronics / Eaton",
  },
  {
    id: 13491,
    name: "Cooper Bussmann / Eaton",
  },
  {
    id: 13493,
    name: "Cooper / Eaton",
  },
  {
    id: 8723,
    name: "Cooper Instruments & Systems",
  },
  {
    id: 13513,
    name: "Cooper Interconnect / Eaton",
  },
  {
    id: 13990,
    name: "Cooper Tools",
  },
  {
    id: 14252,
    name: "Copper 3D",
  },
  {
    id: 2281,
    name: "Coral",
  },
  {
    id: 14155,
    name: "CorDEX",
  },
  {
    id: 2074,
    name: "Cornell Dubilier Electronics (CDE)",
  },
  {
    id: 17795,
    name: "cornell dubilier / illinois capacitor",
  },
  {
    id: 2383,
    name: "Corning",
  },
  {
    id: 10635,
    name: "Correge",
  },
  {
    id: 10882,
    name: "Corsair",
  },
  {
    id: 3094,
    name: "Cortina",
  },
  {
    id: 15177,
    name: "Cortina Systems",
  },
  {
    id: 2089,
    name: "Cosel",
  },
  {
    id: 17753,
    name: "Cosel USA",
  },
  {
    id: 13539,
    name: "Cosmo Electronics",
  },
  {
    id: 10564,
    name: "COTEK",
  },
  {
    id: 2225,
    name: "Coto Technology",
  },
  {
    id: 15384,
    name: "Cottam",
  },
  {
    id: 3242,
    name: "CP Clare",
  },
  {
    id: 11711,
    name: "CP CLARE",
  },
  {
    id: 14753,
    name: "CP Electronics",
  },
  {
    id: 10690,
    name: "Craig & Derricott",
  },
  {
    id: 13895,
    name: "Cranford Controls",
  },
  {
    id: 8750,
    name: "CRC Industries",
  },
  {
    id: 2276,
    name: "CREALITY 3D",
  },
  {
    id: 2610,
    name: "Cree LED",
  },
  {
    id: 18403,
    name: "Crescent Manufacturing",
  },
  {
    id: 13778,
    name: "Cressall",
  },
  {
    id: 16810,
    name: "Crest Medical",
  },
  {
    id: 1796,
    name: "Critical Link",
  },
  {
    id: 17709,
    name: "cr magnetics inc.",
  },
  {
    id: 14722,
    name: "Crompton Controls",
  },
  {
    id: 14878,
    name: "Crompton Lighting",
  },
  {
    id: 14473,
    name: "Cromwell Polythene",
  },
  {
    id: 13938,
    name: "Cropico",
  },
  {
    id: 14093,
    name: "CROSBY",
  },
  {
    id: 21648,
    name: "Crossmatch",
  },
  {
    id: 15289,
    name: "Crouse-Hinds",
  },
  {
    id: 1679,
    name: "Crouzet",
  },
  {
    id: 13509,
    name: "Crouzet / Syrelec",
  },
  {
    id: 1231,
    name: "Crowd Supply",
  },
  {
    id: 13870,
    name: "Crucial",
  },
  {
    id: 10806,
    name: "Crydom Inc.",
  },
  {
    id: 3123,
    name: "Crystal",
  },
  {
    id: 13511,
    name: "Crystal Clear Technology (CCT)",
  },
  {
    id: 1673,
    name: "Crystek Corporation",
  },
  {
    id: 14254,
    name: "CSL",
  },
  {
    id: 3209,
    name: "C-Tech",
  },
  {
    id: 14125,
    name: "CTi",
  },
  {
    id: 19424,
    name: "c-ton industries",
  },
  {
    id: 13573,
    name: "CTS Components",
  },
  {
    id: 10898,
    name: "CTS Corporation",
  },
  {
    id: 1404,
    name: "CUI Devices",
  },
  {
    id: 13974,
    name: "Curtis",
  },
  {
    id: 3498,
    name: "Curtis Industries",
  },
  {
    id: 16818,
    name: "Curtis Industries LLC",
  },
  {
    id: 19795,
    name: "Curtis Instruments",
  },
  {
    id: 2821,
    name: "Custom Computer Services Inc. (CCS)",
  },
  {
    id: 13494,
    name: "Cutler Hammer / Eaton",
  },
  {
    id: 6979,
    name: "CVILUX",
  },
  {
    id: 2169,
    name: "CW Industries",
  },
  {
    id: 9742,
    name: "CYG Wayon",
  },
  {
    id: 2446,
    name: "Cynergy3",
  },
  {
    id: 22794,
    name: "CYPRESS / RAMTRON",
  },
  {
    id: 13505,
    name: "Cypress Semiconductor / Infineon Technologies",
  },
  {
    id: 13506,
    name: "Cypress Semiconductor / Spansion",
  },
  {
    id: 21354,
    name: "dachung contact probes",
  },
  {
    id: 19923,
    name: "daco semiconductor",
  },
  {
    id: 2212,
    name: "Dailywell",
  },
  {
    id: 3083,
    name: "Dalicap",
  },
  {
    id: 1634,
    name: "Dallas Logic Corporation",
  },
  {
    id: 14681,
    name: "Danfoss",
  },
  {
    id: 2791,
    name: "Daniels",
  },
  {
    id: 18726,
    name: "Daniels Manufacturing Corporation",
  },
  {
    id: 14111,
    name: "Danotherm",
  },
  {
    id: 13551,
    name: "Dantona Industries",
  },
  {
    id: 1477,
    name: "Danxingda Electronics Co Ltd",
  },
  {
    id: 6283,
    name: "DARFON",
  },
  {
    id: 20088,
    name: "darfon corporation",
  },
  {
    id: 20384,
    name: "DataComm Electronics",
  },
  {
    id: 2025,
    name: "Datacraft",
  },
  {
    id: 3090,
    name: "Data Delay Devices",
  },
  {
    id: 14078,
    name: "Dataglo SQ",
  },
  {
    id: 14092,
    name: "Datalogic",
  },
  {
    id: 3398,
    name: "Dataman",
  },
  {
    id: 2706,
    name: "Datasensor",
  },
  {
    id: 1355,
    name: "Datel",
  },
  {
    id: 3300,
    name: "Davicom",
  },
  {
    id: 1544,
    name: "Davies Molding",
  },
  {
    id: 22528,
    name: "Daylight",
  },
  {
    id: 15240,
    name: "Dayton",
  },
  {
    id: 10618,
    name: "DBI-Sala",
  },
  {
    id: 3501,
    name: "DBK",
  },
  {
    id: 20230,
    name: "DBK Group",
  },
  {
    id: 2462,
    name: "DB Unlimited",
  },
  {
    id: 13503,
    name: "DC Components Co Ltd",
  },
  {
    id: 13885,
    name: "Decelect",
  },
  {
    id: 14812,
    name: "Deflecto",
  },
  {
    id: 3133,
    name: "Degson",
  },
  {
    id: 17257,
    name: "Degson Electronics Co",
  },
  {
    id: 15189,
    name: "Dehner Elektronik",
  },
  {
    id: 14726,
    name: "Delabie",
  },
  {
    id: 2583,
    name: "Delkin Devices",
  },
  {
    id: 2188,
    name: "Dell",
  },
  {
    id: 13504,
    name: "Delphi / Aptive",
  },
  {
    id: 14887,
    name: "Deltaco",
  },
  {
    id: 2200,
    name: "Delta Electronics Inc.",
  },
  {
    id: 17041,
    name: "delta electronics mfg. corp.",
  },
  {
    id: 14124,
    name: "Delta-Mobrey",
  },
  {
    id: 13846,
    name: "Delta Plus",
  },
  {
    id: 14321,
    name: "Delta Product Groups",
  },
  {
    id: 12314,
    name: "DELTROL",
  },
  {
    id: 2493,
    name: "Deltron Components",
  },
  {
    id: 3024,
    name: "Del-Tron Precision",
  },
  {
    id: 14498,
    name: "DENDIX",
  },
  {
    id: 3403,
    name: "Denon Professional",
  },
  {
    id: 15314,
    name: "Densitron",
  },
  {
    id: 1486,
    name: "Desco Europe (Formely Vermason)",
  },
  {
    id: 16991,
    name: "Desco Industries",
  },
  {
    id: 1649,
    name: "Desco Tools",
  },
  {
    id: 3520,
    name: "Designer Systems",
  },
  {
    id: 15156,
    name: "DE-STA-CO",
  },
  {
    id: 21958,
    name: "Detco Industries",
  },
  {
    id: 19589,
    name: "Detectamet",
  },
  {
    id: 20240,
    name: "Devlin Electronics",
  },
  {
    id: 2601,
    name: "Dewalt",
  },
  {
    id: 1408,
    name: "DFI",
  },
  {
    id: 1923,
    name: "DFRobot",
  },
  {
    id: 1267,
    name: "Dialight",
  },
  {
    id: 249,
    name: "Dialog Semiconductor",
  },
  {
    id: 14652,
    name: "Dickies",
  },
  {
    id: 3033,
    name: "DI/DT",
  },
  {
    id: 1681,
    name: "Digi International",
  },
  {
    id: 14361,
    name: "Digi-Key",
  },
  {
    id: 20100,
    name: "digi-key/cree",
  },
  {
    id: 2547,
    name: "Digilent Inc",
  },
  {
    id: 3385,
    name: "Digimess",
  },
  {
    id: 2142,
    name: "Digisound",
  },
  {
    id: 3532,
    name: "Digital View",
  },
  {
    id: 14134,
    name: "Digitron",
  },
  {
    id: 3343,
    name: "Dinkle",
  },
  {
    id: 14472,
    name: "Dinolite",
  },
  {
    id: 578,
    name: "Diodes Incorporated",
  },
  {
    id: 12352,
    name: "Diodes Inc / Zetex",
  },
  {
    id: 4008,
    name: "DIOO",
  },
  {
    id: 803,
    name: "Diotec Semiconductor AG",
  },
  {
    id: 1813,
    name: "Diptronics",
  },
  {
    id: 3885,
    name: "Diptronics manufacturing",
  },
  {
    id: 3051,
    name: "Discera",
  },
  {
    id: 2645,
    name: "Displaytech",
  },
  {
    id: 18594,
    name: "diwell electronics",
  },
  {
    id: 14152,
    name: "DJI",
  },
  {
    id: 13819,
    name: "DKM",
  },
  {
    id: 2535,
    name: "DLC Display Co Ltd",
  },
  {
    id: 14138,
    name: "D-Link",
  },
  {
    id: 1613,
    name: "DMC Tools",
  },
  {
    id: 19388,
    name: "DNC",
  },
  {
    id: 14179,
    name: "DOGA",
  },
  {
    id: 19841,
    name: "DOLD Industries",
  },
  {
    id: 2722,
    name: "Dold & Soehne",
  },
  {
    id: 14509,
    name: "Dom Metalux",
  },
  {
    id: 14411,
    name: "Domocare",
  },
  {
    id: 2382,
    name: "Doodle Labs",
  },
  {
    id: 14626,
    name: "Dorgard",
  },
  {
    id: 10599,
    name: "Dormer",
  },
  {
    id: 2097,
    name: "Dow Corning",
  },
  {
    id: 14123,
    name: "DRAEGER",
  },
  {
    id: 2748,
    name: "Dremel",
  },
  {
    id: 14804,
    name: "Dr Martens",
  },
  {
    id: 10588,
    name: "Druck",
  },
  {
    id: 17299,
    name: "DUCATI",
  },
  {
    id: 14648,
    name: "DUCK TAPE",
  },
  {
    id: 13927,
    name: "Dunlop",
  },
  {
    id: 11674,
    name: "DUPONT",
  },
  {
    id: 1695,
    name: "Duracell",
  },
  {
    id: 14840,
    name: "Duracell Procell",
  },
  {
    id: 1296,
    name: "Duratool",
  },
  {
    id: 19793,
    name: "Durham Manufacturing",
  },
  {
    id: 3312,
    name: "DVSI",
  },
  {
    id: 14938,
    name: "DWYER INSTRUMENTS",
  },
  {
    id: 2668,
    name: "Dymo",
  },
  {
    id: 20229,
    name: "Dynex Semi",
  },
  {
    id: 14216,
    name: "Dzus Fastener Europe",
  },
  {
    id: 19812,
    name: "e2v aerospace & defense(teledyne)",
  },
  {
    id: 14249,
    name: "EAD",
  },
  {
    id: 2707,
    name: "EA Elektro-Automatik",
  },
  {
    id: 13489,
    name: "Eagle",
  },
  {
    id: 2460,
    name: "Eagle-Picher",
  },
  {
    id: 2235,
    name: "Eagle Plastic Devices",
  },
  {
    id: 13490,
    name: "Eagle Vision",
  },
  {
    id: 1764,
    name: "EAO Secme",
  },
  {
    id: 9758,
    name: "Eaton Corporation",
  },
  {
    id: 14718,
    name: "Eaton HAC",
  },
  {
    id: 17717,
    name: "EATON TRIPP LITE",
  },
  {
    id: 11660,
    name: "EBERLE",
  },
  {
    id: 2222,
    name: "ebm-papst Inc.",
  },
  {
    id: 13750,
    name: "Eccel Technology Ltd",
  },
  {
    id: 3223,
    name: "ECE",
  },
  {
    id: 15442,
    name: "Eclipse Tools",
  },
  {
    id: 370,
    name: "econ connect",
  },
  {
    id: 13933,
    name: "Ecospill Ltd",
  },
  {
    id: 2444,
    name: "Ecount",
  },
  {
    id: 2459,
    name: "eCOUNT Embedded",
  },
  {
    id: 1830,
    name: "ECS International",
  },
  {
    id: 2202,
    name: "EDAC Inc.",
  },
  {
    id: 16186,
    name: "Edacpower Electronics",
  },
  {
    id: 3357,
    name: "Eddystone",
  },
  {
    id: 14716,
    name: "Edimax",
  },
  {
    id: 14737,
    name: "EDL Lighting Limited",
  },
  {
    id: 3396,
    name: "Ednet",
  },
  {
    id: 1970,
    name: "EDSYN",
  },
  {
    id: 18412,
    name: "Edwards Signaling",
  },
  {
    id: 3466,
    name: "E&E Magnetic",
  },
  {
    id: 1457,
    name: "EEMB",
  },
  {
    id: 2392,
    name: "EETools",
  },
  {
    id: 13912,
    name: "Efento",
  },
  {
    id: 13554,
    name: "EIC Semiconductor",
  },
  {
    id: 2406,
    name: "eInfochips",
  },
  {
    id: 2602,
    name: "Einhell",
  },
  {
    id: 2797,
    name: "Einscan",
  },
  {
    id: 2313,
    name: "EKL",
  },
  {
    id: 1711,
    name: "ELAN",
  },
  {
    id: 22577,
    name: "ELAN/",
  },
  {
    id: 1723,
    name: "Elantec",
  },
  {
    id: 19766,
    name: "Elantec Semiconductor",
  },
  {
    id: 928,
    name: "Elbro",
  },
  {
    id: 2559,
    name: "ELC",
  },
  {
    id: 3457,
    name: "Elditest",
  },
  {
    id: 13818,
    name: "eldoLED",
  },
  {
    id: 3320,
    name: "Elec & Eletec",
  },
  {
    id: 14159,
    name: "Elecfreaks",
  },
  {
    id: 19840,
    name: "Electrohm",
  },
  {
    id: 2613,
    name: "Electrolube",
  },
  {
    id: 10664,
    name: "Electromen OY",
  },
  {
    id: 1917,
    name: "Electronic Assembly",
  },
  {
    id: 19785,
    name: "Electronic Hardware Corp",
  },
  {
    id: 14486,
    name: "Electro PJP",
  },
  {
    id: 1847,
    name: "Electroswitch",
  },
  {
    id: 17781,
    name: "Electro Switch",
  },
  {
    id: 14450,
    name: "Electro Terminal",
  },
  {
    id: 13890,
    name: "Electrotherm",
  },
  {
    id: 13905,
    name: "Elesa-Clayton",
  },
  {
    id: 16151,
    name: "elesa usa corporation",
  },
  {
    id: 9147,
    name: "Elfaro Int",
  },
  {
    id: 14478,
    name: "Elga",
  },
  {
    id: 15178,
    name: "Elite Semiconductor Memory Technology",
  },
  {
    id: 13765,
    name: "Eliwell",
  },
  {
    id: 14988,
    name: "Elka Gb",
  },
  {
    id: 2190,
    name: "Elkay Electrical",
  },
  {
    id: 1771,
    name: "Elma",
  },
  {
    id: 3382,
    name: "ELMOS Semiconductor",
  },
  {
    id: 2551,
    name: "Elna",
  },
  {
    id: 5393,
    name: "ELPIDA",
  },
  {
    id: 18072,
    name: "ELPROTRONIC INC.",
  },
  {
    id: 8644,
    name: "EMBEST",
  },
  {
    id: 2842,
    name: "EMBEST Technology",
  },
  {
    id: 2016,
    name: "Emcraft Systems",
  },
  {
    id: 7006,
    name: "EMCT",
  },
  {
    id: 2695,
    name: "EM Devices Europe",
  },
  {
    id: 13770,
    name: "EMERSON – ASCO",
  },
  {
    id: 14136,
    name: "EMERSON – AVENTICS",
  },
  {
    id: 19901,
    name: "EM Microelectronic-Marin",
  },
  {
    id: 3395,
    name: "Encitech",
  },
  {
    id: 20202,
    name: "Encitech Connectors AB",
  },
  {
    id: 3558,
    name: "Enclustra FPGA Solutions",
  },
  {
    id: 20855,
    name: "Enedo",
  },
  {
    id: 13889,
    name: "Eneloop",
  },
  {
    id: 13468,
    name: "Energizer",
  },
  {
    id: 14083,
    name: "Enerpac",
  },
  {
    id: 9898,
    name: "ENERSYS",
  },
  {
    id: 14181,
    name: "Engel",
  },
  {
    id: 14444,
    name: "ENIX Energies",
  },
  {
    id: 2772,
    name: "Enlite",
  },
  {
    id: 14018,
    name: "ENM",
  },
  {
    id: 2260,
    name: "EnOcean",
  },
  {
    id: 3400,
    name: "Enpirion",
  },
  {
    id: 14627,
    name: "Entel",
  },
  {
    id: 2439,
    name: "Entropic Communications",
  },
  {
    id: 14348,
    name: "Eon Silicon Solution",
  },
  {
    id: 2417,
    name: "EOS Power",
  },
  {
    id: 19415,
    name: "EOS Power India",
  },
  {
    id: 13526,
    name: "EOZ Secme",
  },
  {
    id: 1994,
    name: "EPCOS - TDK Electronics",
  },
  {
    id: 13467,
    name: "Epic Connectors",
  },
  {
    id: 13999,
    name: "Eplax",
  },
  {
    id: 1343,
    name: "Epson",
  },
  {
    id: 2147,
    name: "EPT",
  },
  {
    id: 14453,
    name: "EPtronics INC.",
  },
  {
    id: 2557,
    name: "ERG Components",
  },
  {
    id: 13466,
    name: "Ergo Bahco",
  },
  {
    id: 14290,
    name: "Ergodyne",
  },
  {
    id: 2898,
    name: "Ericsson",
  },
  {
    id: 2111,
    name: "ERNI Electronics Inc",
  },
  {
    id: 2526,
    name: "ERP",
  },
  {
    id: 13535,
    name: "ErreBi Group",
  },
  {
    id: 1228,
    name: "ERSA",
  },
  {
    id: 1823,
    name: "ES Cable & Wire",
  },
  {
    id: 2308,
    name: "ESKA Erich Schweizer GmbH",
  },
  {
    id: 4158,
    name: "ESMT",
  },
  {
    id: 1956,
    name: "Espressif Systems",
  },
  {
    id: 14395,
    name: "Essailec",
  },
  {
    id: 2543,
    name: "Essentra Components",
  },
  {
    id: 1858,
    name: "ES&S Solutions GmbH",
  },
  {
    id: 2770,
    name: "ESS Technology",
  },
  {
    id: 1468,
    name: "E-Switch",
  },
  {
    id: 1806,
    name: "E-T-A",
  },
  {
    id: 2628,
    name: "ETA-USA",
  },
  {
    id: 10841,
    name: "E-tec",
  },
  {
    id: 4120,
    name: "Ethertronics / Kyocera AVX",
  },
  {
    id: 9464,
    name: "ETI",
  },
  {
    id: 3535,
    name: "ETI Polam",
  },
  {
    id: 2511,
    name: "ETI Systems",
  },
  {
    id: 3023,
    name: "ETRI",
  },
  {
    id: 20029,
    name: "Etron Technology",
  },
  {
    id: 2020,
    name: "Ettinger",
  },
  {
    id: 20794,
    name: "EUCHNER",
  },
  {
    id: 14871,
    name: "Euroind",
  },
  {
    id: 10647,
    name: "Euro-Locks a Lowe & Fletcher group Company",
  },
  {
    id: 10318,
    name: "EUROPA",
  },
  {
    id: 2614,
    name: "Europa Components",
  },
  {
    id: 493,
    name: "European Thermodynamics",
  },
  {
    id: 2013,
    name: "Euroquartz",
  },
  {
    id: 13712,
    name: "EUROSTAT",
  },
  {
    id: 2435,
    name: "Eurotech",
  },
  {
    id: 19794,
    name: "Eurotherm Controls",
  },
  {
    id: 17572,
    name: "Everbouquet International",
  },
  {
    id: 14061,
    name: "Eveready",
  },
  {
    id: 2241,
    name: "Everlight Electronics Co Ltd",
  },
  {
    id: 9379,
    name: "EverPro",
  },
  {
    id: 4534,
    name: "EVERSPIN",
  },
  {
    id: 2753,
    name: "Everspin Technologies Inc.",
  },
  {
    id: 13817,
    name: "Ewellix Makers in Motion",
  },
  {
    id: 2368,
    name: "Exar",
  },
  {
    id: 6253,
    name: "EXARSIPEX",
  },
  {
    id: 3480,
    name: "Excamera Labs",
  },
  {
    id: 1850,
    name: "Excelitas",
  },
  {
    id: 14714,
    name: "Excelitas Technologies",
  },
  {
    id: 19546,
    name: "Exidor",
  },
  {
    id: 3561,
    name: "Exor International",
  },
  {
    id: 13679,
    name: "Expert by Facom",
  },
  {
    id: 1577,
    name: "Extech Instruments",
  },
  {
    id: 1714,
    name: "Extra",
  },
  {
    id: 14732,
    name: "EYC",
  },
  {
    id: 3302,
    name: "E-Z-Hook",
  },
  {
    id: 14752,
    name: "Ezyclamp",
  },
  {
    id: 15464,
    name: "Fabco Air",
  },
  {
    id: 14165,
    name: "Fabreeka",
  },
  {
    id: 2612,
    name: "Facom",
  },
  {
    id: 14599,
    name: "FAG Bearing",
  },
  {
    id: 1442,
    name: "Fagor",
  },
  {
    id: 16190,
    name: "Fagor Electronic Components",
  },
  {
    id: 3018,
    name: "Fairchild Semiconductor Corporation",
  },
  {
    id: 1989,
    name: "Fair-Rite Products Corp.",
  },
  {
    id: 1564,
    name: "Fanstel",
  },
  {
    id: 2233,
    name: "Fascomp",
  },
  {
    id: 3534,
    name: "Fastron",
  },
  {
    id: 17851,
    name: "Fastron Electronics",
  },
  {
    id: 14213,
    name: "Faulhaber",
  },
  {
    id: 2261,
    name: "FCT Group",
  },
  {
    id: 3241,
    name: "FDK",
  },
  {
    id: 13791,
    name: "Felder Lottechnik",
  },
  {
    id: 3081,
    name: "Fenghua",
  },
  {
    id: 10650,
    name: "Fenner Drives",
  },
  {
    id: 2094,
    name: "Ferroxcube",
  },
  {
    id: 2092,
    name: "Festo",
  },
  {
    id: 1827,
    name: "FiaBuc Kabelkonfektionierung",
  },
  {
    id: 14721,
    name: "Fiamm",
  },
  {
    id: 13758,
    name: "FIBET",
  },
  {
    id: 1666,
    name: "Fibox",
  },
  {
    id: 17882,
    name: "Fibox Enclosures",
  },
  {
    id: 6759,
    name: "FIGARO",
  },
  {
    id: 14016,
    name: "FIGnition",
  },
  {
    id: 1909,
    name: "Finder Components",
  },
  {
    id: 2019,
    name: "Finder Relays Inc",
  },
  {
    id: 2237,
    name: "Finisar Corporation",
  },
  {
    id: 13901,
    name: "FireHawk Safety Products",
  },
  {
    id: 17784,
    name: "First Sensor",
  },
  {
    id: 1611,
    name: "Fischer Elektronik",
  },
  {
    id: 14899,
    name: "Fisher",
  },
  {
    id: 14214,
    name: "FIT-Foxconn",
  },
  {
    id: 14898,
    name: "Fivilevel",
  },
  {
    id: 2618,
    name: "Fivistop",
  },
  {
    id: 2692,
    name: "Fix&Fasten",
  },
  {
    id: 3496,
    name: "Fixman",
  },
  {
    id: 2474,
    name: "Flambeau",
  },
  {
    id: 13783,
    name: "Flexello",
  },
  {
    id: 10583,
    name: "Flexicon",
  },
  {
    id: 20877,
    name: "Flexlink Systems",
  },
  {
    id: 3082,
    name: "Flex Ltd.",
  },
  {
    id: 13978,
    name: "Flexovit",
  },
  {
    id: 9959,
    name: "Flex Power Modules",
  },
  {
    id: 13546,
    name: "Flip Electronics (Authorized)",
  },
  {
    id: 1998,
    name: "FLIR Extech",
  },
  {
    id: 2292,
    name: "FLIR Systems",
  },
  {
    id: 10607,
    name: "Flowline",
  },
  {
    id: 14929,
    name: "Floyd bell",
  },
  {
    id: 159,
    name: "Fluke",
  },
  {
    id: 16124,
    name: "Fluke Corporation",
  },
  {
    id: 13899,
    name: "Fluro",
  },
  {
    id: 3584,
    name: "FORDATA",
  },
  {
    id: 2622,
    name: "Forge",
  },
  {
    id: 2802,
    name: "Formerica Optoelectronics",
  },
  {
    id: 14921,
    name: "Formosa Microsemi",
  },
  {
    id: 10505,
    name: "FORTEX",
  },
  {
    id: 2442,
    name: "Foryard",
  },
  {
    id: 3182,
    name: "Foshan NationStar Optoelectronics Co Ltd",
  },
  {
    id: 3091,
    name: "Foxconn",
  },
  {
    id: 12321,
    name: "FOXCONN INTERCONNECT TECHNOLOGY",
  },
  {
    id: 2711,
    name: "Fox Electronics",
  },
  {
    id: 3482,
    name: "Framos",
  },
  {
    id: 3166,
    name: "Freescale",
  },
  {
    id: 10846,
    name: "Freescale Semiconductor",
  },
  {
    id: 19930,
    name: "fremont micro devices ltd",
  },
  {
    id: 20139,
    name: "fresnel factory inc.",
  },
  {
    id: 15339,
    name: "Freudenberg-NOK",
  },
  {
    id: 14200,
    name: "Freudenberg Sealing Technologies Simrit",
  },
  {
    id: 14702,
    name: "Frigerio Ettore",
  },
  {
    id: 15341,
    name: "Frigidaire",
  },
  {
    id: 2648,
    name: "Friwo",
  },
  {
    id: 5355,
    name: "FRONTIER",
  },
  {
    id: 2307,
    name: "F&S",
  },
  {
    id: 3419,
    name: "FSP",
  },
  {
    id: 13860,
    name: "FTI",
  },
  {
    id: 1932,
    name: "Fuji Electric",
  },
  {
    id: 17125,
    name: "FUJI ELECTRIC",
  },
  {
    id: 16922,
    name: "Fuji Electrochemical",
  },
  {
    id: 13705,
    name: "Fujikura",
  },
  {
    id: 1422,
    name: "Fujitsu",
  },
  {
    id: 19422,
    name: "Fujitsu Semiconductors",
  },
  {
    id: 9904,
    name: "Fulham",
  },
  {
    id: 2517,
    name: "Fulleon",
  },
  {
    id: 13495,
    name: "Fulleon / Eaton",
  },
  {
    id: 14485,
    name: "FUSS-EMV",
  },
  {
    id: 2687,
    name: "Futaba",
  },
  {
    id: 3297,
    name: "Futong",
  },
  {
    id: 17870,
    name: "Future Designs Inc.",
  },
  {
    id: 1965,
    name: "Future Technology Devices International Ltd",
  },
  {
    id: 1705,
    name: "Gaggione",
  },
  {
    id: 3378,
    name: "GAÏA Converter",
  },
  {
    id: 3433,
    name: "Gainspan",
  },
  {
    id: 2102,
    name: "Gainta",
  },
  {
    id: 13713,
    name: "Gai-Tronics",
  },
  {
    id: 3002,
    name: "Galvantech",
  },
  {
    id: 2162,
    name: "GaN Systems",
  },
  {
    id: 969,
    name: "Gardner Bender",
  },
  {
    id: 14682,
    name: "Gardner Denver Cooper",
  },
  {
    id: 14837,
    name: "Gard Plasticases",
  },
  {
    id: 2752,
    name: "Garmin",
  },
  {
    id: 14883,
    name: "GAS SENSING SOLUTIONS LTD",
  },
  {
    id: 10576,
    name: "Gates",
  },
  {
    id: 10543,
    name: "GCE",
  },
  {
    id: 3350,
    name: "GC Electronics",
  },
  {
    id: 2398,
    name: "GCT (Global Connector Technology)",
  },
  {
    id: 2703,
    name: "Gecko Drive",
  },
  {
    id: 2696,
    name: "Gedore",
  },
  {
    id: 10681,
    name: "Gefran",
  },
  {
    id: 10572,
    name: "Gemini",
  },
  {
    id: 10567,
    name: "Gems Sensors",
  },
  {
    id: 2214,
    name: "General Electric",
  },
  {
    id: 9619,
    name: "GENESIC",
  },
  {
    id: 1595,
    name: "GeneSiC Semiconductor",
  },
  {
    id: 1953,
    name: "Geniatech",
  },
  {
    id: 19825,
    name: "genicom co., ltd.",
  },
  {
    id: 3461,
    name: "Gennum",
  },
  {
    id: 3171,
    name: "GenSemi",
  },
  {
    id: 13739,
    name: "Gent",
  },
  {
    id: 14089,
    name: "Genteq",
  },
  {
    id: 1350,
    name: "Genusion",
  },
  {
    id: 10559,
    name: "Georg Fischer",
  },
  {
    id: 14697,
    name: "GEORGIN",
  },
  {
    id: 3472,
    name: "Gertboard",
  },
  {
    id: 14677,
    name: "Getac",
  },
  {
    id: 14808,
    name: "Gewiss",
  },
  {
    id: 9850,
    name: "Geyer Electronic",
  },
  {
    id: 2430,
    name: "GHI Electronics",
  },
  {
    id: 15452,
    name: "Giantec Semiconductor",
  },
  {
    id: 3705,
    name: "Giantec Semiconductor Inc",
  },
  {
    id: 4363,
    name: "GigaDevice",
  },
  {
    id: 14271,
    name: "Gigaset",
  },
  {
    id: 14178,
    name: "GILGEN Muller & Weigert",
  },
  {
    id: 14288,
    name: "G&J Hall",
  },
  {
    id: 14238,
    name: "GlassGuard",
  },
  {
    id: 1322,
    name: "Glenair",
  },
  {
    id: 19647,
    name: "glf integrated power",
  },
  {
    id: 14393,
    name: "Global Component Sourcing",
  },
  {
    id: 3571,
    name: "Global Connector Technology",
  },
  {
    id: 10533,
    name: "Global Laser",
  },
  {
    id: 15454,
    name: "Global Navigation Systems",
  },
  {
    id: 2443,
    name: "Global Specialties",
  },
  {
    id: 15453,
    name: "GNS Electronics",
  },
  {
    id: 19435,
    name: "goford semiconductor",
  },
  {
    id: 14997,
    name: "Goldfreeze",
  },
  {
    id: 19936,
    name: "Goldx",
  },
  {
    id: 14434,
    name: "Goliath",
  },
  {
    id: 16260,
    name: "goobay",
  },
  {
    id: 2380,
    name: "Good-Ark Electronics",
  },
  {
    id: 3443,
    name: "Google AIY",
  },
  {
    id: 3515,
    name: "Gore",
  },
  {
    id: 13724,
    name: "Gossen Metrawatt",
  },
  {
    id: 16040,
    name: "GOWIN Semiconductor",
  },
  {
    id: 9901,
    name: "GP Batteries",
  },
  {
    id: 14184,
    name: "GPEG",
  },
  {
    id: 1927,
    name: "GradConn",
  },
  {
    id: 10669,
    name: "Grasslin",
  },
  {
    id: 995,
    name: "Gravitech",
  },
  {
    id: 2273,
    name: "Grayhill Inc.",
  },
  {
    id: 1894,
    name: "Greenconn",
  },
  {
    id: 2124,
    name: "Greenlee Communications",
  },
  {
    id: 2844,
    name: "Greenliant",
  },
  {
    id: 13751,
    name: "Greenwich Instruments",
  },
  {
    id: 2945,
    name: "Gremco",
  },
  {
    id: 14621,
    name: "gridComm",
  },
  {
    id: 14631,
    name: "Grinn",
  },
  {
    id: 14067,
    name: "Gripple",
  },
  {
    id: 2220,
    name: "GSI Technology Inc.",
  },
  {
    id: 2470,
    name: "GSPK Circuits",
  },
  {
    id: 2693,
    name: "GT Line",
  },
  {
    id: 20212,
    name: "guardian electric manufacturing",
  },
  {
    id: 3371,
    name: "Guardmaster",
  },
  {
    id: 9122,
    name: "Guerrilla RF",
  },
  {
    id: 13837,
    name: "Guitel Hervieu",
  },
  {
    id: 2642,
    name: "Gumstix",
  },
  {
    id: 2109,
    name: "Gustav Klauke",
  },
  {
    id: 1789,
    name: "GW Instek",
  },
  {
    id: 15206,
    name: "Hager Powertech",
  },
  {
    id: 2477,
    name: "Hahn-Elektrobau",
  },
  {
    id: 14233,
    name: "Hairtite",
  },
  {
    id: 2304,
    name: "HALO Electronics",
  },
  {
    id: 2330,
    name: "Hama",
  },
  {
    id: 5452,
    name: "HAMAMATSU",
  },
  {
    id: 2992,
    name: "Hamlin",
  },
  {
    id: 1471,
    name: "Hammond Manufacturing",
  },
  {
    id: 14979,
    name: "Hanmere Polythene",
  },
  {
    id: 2655,
    name: "Hanna Instruments",
  },
  {
    id: 7875,
    name: "HANRUN",
  },
  {
    id: 19935,
    name: "harmony electronics corp / h.ele.",
  },
  {
    id: 1342,
    name: "Harris",
  },
  {
    id: 16281,
    name: "Harris Semiconductor",
  },
  {
    id: 3233,
    name: "Harting",
  },
  {
    id: 13587,
    name: "HARTING Elektronik",
  },
  {
    id: 3435,
    name: "Hartmann",
  },
  {
    id: 20040,
    name: "Hartmann Electronic",
  },
  {
    id: 1606,
    name: "Harvard Engineering",
  },
  {
    id: 3309,
    name: "Harvatek",
  },
  {
    id: 19661,
    name: "Harvatek Corp",
  },
  {
    id: 2060,
    name: "Harwin Inc.",
  },
  {
    id: 16757,
    name: "Harwin Plc",
  },
  {
    id: 3471,
    name: "Hatch Lighting",
  },
  {
    id: 3544,
    name: "HDP Power",
  },
  {
    id: 13993,
    name: "Heckel",
  },
  {
    id: 14107,
    name: "Heico",
  },
  {
    id: 13496,
    name: "Heinemann / Eaton",
  },
  {
    id: 1929,
    name: "Hellermann Tyton",
  },
  {
    id: 13829,
    name: "Helly Hansen",
  },
  {
    id: 14791,
    name: "Helukabel",
  },
  {
    id: 2327,
    name: "Hengstler",
  },
  {
    id: 17695,
    name: "HENLV POWER",
  },
  {
    id: 20228,
    name: "Hensel Electric",
  },
  {
    id: 4013,
    name: "HERAEUS",
  },
  {
    id: 2638,
    name: "Heraeus Nexensos",
  },
  {
    id: 13747,
    name: "Herga",
  },
  {
    id: 14447,
    name: "Hew Heinz Eilentropp",
  },
  {
    id: 2310,
    name: "Hewlett Packard Enterprise",
  },
  {
    id: 14650,
    name: "HexArmor",
  },
  {
    id: 1584,
    name: "Heyco",
  },
  {
    id: 13588,
    name: "HGSEMI",
  },
  {
    id: 13831,
    name: "Hi-Bond",
  },
  {
    id: 1353,
    name: "HiFiBerry",
  },
  {
    id: 2653,
    name: "Higgstec",
  },
  {
    id: 22080,
    name: "High Top Pro Connectors",
  },
  {
    id: 14147,
    name: "HI-GRIP",
  },
  {
    id: 14986,
    name: "Hill Brush",
  },
  {
    id: 13781,
    name: "Hinode Electric Co Ltd",
  },
  {
    id: 2592,
    name: "Hioki",
  },
  {
    id: 10684,
    name: "Hiquel",
  },
  {
    id: 1979,
    name: "Hirose Electric Co Ltd",
  },
  {
    id: 13456,
    name: "Hirose Electric UK Ltd",
  },
  {
    id: 2275,
    name: "Hirschmann",
  },
  {
    id: 5445,
    name: "HISENSE",
  },
  {
    id: 1691,
    name: "Hitachi",
  },
  {
    id: 14190,
    name: "HI-TORQUE",
  },
  {
    id: 10853,
    name: "Hittite Microwave Corp.",
  },
  {
    id: 2012,
    name: "HKC",
  },
  {
    id: 15457,
    name: "HMS Industrial Networks",
  },
  {
    id: 1933,
    name: "HN Electronic",
  },
  {
    id: 10679,
    name: "HOBUT",
  },
  {
    id: 3539,
    name: "Hofbauer",
  },
  {
    id: 13570,
    name: "Hoffman",
  },
  {
    id: 16853,
    name: "Hoffman Enclosures",
  },
  {
    id: 1856,
    name: "Hoffman Enclosures - nVent",
  },
  {
    id: 7170,
    name: "HOKURIKU",
  },
  {
    id: 3550,
    name: "Holitech",
  },
  {
    id: 22196,
    name: "Holland Electronics Llc",
  },
  {
    id: 2424,
    name: "Hologram",
  },
  {
    id: 14856,
    name: "Holo-Krome",
  },
  {
    id: 3063,
    name: "Holtek",
  },
  {
    id: 19944,
    name: "Holtek Semiconductor",
  },
  {
    id: 10805,
    name: "HOLT INTEGRATED CIRCUITS",
  },
  {
    id: 16725,
    name: "holy stone enterprise co., ltd.",
  },
  {
    id: 818,
    name: "Honeywell",
  },
  {
    id: 10513,
    name: "Honeywell / Clarostat",
  },
  {
    id: 2461,
    name: "Honeywell / Hobbs",
  },
  {
    id: 13437,
    name: "Honeywell / Microswitch",
  },
  {
    id: 1529,
    name: "Hongfa",
  },
  {
    id: 3258,
    name: "Hongkong",
  },
  {
    id: 14327,
    name: "Hong Kong Xtal",
  },
  {
    id: 3333,
    name: "Honor",
  },
  {
    id: 3499,
    name: "Hoperf",
  },
  {
    id: 14798,
    name: "Horstmann",
  },
  {
    id: 14633,
    name: "Hosiden Besson",
  },
  {
    id: 20005,
    name: "hosonic electronic co., ltd",
  },
  {
    id: 3146,
    name: "Housheng Electronic Industry Co Ltd",
  },
  {
    id: 13841,
    name: "Hoyles",
  },
  {
    id: 1520,
    name: "HP Development Company LP",
  },
  {
    id: 15176,
    name: "Hsuan Mao Technology",
  },
  {
    id: 3750,
    name: "HTC",
  },
  {
    id: 2140,
    name: "HTV Conservation",
  },
  {
    id: 11005,
    name: "Huawei",
  },
  {
    id: 2944,
    name: "Hubbell",
  },
  {
    id: 2189,
    name: "Huber+Suhner",
  },
  {
    id: 18536,
    name: "huber+suhner, inc.",
  },
  {
    id: 2718,
    name: "Huco",
  },
  {
    id: 20854,
    name: "hugo brennenstuhl",
  },
  {
    id: 1722,
    name: "Hummel",
  },
  {
    id: 20593,
    name: "Hurst Motors",
  },
  {
    id: 13979,
    name: "Hutchinson",
  },
  {
    id: 13798,
    name: "Hutchinson Le Joint Français",
  },
  {
    id: 14776,
    name: "HydraForce",
  },
  {
    id: 13757,
    name: "Hydrotechnik",
  },
  {
    id: 2599,
    name: "Hylec",
  },
  {
    id: 3260,
    name: "Hynix",
  },
  {
    id: 9962,
    name: "HYNIX SEMICONDUCTOR",
  },
  {
    id: 3102,
    name: "Hyper",
  },
  {
    id: 1530,
    name: "Hyundai LCD",
  },
  {
    id: 10610,
    name: "i-Autoc",
  },
  {
    id: 1565,
    name: "iBase",
  },
  {
    id: 5059,
    name: "IBM",
  },
  {
    id: 6885,
    name: "ICC",
  },
  {
    id: 13920,
    name: "ICEL",
  },
  {
    id: 8376,
    name: "IC-HAUS",
  },
  {
    id: 13435,
    name: "ICL",
  },
  {
    id: 2616,
    name: "Ico-Rally",
  },
  {
    id: 15194,
    name: "icotek",
  },
  {
    id: 14146,
    name: "ICP DAS USA",
  },
  {
    id: 3397,
    name: "IDEAL",
  },
  {
    id: 10672,
    name: "Ideal Industries",
  },
  {
    id: 3492,
    name: "Ideal Power Ltd.",
  },
  {
    id: 1726,
    name: "Ideal-Tek",
  },
  {
    id: 16179,
    name: "ideal-tek s.a.",
  },
  {
    id: 1482,
    name: "Idec",
  },
  {
    id: 16857,
    name: "IDEC Corporation",
  },
  {
    id: 13956,
    name: "IDEM",
  },
  {
    id: 1934,
    name: "IDI",
  },
  {
    id: 4015,
    name: "IDTRONIC",
  },
  {
    id: 14242,
    name: "I E E",
  },
  {
    id: 14430,
    name: "I.E.E.",
  },
  {
    id: 20858,
    name: "iei technology",
  },
  {
    id: 2143,
    name: "IEI Technology Corporation",
  },
  {
    id: 14057,
    name: "IET",
  },
  {
    id: 3449,
    name: "IET Labs",
  },
  {
    id: 2629,
    name: "IFM Efector inc",
  },
  {
    id: 13716,
    name: "ifm electronic",
  },
  {
    id: 14802,
    name: "IFO Electric",
  },
  {
    id: 19634,
    name: "Igenix",
  },
  {
    id: 2769,
    name: "Ignion",
  },
  {
    id: 10589,
    name: "Igus",
  },
  {
    id: 3389,
    name: "II-VI / Finisar",
  },
  {
    id: 14079,
    name: "IKON",
  },
  {
    id: 13966,
    name: "IKO Nippon Thompson",
  },
  {
    id: 2139,
    name: "IKOR Sistemas Electronicos",
  },
  {
    id: 3415,
    name: "Ilme",
  },
  {
    id: 11617,
    name: "ILSI",
  },
  {
    id: 2724,
    name: "Ilsi America",
  },
  {
    id: 2527,
    name: "Imatronic",
  },
  {
    id: 10658,
    name: "IMI Norgren",
  },
  {
    id: 14051,
    name: "IMO",
  },
  {
    id: 2694,
    name: "IMO Precision Controls",
  },
  {
    id: 5646,
    name: "IMS",
  },
  {
    id: 10620,
    name: "INA",
  },
  {
    id: 3261,
    name: "Inchange Semiconductor Company (ISC)",
  },
  {
    id: 19822,
    name: "Industrial Fiber Optics",
  },
  {
    id: 14413,
    name: "Industrial Scientific",
  },
  {
    id: 2159,
    name: "Industrial Shields",
  },
  {
    id: 2414,
    name: "Industruino",
  },
  {
    id: 19632,
    name: "Infapower",
  },
  {
    id: 665,
    name: "Infineon Technologies",
  },
  {
    id: 2317,
    name: "Infineon Technologies (Cypress Semiconductor)",
  },
  {
    id: 2926,
    name: "Injoinic Technology",
  },
  {
    id: 3351,
    name: "Innocom Mobile Technology",
  },
  {
    id: 8419,
    name: "Innodisk",
  },
  {
    id: 13434,
    name: "Inno Tape",
  },
  {
    id: 3034,
    name: "Innovasic",
  },
  {
    id: 1450,
    name: "Inolux",
  },
  {
    id: 15507,
    name: "INOVA SEMICONDUCTORS",
  },
  {
    id: 7439,
    name: "INPHI",
  },
  {
    id: 2238,
    name: "iNRCORE LLC",
  },
  {
    id: 4018,
    name: "Insight SiP",
  },
  {
    id: 4019,
    name: "Insignis Technology Corporation",
  },
  {
    id: 2451,
    name: "Inspired LED",
  },
  {
    id: 15455,
    name: "Instek",
  },
  {
    id: 21229,
    name: "Instrument Transformer",
  },
  {
    id: 1935,
    name: "Insung Metal Co LTD",
  },
  {
    id: 3507,
    name: "Integral",
  },
  {
    id: 14114,
    name: "Integral Memory",
  },
  {
    id: 1318,
    name: "Integrated Device Technology",
  },
  {
    id: 2814,
    name: "Integrated Device Technology Inc",
  },
  {
    id: 2329,
    name: "Integrated Silicon Solution (ISSI)",
  },
  {
    id: 3392,
    name: "Integrity",
  },
  {
    id: 2735,
    name: "Intel Corporation",
  },
  {
    id: 14276,
    name: "Intelligent Display Solutions",
  },
  {
    id: 14624,
    name: "Intelligent Horticultural Solutions",
  },
  {
    id: 2450,
    name: "Intelligent LED Solutions",
  },
  {
    id: 2173,
    name: "Interconnect Systems International",
  },
  {
    id: 14668,
    name: "Interface Connectors",
  },
  {
    id: 1931,
    name: "Interlink Electronics",
  },
  {
    id: 2909,
    name: "INTERNATIONAL RECTIFIER",
  },
  {
    id: 14330,
    name: "International Resistive",
  },
  {
    id: 20849,
    name: "Interquip Electronics",
  },
  {
    id: 10674,
    name: "Interroll",
  },
  {
    id: 2138,
    name: "Intosert",
  },
  {
    id: 1886,
    name: "InvenSense Inc",
  },
  {
    id: 2422,
    name: "Inventek",
  },
  {
    id: 2852,
    name: "Inventronics",
  },
  {
    id: 17947,
    name: "Io Audio Technologies",
  },
  {
    id: 5468,
    name: "I-PEX",
  },
  {
    id: 1822,
    name: "IQD Frequency Products",
  },
  {
    id: 14612,
    name: "IQRF Tech",
  },
  {
    id: 7975,
    name: "IRISO",
  },
  {
    id: 20085,
    name: "iriso usa inc.",
  },
  {
    id: 2494,
    name: "Iroda",
  },
  {
    id: 14482,
    name: "IR Security And Safety",
  },
  {
    id: 20213,
    name: "Irwin Tools",
  },
  {
    id: 20647,
    name: "isabellenhuette usa",
  },
  {
    id: 6127,
    name: "ISABELLENHUTTE",
  },
  {
    id: 3497,
    name: "Iskra",
  },
  {
    id: 1871,
    name: "Isocom",
  },
  {
    id: 2621,
    name: "IST (Innovative Sensor Technology)",
  },
  {
    id: 14693,
    name: "iStorage",
  },
  {
    id: 13774,
    name: "Italtronic",
  },
  {
    id: 13433,
    name: "ITT / Cannon",
  },
  {
    id: 16131,
    name: "ITT Corporation",
  },
  {
    id: 9348,
    name: "ITTI Company Limited",
  },
  {
    id: 9920,
    name: "ITW",
  },
  {
    id: 3201,
    name: "ITW PANCON",
  },
  {
    id: 2312,
    name: "ITW Switches",
  },
  {
    id: 2657,
    name: "IVATIV",
  },
  {
    id: 3945,
    name: "IWATT",
  },
  {
    id: 2017,
    name: "iWave Systems Technologies",
  },
  {
    id: 1580,
    name: "IXYS",
  },
  {
    id: 3504,
    name: "IXYS Integrated Circuits Division",
  },
  {
    id: 399,
    name: "Jabra",
  },
  {
    id: 3347,
    name: "Jacob",
  },
  {
    id: 1604,
    name: "JAE Electronics",
  },
  {
    id: 3518,
    name: "JAEGER",
  },
  {
    id: 1863,
    name: "JAMICON",
  },
  {
    id: 16852,
    name: "Japan Aviation Electronics",
  },
  {
    id: 2741,
    name: "Japan Aviation Electronics Industry",
  },
  {
    id: 13968,
    name: "Japan Finechem Company",
  },
  {
    id: 1483,
    name: "Japan Solderless Terminals",
  },
  {
    id: 21559,
    name: "Jaro Components",
  },
  {
    id: 8346,
    name: "Jauch Quartz GmbH",
  },
  {
    id: 14755,
    name: "Jay Electronique",
  },
  {
    id: 2644,
    name: "JBC Tools",
  },
  {
    id: 13874,
    name: "JCS",
  },
  {
    id: 10617,
    name: "JCS Hi-Torque",
  },
  {
    id: 9616,
    name: "JENNIC",
  },
  {
    id: 8058,
    name: "JESTEK",
  },
  {
    id: 15444,
    name: "Jet",
  },
  {
    id: 13576,
    name: "J.H. Williams",
  },
  {
    id: 3130,
    name: "Jiangsu Changjing Technology Co Ltd",
  },
  {
    id: 3114,
    name: "Jiangsu Wenrun Optoelectronics Co Ltd",
  },
  {
    id: 2923,
    name: "Jinan LuJing Semiconductor Co Ltd",
  },
  {
    id: 1552,
    name: "JKL Components",
  },
  {
    id: 13963,
    name: "JM CONCEPT",
  },
  {
    id: 3326,
    name: "JMicron",
  },
  {
    id: 5323,
    name: "joHANSON",
  },
  {
    id: 2771,
    name: "Johanson Dielectrics Inc.",
  },
  {
    id: 17794,
    name: "Johanson Technology Distributor",
  },
  {
    id: 2180,
    name: "Johanson Technology Inc.",
  },
  {
    id: 14171,
    name: "John Drummond",
  },
  {
    id: 14019,
    name: "John Guest",
  },
  {
    id: 16951,
    name: "Johnson Components",
  },
  {
    id: 10581,
    name: "Johnson Electric",
  },
  {
    id: 20082,
    name: "Joint Tech Electronic Industrial",
  },
  {
    id: 13333,
    name: "Jonard Tools",
  },
  {
    id: 3252,
    name: "Jones Tech",
  },
  {
    id: 6582,
    name: "JORJIN",
  },
  {
    id: 10989,
    name: "Jorjin Technologies",
  },
  {
    id: 2765,
    name: "Joyin",
  },
  {
    id: 1347,
    name: "JRC",
  },
  {
    id: 3766,
    name: "JSP",
  },
  {
    id: 3646,
    name: "JST Automotive",
  },
  {
    id: 3495,
    name: "Jubilee",
  },
  {
    id: 10555,
    name: "Jumo",
  },
  {
    id: 20226,
    name: "justboom",
  },
  {
    id: 14076,
    name: "Kaba",
  },
  {
    id: 14285,
    name: "KAC",
  },
  {
    id: 14126,
    name: "Kahnetics",
  },
  {
    id: 1903,
    name: "Kaimei Electronic Corp.",
  },
  {
    id: 19522,
    name: "Kamaya Electric Co",
  },
  {
    id: 3536,
    name: "Kamaya Inc.",
  },
  {
    id: 14192,
    name: "Kane",
  },
  {
    id: 13744,
    name: "Karcher",
  },
  {
    id: 2396,
    name: "Ka-Ro electronics",
  },
  {
    id: 13780,
    name: "KA Schmersal",
  },
  {
    id: 20830,
    name: "Kasp Security",
  },
  {
    id: 2087,
    name: "KAT Mekatronik",
  },
  {
    id: 2082,
    name: "Kavlico",
  },
  {
    id: 15161,
    name: "Kawasaki Electric Wire",
  },
  {
    id: 3158,
    name: "KEC",
  },
  {
    id: 14660,
    name: "Keenserts",
  },
  {
    id: 1409,
    name: "Keil",
  },
  {
    id: 1377,
    name: "Keithley Instruments Inc.",
  },
  {
    id: 13714,
    name: "KEL Corporation",
  },
  {
    id: 3269,
    name: "KEMET Corporation",
  },
  {
    id: 13686,
    name: "Kennametal",
  },
  {
    id: 3401,
    name: "Kern",
  },
  {
    id: 14661,
    name: "Kert",
  },
  {
    id: 2122,
    name: "Kester Solder",
  },
  {
    id: 2577,
    name: "Keterex",
  },
  {
    id: 10624,
    name: "Key Instruments",
  },
  {
    id: 2464,
    name: "Keysight Technologies",
  },
  {
    id: 1594,
    name: "Keystone Bolt",
  },
  {
    id: 397,
    name: "Keystone Electronics",
  },
  {
    id: 1995,
    name: "Kilo International",
  },
  {
    id: 2447,
    name: "Kinetic Technologies",
  },
  {
    id: 2009,
    name: "Kingbright Electronic",
  },
  {
    id: 13582,
    name: "Kings Electronics",
  },
  {
    id: 1926,
    name: "Kingstate",
  },
  {
    id: 20027,
    name: "Kingstate Electronics Corporation",
  },
  {
    id: 5338,
    name: "KINGSTON",
  },
  {
    id: 15163,
    name: "Kingston Brass",
  },
  {
    id: 2853,
    name: "Kingston Digital Europe",
  },
  {
    id: 2854,
    name: "Kingston Technology",
  },
  {
    id: 22518,
    name: "kingtek industrial",
  },
  {
    id: 2698,
    name: "Kionix Inc.",
  },
  {
    id: 2347,
    name: "Kioxia",
  },
  {
    id: 2348,
    name: "Kioxia America Inc",
  },
  {
    id: 4020,
    name: "KIOXIA Europe GmbH",
  },
  {
    id: 4021,
    name: "Kitagawa-NorthTech",
  },
  {
    id: 2254,
    name: "Kitronik Ltd.",
  },
  {
    id: 14117,
    name: "Kittenbot",
  },
  {
    id: 14419,
    name: "KKSB",
  },
  {
    id: 2504,
    name: "Klaxon",
  },
  {
    id: 2395,
    name: "Klein Tools Inc",
  },
  {
    id: 14145,
    name: "Klinger",
  },
  {
    id: 543,
    name: "Knipex",
  },
  {
    id: 1814,
    name: "Knitter-Switch",
  },
  {
    id: 1503,
    name: "Knowles",
  },
  {
    id: 10435,
    name: "KNOWLES ACOUSTICS",
  },
  {
    id: 2288,
    name: "Knowles Dielectric Labs",
  },
  {
    id: 16140,
    name: "Knowles Electronics, LLC",
  },
  {
    id: 2787,
    name: "Knowles Novacap",
  },
  {
    id: 2072,
    name: "Knowles Syfer",
  },
  {
    id: 2030,
    name: "Knowles Voltronics",
  },
  {
    id: 2300,
    name: "KOA",
  },
  {
    id: 2597,
    name: "KOA Europe GmbH",
  },
  {
    id: 2596,
    name: "KOA Speer Electronics Inc",
  },
  {
    id: 2100,
    name: "Kobiconn",
  },
  {
    id: 2676,
    name: "Kodenshi",
  },
  {
    id: 3426,
    name: "KOE Europe",
  },
  {
    id: 2715,
    name: "Kontakt Chemie",
  },
  {
    id: 9418,
    name: "Kontek",
  },
  {
    id: 1907,
    name: "Kontron",
  },
  {
    id: 10562,
    name: "Kopex",
  },
  {
    id: 14463,
    name: "Kopex-EX",
  },
  {
    id: 13827,
    name: "Kopp",
  },
  {
    id: 4022,
    name: "KORCHIP",
  },
  {
    id: 2137,
    name: "Kostal",
  },
  {
    id: 14176,
    name: "KRAMER ELECTRONICS",
  },
  {
    id: 10557,
    name: "Kraus & Naimer",
  },
  {
    id: 14280,
    name: "Krone",
  },
  {
    id: 20095,
    name: "kss wiring",
  },
  {
    id: 3268,
    name: "K.S.Terminals",
  },
  {
    id: 14210,
    name: "KTR",
  },
  {
    id: 10534,
    name: "Kübler",
  },
  {
    id: 1459,
    name: "Kuebler",
  },
  {
    id: 10602,
    name: "Kunbus",
  },
  {
    id: 13807,
    name: "Kustom Kit",
  },
  {
    id: 14517,
    name: "KUTLASS",
  },
  {
    id: 1367,
    name: "Kvaser",
  },
  {
    id: 3533,
    name: "Kycon Inc",
  },
  {
    id: 3821,
    name: "Kyocera AVX",
  },
  {
    id: 2746,
    name: "Kyocera International",
  },
  {
    id: 2581,
    name: "L3 Narda-MITEQ",
  },
  {
    id: 1157,
    name: "Labfacility",
  },
  {
    id: 2003,
    name: "Laird Connectivity Inc.",
  },
  {
    id: 1616,
    name: "Laird Performance Materials",
  },
  {
    id: 7099,
    name: "Laird technologies",
  },
  {
    id: 2145,
    name: "Laird Technologies",
  },
  {
    id: 2107,
    name: "Laird Thermal Systems Inc",
  },
  {
    id: 14198,
    name: "Landzo",
  },
  {
    id: 17662,
    name: "Lansdale Semiconductor",
  },
  {
    id: 2321,
    name: "Lantiq",
  },
  {
    id: 1768,
    name: "Lantronix",
  },
  {
    id: 18422,
    name: "Lantronix International",
  },
  {
    id: 10936,
    name: "LAPIS Semiconductor",
  },
  {
    id: 10686,
    name: "Lapp",
  },
  {
    id: 13601,
    name: "Lapp Group",
  },
  {
    id: 2455,
    name: "LAPP USA",
  },
  {
    id: 2000,
    name: "Lascar Electronics",
  },
  {
    id: 2790,
    name: "Laser Components",
  },
  {
    id: 2182,
    name: "Lattice Semiconductor Corporation",
  },
  {
    id: 14423,
    name: "Lawson Fuses",
  },
  {
    id: 1762,
    name: "L-com",
  },
  {
    id: 2672,
    name: "LCR Components",
  },
  {
    id: 19317,
    name: "Leader Tech",
  },
  {
    id: 2175,
    name: "Leader Tech",
  },
  {
    id: 20119,
    name: "Leadtek Research",
  },
  {
    id: 3527,
    name: "Leap Electronic",
  },
  {
    id: 20208,
    name: "Leaptronix",
  },
  {
    id: 10538,
    name: "Leatherman",
  },
  {
    id: 14669,
    name: "Lebon Protection",
  },
  {
    id: 4127,
    name: "LED Engin",
  },
  {
    id: 2186,
    name: "Ledex",
  },
  {
    id: 932,
    name: "LEDiL",
  },
  {
    id: 16738,
    name: "LedLink Optics",
  },
  {
    id: 15188,
    name: "Ledman Optoelectronic",
  },
  {
    id: 2678,
    name: "LED Technology",
  },
  {
    id: 2234,
    name: "LEDVANCE",
  },
  {
    id: 13752,
    name: "Legamaster",
  },
  {
    id: 4947,
    name: "LEGERITY",
  },
  {
    id: 14100,
    name: "Legge",
  },
  {
    id: 1821,
    name: "Legrand Pass & Seymour",
  },
  {
    id: 2669,
    name: "Legris",
  },
  {
    id: 13919,
    name: "Leitz",
  },
  {
    id: 1643,
    name: "Lelon",
  },
  {
    id: 19320,
    name: "Lelon Electronics Corp",
  },
  {
    id: 1870,
    name: "LEM",
  },
  {
    id: 1156,
    name: "LEMO",
  },
  {
    id: 13951,
    name: "Lenze",
  },
  {
    id: 931,
    name: "Leopard Imaging",
  },
  {
    id: 2637,
    name: "Lepu",
  },
  {
    id: 15155,
    name: "Lepu Medical",
  },
  {
    id: 13524,
    name: "Leshan Radio Co.",
  },
  {
    id: 2384,
    name: "Leshan Radio Company",
  },
  {
    id: 11747,
    name: "LEVEL ONE",
  },
  {
    id: 20206,
    name: "Lexar Media",
  },
  {
    id: 4024,
    name: "Lextar Electronics",
  },
  {
    id: 3132,
    name: "Leyconn",
  },
  {
    id: 17369,
    name: "LEYCONN",
  },
  {
    id: 13672,
    name: "LG Electronics",
  },
  {
    id: 3552,
    name: "Libelium Comunicaciones Disribuidas",
  },
  {
    id: 2855,
    name: "Lifud",
  },
  {
    id: 2550,
    name: "Lightcraft",
  },
  {
    id: 10893,
    name: "Lime Microsystems",
  },
  {
    id: 3491,
    name: "Lindstrom",
  },
  {
    id: 1902,
    name: "Lineage Power",
  },
  {
    id: 3402,
    name: "Linear Tools",
  },
  {
    id: 14449,
    name: "Linemaster",
  },
  {
    id: 4142,
    name: "LINFINITY",
  },
  {
    id: 14475,
    name: "Linpac Storage Systems",
  },
  {
    id: 2001,
    name: "Linx Technologies Inc.",
  },
  {
    id: 1757,
    name: "LISI Group",
  },
  {
    id: 2223,
    name: "Lite-On Inc.",
  },
  {
    id: 16154,
    name: "Lite-On Semiconductor",
  },
  {
    id: 1990,
    name: "Littelfuse Inc",
  },
  {
    id: 13983,
    name: "LK",
  },
  {
    id: 2191,
    name: "LMB / Heeger",
  },
  {
    id: 3537,
    name: "LMS DATA",
  },
  {
    id: 1834,
    name: "LM Technologies",
  },
  {
    id: 3543,
    name: "LoadSlammer",
  },
  {
    id: 2576,
    name: "Loctite",
  },
  {
    id: 2063,
    name: "Logic Product Development",
  },
  {
    id: 3377,
    name: "Logitech",
  },
  {
    id: 3564,
    name: "LORD MicroStrain",
  },
  {
    id: 2573,
    name: "Lorlin",
  },
  {
    id: 17556,
    name: "LOUDITY",
  },
  {
    id: 10587,
    name: "Lovato",
  },
  {
    id: 16953,
    name: "Lovato Electric",
  },
  {
    id: 5385,
    name: "LOWPOWER",
  },
  {
    id: 2730,
    name: "LPRS",
  },
  {
    id: 4463,
    name: "LSI",
  },
  {
    id: 3410,
    name: "LS Research",
  },
  {
    id: 1687,
    name: "Lucent",
  },
  {
    id: 10913,
    name: "Lucky Light",
  },
  {
    id: 1533,
    name: "Lucky Light Elec Co Ltd",
  },
  {
    id: 22477,
    name: "luckylight electronics",
  },
  {
    id: 14105,
    name: "Lufkin",
  },
  {
    id: 2381,
    name: "Luguang Electronic",
  },
  {
    id: 3345,
    name: "LULZBOT",
  },
  {
    id: 1744,
    name: "Lumberg Automation",
  },
  {
    id: 1484,
    name: "Lumberg Automation / Hirschmann",
  },
  {
    id: 1297,
    name: "Lumex",
  },
  {
    id: 17739,
    name: "Lumex Optoelectronics",
  },
  {
    id: 2058,
    name: "Lumileds",
  },
  {
    id: 19769,
    name: "Luminary Micro",
  },
  {
    id: 2784,
    name: "Luminus Devices Inc.",
  },
  {
    id: 2208,
    name: "Lumissil Microsystems",
  },
  {
    id: 13830,
    name: "Lumotech",
  },
  {
    id: 2128,
    name: "Lutronic Holding",
  },
  {
    id: 2127,
    name: "LUX",
  },
  {
    id: 3408,
    name: "LUXEON",
  },
  {
    id: 14283,
    name: "Luxo",
  },
  {
    id: 4152,
    name: "LYONTEK",
  },
  {
    id: 4117,
    name: "M5Stack",
  },
  {
    id: 16924,
    name: "m5stack technology co., ltd.",
  },
  {
    id: 2043,
    name: "MACOM Technology Solutions",
  },
  {
    id: 10661,
    name: "MACOR",
  },
  {
    id: 1878,
    name: "Macronix International",
  },
  {
    id: 3075,
    name: "Mag Layers",
  },
  {
    id: 20184,
    name: "Maglite",
  },
  {
    id: 15005,
    name: "MagnaChip Semiconductor",
  },
  {
    id: 17727,
    name: "Magnecraft Corporation",
  },
  {
    id: 18700,
    name: "Majestic Glove",
  },
  {
    id: 3573,
    name: "Major League Electronics",
  },
  {
    id: 2179,
    name: "Makeblock Co LTD",
  },
  {
    id: 13961,
    name: "makeON",
  },
  {
    id: 14666,
    name: "MakerBot",
  },
  {
    id: 2625,
    name: "MakerGear",
  },
  {
    id: 2803,
    name: "Makita",
  },
  {
    id: 2652,
    name: "Malico",
  },
  {
    id: 2211,
    name: "Mallory Sonalert Products Inc.",
  },
  {
    id: 20000,
    name: "maple systems inc",
  },
  {
    id: 15184,
    name: "Marinco",
  },
  {
    id: 8303,
    name: "Marktech Optoelectronics",
  },
  {
    id: 2360,
    name: "Marl",
  },
  {
    id: 19493,
    name: "Marlow Industries",
  },
  {
    id: 2489,
    name: "Marquardt Switches",
  },
  {
    id: 2539,
    name: "Marschner",
  },
  {
    id: 13856,
    name: "Martindale",
  },
  {
    id: 2250,
    name: "Marvell Semiconductor Inc",
  },
  {
    id: 13861,
    name: "Masach Tech",
  },
  {
    id: 3445,
    name: "Masach Tech Ltd.",
  },
  {
    id: 1891,
    name: "Mascot",
  },
  {
    id: 13822,
    name: "Mascot Workwear",
  },
  {
    id: 3106,
    name: "Master Appliance",
  },
  {
    id: 3627,
    name: "MASTER LOCK",
  },
  {
    id: 2445,
    name: "Maszczyk",
  },
  {
    id: 14268,
    name: "Matrix International",
  },
  {
    id: 2697,
    name: "Matrix Labs",
  },
  {
    id: 2146,
    name: "Matrix Orbital",
  },
  {
    id: 14112,
    name: "Matrix Technology Solutions",
  },
  {
    id: 20250,
    name: "matsuo electric co., ltd",
  },
  {
    id: 19768,
    name: "maxbotix inc.",
  },
  {
    id: 1904,
    name: "Maxic",
  },
  {
    id: 2931,
    name: "Maxim / Dallas",
  },
  {
    id: 10804,
    name: "Maxim Integrated Company",
  },
  {
    id: 1201,
    name: "Maxim Integrated Products",
  },
  {
    id: 2343,
    name: "MaxLinear Inc",
  },
  {
    id: 13763,
    name: "Maxon",
  },
  {
    id: 15201,
    name: "Maxon Motors",
  },
  {
    id: 3500,
    name: "Maxtena",
  },
  {
    id: 20865,
    name: "maxtena inc",
  },
  {
    id: 3448,
    name: "MAX Waterproof Cases",
  },
  {
    id: 2717,
    name: "Maxwell",
  },
  {
    id: 14687,
    name: "Mayku",
  },
  {
    id: 14869,
    name: "mbed",
  },
  {
    id: 4265,
    name: "MBI",
  },
  {
    id: 14759,
    name: "MCGILL MICROWAVE SYSTEMS LTD",
  },
  {
    id: 2265,
    name: "McLennan",
  },
  {
    id: 10666,
    name: "McLennan Servo Supplies",
  },
  {
    id: 2757,
    name: "MCM Audio Select",
  },
  {
    id: 14438,
    name: "Mcmurdo",
  },
  {
    id: 1959,
    name: "mCube",
  },
  {
    id: 3012,
    name: "MDD",
  },
  {
    id: 4378,
    name: "MDT",
  },
  {
    id: 1316,
    name: "Mean Well",
  },
  {
    id: 16819,
    name: "Mean Well Enterprises",
  },
  {
    id: 1360,
    name: "Measurement Specialties",
  },
  {
    id: 13897,
    name: "Mecalectro",
  },
  {
    id: 17754,
    name: "Mechatronics",
  },
  {
    id: 2858,
    name: "Mechatronix",
  },
  {
    id: 14189,
    name: "Mechetronics",
  },
  {
    id: 3470,
    name: "MEC Marcom",
  },
  {
    id: 19780,
    name: "MEC Marcom Electronic Components",
  },
  {
    id: 3451,
    name: "MEC Switches",
  },
  {
    id: 2857,
    name: "MediaTek",
  },
  {
    id: 13989,
    name: "Meech",
  },
  {
    id: 14912,
    name: "Megaman",
  },
  {
    id: 4471,
    name: "MEGAWIN",
  },
  {
    id: 3566,
    name: "Megger",
  },
  {
    id: 20068,
    name: "Meilhaus Electronic GmbH",
  },
  {
    id: 14025,
    name: "MeLE Technologies Ltd",
  },
  {
    id: 2264,
    name: "Melexis Technologies NV",
  },
  {
    id: 14261,
    name: "Mellor Electric",
  },
  {
    id: 13568,
    name: "Memory Protection Devices",
  },
  {
    id: 2098,
    name: "Memsic",
  },
  {
    id: 2525,
    name: "Menda",
  },
  {
    id: 10536,
    name: "MENNEKES",
  },
  {
    id: 2253,
    name: "Mentor GmbH & Co",
  },
  {
    id: 19789,
    name: "Mercury Electronics",
  },
  {
    id: 15336,
    name: "Mercury Systems",
  },
  {
    id: 2823,
    name: "Merit Automotive Electronics Systems",
  },
  {
    id: 10585,
    name: "Merlett Plastics",
  },
  {
    id: 3188,
    name: "Merrimac",
  },
  {
    id: 10670,
    name: "Mersen",
  },
  {
    id: 14023,
    name: "Messagemaker Displays",
  },
  {
    id: 2663,
    name: "Metabo",
  },
  {
    id: 2144,
    name: "Metcal",
  },
  {
    id: 20878,
    name: "Metcase Enclosures Ltd",
  },
  {
    id: 3286,
    name: "Methode",
  },
  {
    id: 3529,
    name: "Metrinch",
  },
  {
    id: 3570,
    name: "Metrix",
  },
  {
    id: 2377,
    name: "Metrofunk Kabel-Union",
  },
  {
    id: 2505,
    name: "Metway Electrical Industries",
  },
  {
    id: 19367,
    name: "metz connect gmbh",
  },
  {
    id: 2078,
    name: "METZ CONNECT USA Inc.",
  },
  {
    id: 14474,
    name: "MG Chemical",
  },
  {
    id: 1625,
    name: "MG Chemicals",
  },
  {
    id: 3458,
    name: "MH Connectors",
  },
  {
    id: 3009,
    name: "MICREL",
  },
  {
    id: 2795,
    name: "Micro Care",
  },
  {
    id: 14922,
    name: "Microchip / SMSC",
  },
  {
    id: 1331,
    name: "Microchip / Supertex",
  },
  {
    id: 12277,
    name: "Microchip Technology / Atmel",
  },
  {
    id: 3231,
    name: "Microchip Technology Inc",
  },
  {
    id: 13455,
    name: "Microchip Technology / Micrel",
  },
  {
    id: 14920,
    name: "Microchip Technology / Microsemi Corporation",
  },
  {
    id: 14924,
    name: "Microchip Technology / Silicon Storage Technology",
  },
  {
    id: 1746,
    name: "Micro Commercial Components",
  },
  {
    id: 1346,
    name: "Micro Crystal",
  },
  {
    id: 14075,
    name: "Microgard",
  },
  {
    id: 15223,
    name: "Micro Linear",
  },
  {
    id: 14882,
    name: "Micro-Measurements",
  },
  {
    id: 3085,
    name: "Micrometals",
  },
  {
    id: 2688,
    name: "Micromotors",
  },
  {
    id: 3721,
    name: "MICRONAS",
  },
  {
    id: 4382,
    name: "Microne",
  },
  {
    id: 14203,
    name: "Micronel",
  },
  {
    id: 22839,
    name: "MICRON TECHNOLOGIES / NUMONYX / APTINA LLC",
  },
  {
    id: 2070,
    name: "Micron Technology Inc.",
  },
  {
    id: 14634,
    name: "Microscan",
  },
  {
    id: 2863,
    name: "Microsoft",
  },
  {
    id: 3661,
    name: "MICROSONIC",
  },
  {
    id: 13947,
    name: "microSYST",
  },
  {
    id: 14937,
    name: "Microtherm",
  },
  {
    id: 10494,
    name: "Microtips Technology",
  },
  {
    id: 2518,
    name: "Midas",
  },
  {
    id: 14690,
    name: "Midtronics",
  },
  {
    id: 10575,
    name: "MIKALOR",
  },
  {
    id: 1370,
    name: "MikroElektronika",
  },
  {
    id: 14441,
    name: "Miller",
  },
  {
    id: 2106,
    name: "Mill-Max Manufacturing Corp.",
  },
  {
    id: 16823,
    name: "Mill-Max Mfg",
  },
  {
    id: 15198,
    name: "Milwaukee Tool",
  },
  {
    id: 2466,
    name: "MIMO",
  },
  {
    id: 4025,
    name: "Mimo Monitors",
  },
  {
    id: 3042,
    name: "Mindspeed",
  },
  {
    id: 4026,
    name: "MINEW",
  },
  {
    id: 781,
    name: "Mini-Circuits",
  },
  {
    id: 14132,
    name: "Mini Motor",
  },
  {
    id: 1971,
    name: "MiniSun",
  },
  {
    id: 3192,
    name: "Mini-Systems",
  },
  {
    id: 20887,
    name: "Minwa Electronics",
  },
  {
    id: 2859,
    name: "Miromico",
  },
  {
    id: 13523,
    name: "Misc",
  },
  {
    id: 3121,
    name: "Mitel",
  },
  {
    id: 1510,
    name: "Mitsubishi Electric",
  },
  {
    id: 10930,
    name: "Mitsumi Electric",
  },
  {
    id: 17094,
    name: "Mitutoyo Corporation",
  },
  {
    id: 14774,
    name: "Mityvac",
  },
  {
    id: 2712,
    name: "M-Jay",
  },
  {
    id: 10606,
    name: "MK Electric",
  },
  {
    id: 3521,
    name: "MMC Kamaya",
  },
  {
    id: 3144,
    name: "MMD",
  },
  {
    id: 13854,
    name: "Mobilemark",
  },
  {
    id: 2673,
    name: "Modelcraft",
  },
  {
    id: 14779,
    name: "MODMYPI LTD",
  },
  {
    id: 3394,
    name: "MOD-TAP",
  },
  {
    id: 14008,
    name: "Modutec",
  },
  {
    id: 14151,
    name: "Moeller",
  },
  {
    id: 13497,
    name: "Moeller / Eaton",
  },
  {
    id: 3363,
    name: "Moflash Signalling",
  },
  {
    id: 2667,
    name: "Molex",
  },
  {
    id: 14531,
    name: "Molex / Brad",
  },
  {
    id: 1969,
    name: "Molex / FCT",
  },
  {
    id: 10594,
    name: "Molex Premise Networks",
  },
  {
    id: 13958,
    name: "Molveno",
  },
  {
    id: 2619,
    name: "Monacor",
  },
  {
    id: 14239,
    name: "Monitran",
  },
  {
    id: 13883,
    name: "Monk Makes",
  },
  {
    id: 2303,
    name: "Monnit",
  },
  {
    id: 1328,
    name: "Monolithic Power Systems (MPS)",
  },
  {
    id: 13957,
    name: "Monolux",
  },
  {
    id: 10931,
    name: "Mono Wireless",
  },
  {
    id: 2860,
    name: "Moons",
  },
  {
    id: 19483,
    name: "Morning Star Industrial",
  },
  {
    id: 2978,
    name: "Mornsun",
  },
  {
    id: 2951,
    name: "Mornsun",
  },
  {
    id: 2862,
    name: "Morpho Cards",
  },
  {
    id: 15162,
    name: "Motorcraft",
  },
  {
    id: 1345,
    name: "Motorola Solutions Inc",
  },
  {
    id: 21680,
    name: "motovario",
  },
  {
    id: 2090,
    name: "Mountain Switch",
  },
  {
    id: 9922,
    name: "MPE-GARRY",
  },
  {
    id: 19274,
    name: "MPE-Garry GmbH",
  },
  {
    id: 1875,
    name: "Mpression",
  },
  {
    id: 13962,
    name: "MSA Safety",
  },
  {
    id: 3712,
    name: "MSI",
  },
  {
    id: 1329,
    name: "MSP Kofel",
  },
  {
    id: 15020,
    name: "MStar Semiconductor Inc",
  },
  {
    id: 1118,
    name: "MSV",
  },
  {
    id: 3710,
    name: "M-System Co Ltd",
  },
  {
    id: 4631,
    name: "MTC",
  },
  {
    id: 4206,
    name: "MTK",
  },
  {
    id: 3080,
    name: "M-Tron",
  },
  {
    id: 1651,
    name: "MtronPTI",
  },
  {
    id: 1799,
    name: "Mueller Electric Company",
  },
  {
    id: 820,
    name: "Multicomp",
  },
  {
    id: 14005,
    name: "Multicore",
  },
  {
    id: 2737,
    name: "Multicore / Loctite",
  },
  {
    id: 2324,
    name: "Multimec",
  },
  {
    id: 2589,
    name: "Multimedia Solutions",
  },
  {
    id: 2560,
    name: "MultiTech",
  },
  {
    id: 16176,
    name: "multi-tech systems inc.",
  },
  {
    id: 3031,
    name: "Murata Electronics North America",
  },
  {
    id: 2914,
    name: "Murata Manufacturing Co Ltd",
  },
  {
    id: 2204,
    name: "Murata Power Solutions Inc.",
  },
  {
    id: 13918,
    name: "Murrelektronik Limited",
  },
  {
    id: 14173,
    name: "Muzelle Dulac",
  },
  {
    id: 8667,
    name: "MX Micro",
  },
  {
    id: 2416,
    name: "MYIR",
  },
  {
    id: 1862,
    name: "Myrra",
  },
  {
    id: 2059,
    name: "N2Power - Qualstar",
  },
  {
    id: 15469,
    name: "Nanaboshi",
  },
  {
    id: 20926,
    name: "nanahoshi kagaku",
  },
  {
    id: 2704,
    name: "Nanotec",
  },
  {
    id: 22186,
    name: "Nanotech Semiconductor",
  },
  {
    id: 4027,
    name: "NANYA",
  },
  {
    id: 19938,
    name: "Nanya Technology Corporation",
  },
  {
    id: 14905,
    name: "Nardi",
  },
  {
    id: 3562,
    name: "National Instruments",
  },
  {
    id: 1582,
    name: "National Semiconductor",
  },
  {
    id: 3282,
    name: "NAX",
  },
  {
    id: 3484,
    name: "NDK America Inc",
  },
  {
    id: 2623,
    name: "NEC / CEL",
  },
  {
    id: 3927,
    name: "NEC Corporation",
  },
  {
    id: 2534,
    name: "NEC Electronics",
  },
  {
    id: 20304,
    name: "Nemco Electronics Corporation",
  },
  {
    id: 13876,
    name: "NeoCortec",
  },
  {
    id: 3189,
    name: "Nes",
  },
  {
    id: 3975,
    name: "nesscap",
  },
  {
    id: 9958,
    name: "NETGEAR",
  },
  {
    id: 13936,
    name: "NEUTRAL",
  },
  {
    id: 1212,
    name: "Neutrik",
  },
  {
    id: 2391,
    name: "New Age Enclosures",
  },
  {
    id: 2565,
    name: "New Energy",
  },
  {
    id: 1952,
    name: "Newhaven Display",
  },
  {
    id: 14046,
    name: "NewLink",
  },
  {
    id: 3177,
    name: "NEX",
  },
  {
    id: 4028,
    name: "NEXANS",
  },
  {
    id: 2010,
    name: "Nexem",
  },
  {
    id: 1354,
    name: "Nexperia",
  },
  {
    id: 11194,
    name: "NEXPERIA/PHILIPS",
  },
  {
    id: 1610,
    name: "Nextchip",
  },
  {
    id: 2521,
    name: "NF Forward",
  },
  {
    id: 10346,
    name: "NI",
  },
  {
    id: 1881,
    name: "NIC Components",
  },
  {
    id: 16259,
    name: "NIC Components Corporation",
  },
  {
    id: 4709,
    name: "NICHIA",
  },
  {
    id: 20449,
    name: "Nichia Corporation",
  },
  {
    id: 3056,
    name: "Nichicon Corporation",
  },
  {
    id: 16267,
    name: "Nidec Copal Corporation",
  },
  {
    id: 2035,
    name: "Nidec Copal Electronics",
  },
  {
    id: 2037,
    name: "Nidec Seimitsu Corporation",
  },
  {
    id: 13720,
    name: "Niebuhr",
  },
  {
    id: 13877,
    name: "Nightsearcher",
  },
  {
    id: 19380,
    name: "Nihon Dempa Kogyo",
  },
  {
    id: 10932,
    name: "Nihon Dempa Kogyo (NDK)",
  },
  {
    id: 15022,
    name: "Niko Semicondutor Co Ltd",
  },
  {
    id: 3262,
    name: "Ningbo Gaozheng Electronics Co Ltd",
  },
  {
    id: 10352,
    name: "Ningbo Songle Relay",
  },
  {
    id: 3142,
    name: "Ningxia Xingri Electronics Co Ltd",
  },
  {
    id: 13902,
    name: "Nipron",
  },
  {
    id: 13745,
    name: "Niryo",
  },
  {
    id: 7045,
    name: "NISSEI",
  },
  {
    id: 9966,
    name: "Nisshinbo Micro Devices Inc",
  },
  {
    id: 20120,
    name: "Nite Ize",
  },
  {
    id: 14062,
    name: "Nitto",
  },
  {
    id: 2373,
    name: "NJR Corporation / NJRC",
  },
  {
    id: 2983,
    name: "NJS",
  },
  {
    id: 1324,
    name: "NKK Switches",
  },
  {
    id: 20912,
    name: "nlt",
  },
  {
    id: 9478,
    name: "NMB",
  },
  {
    id: 2160,
    name: "NMB Technologies Corporation",
  },
  {
    id: 2635,
    name: "NOBO",
  },
  {
    id: 14418,
    name: "No Climb",
  },
  {
    id: 22848,
    name: "NON FISSO",
  },
  {
    id: 2117,
    name: "NorComp Inc.",
  },
  {
    id: 2259,
    name: "Nordic Semiconductor",
  },
  {
    id: 3469,
    name: "Norgren",
  },
  {
    id: 14161,
    name: "Northwood Hygiene",
  },
  {
    id: 10574,
    name: "Norton",
  },
  {
    id: 16125,
    name: "Not Specified",
  },
  {
    id: 1737,
    name: "Nova",
  },
  {
    id: 2408,
    name: "Novasom Industries",
  },
  {
    id: 4633,
    name: "Novatek",
  },
  {
    id: 13730,
    name: "NSF",
  },
  {
    id: 2810,
    name: "NSF Controls",
  },
  {
    id: 10627,
    name: "NSK",
  },
  {
    id: 13887,
    name: "NSK-RHP",
  },
  {
    id: 1336,
    name: "NTE Electronics",
  },
  {
    id: 2492,
    name: "NthDegree",
  },
  {
    id: 3070,
    name: "NTS",
  },
  {
    id: 2903,
    name: "Numonyx",
  },
  {
    id: 13735,
    name: "Nu-Tech Engineering",
  },
  {
    id: 10653,
    name: "Nuvotem",
  },
  {
    id: 2050,
    name: "Nuvoton Technology Corporation of America",
  },
  {
    id: 19280,
    name: "NVE Corporation",
  },
  {
    id: 15251,
    name: "nVent",
  },
  {
    id: 18655,
    name: "nvent caddy",
  },
  {
    id: 9907,
    name: "nVent Schroff",
  },
  {
    id: 3273,
    name: "Nvidia",
  },
  {
    id: 10502,
    name: "NWS",
  },
  {
    id: 9,
    name: "NXP Semiconductors",
  },
  {
    id: 14264,
    name: "Nylofix",
  },
  {
    id: 3957,
    name: "O2Micro",
  },
  {
    id: 14817,
    name: "Oceansmile",
  },
  {
    id: 1586,
    name: "Octavo Systems",
  },
  {
    id: 1974,
    name: "ODU",
  },
  {
    id: 20848,
    name: "Oetiker Tool Corporation",
  },
  {
    id: 1084,
    name: "Ohmite",
  },
  {
    id: 14202,
    name: "Okaya Electric Industries",
  },
  {
    id: 10566,
    name: "Okdo",
  },
  {
    id: 3265,
    name: "OKI",
  },
  {
    id: 2042,
    name: "OKW",
  },
  {
    id: 1412,
    name: "Olimex Ltd.",
  },
  {
    id: 2029,
    name: "Olmatic",
  },
  {
    id: 14778,
    name: "Olympus",
  },
  {
    id: 2375,
    name: "OMEGA",
  },
  {
    id: 14784,
    name: "Omega Engineering",
  },
  {
    id: 19831,
    name: "Omega Technologies",
  },
  {
    id: 1816,
    name: "Omeg Limited Imberhorne",
  },
  {
    id: 17057,
    name: "Omnetics Connector Coirporation",
  },
  {
    id: 14342,
    name: "Omnivision Technologies",
  },
  {
    id: 942,
    name: "Omron Automation and Safety",
  },
  {
    id: 1289,
    name: "Omron Electronic Components",
  },
  {
    id: 1290,
    name: "Omron Industrial Automation",
  },
  {
    id: 15023,
    name: "On-Bright Electronics",
  },
  {
    id: 13510,
    name: "OncQue",
  },
  {
    id: 18097,
    name: "ONPOW",
  },
  {
    id: 129,
    name: "ON Semiconductor",
  },
  {
    id: 6,
    name: "ON Semiconductor / Fairchild",
  },
  {
    id: 14359,
    name: "On Shore Technology",
  },
  {
    id: 11208,
    name: "OPTI",
  },
  {
    id: 14445,
    name: "OPTIBELT",
  },
  {
    id: 14657,
    name: "Optoma",
  },
  {
    id: 17383,
    name: "OPTOSUPPLY",
  },
  {
    id: 14196,
    name: "Optris",
  },
  {
    id: 19389,
    name: "Orbit International",
  },
  {
    id: 4820,
    name: "ORIENT",
  },
  {
    id: 2490,
    name: "ORing",
  },
  {
    id: 2301,
    name: "Orion Fans",
  },
  {
    id: 13923,
    name: "Orn",
  },
  {
    id: 13844,
    name: "OSA Electronics",
  },
  {
    id: 20847,
    name: "OSA Opto Light",
  },
  {
    id: 1960,
    name: "OSEPP Electronics",
  },
  {
    id: 13813,
    name: "OSI Optoelectronics",
  },
  {
    id: 12266,
    name: "Osram AG",
  },
  {
    id: 12267,
    name: "Osram Digital Solutions",
  },
  {
    id: 2132,
    name: "Osram Opto Semiconductors Inc.",
  },
  {
    id: 3416,
    name: "Osram Sylvania",
  },
  {
    id: 21303,
    name: "Ossi",
  },
  {
    id: 14855,
    name: "OStream",
  },
  {
    id: 8100,
    name: "OTAX",
  },
  {
    id: 3455,
    name: "Otto Controls",
  },
  {
    id: 19373,
    name: "OTTO Engineering",
  },
  {
    id: 19259,
    name: "oupiin america, inc.",
  },
  {
    id: 14818,
    name: "Overview",
  },
  {
    id: 16846,
    name: "Oxford Electrical Products",
  },
  {
    id: 1282,
    name: "Oxley",
  },
  {
    id: 3374,
    name: "Pace",
  },
  {
    id: 13986,
    name: "Pacific",
  },
  {
    id: 2431,
    name: "PacTec",
  },
  {
    id: 13759,
    name: "PAL",
  },
  {
    id: 1262,
    name: "Panasonic",
  },
  {
    id: 3234,
    name: "Panasonic Battery",
  },
  {
    id: 1538,
    name: "Panasonic Electric Works",
  },
  {
    id: 1295,
    name: "Panasonic Industrial Devices",
  },
  {
    id: 2099,
    name: "Panavise",
  },
  {
    id: 3292,
    name: "Pancon Corp",
  },
  {
    id: 1981,
    name: "Panduit Corp",
  },
  {
    id: 805,
    name: "Panjit",
  },
  {
    id: 16128,
    name: "PANJIT Semiconductor",
  },
  {
    id: 14422,
    name: "Paper Mate",
  },
  {
    id: 5071,
    name: "Parade",
  },
  {
    id: 2671,
    name: "Para Light Electronics",
  },
  {
    id: 2827,
    name: "Parallax Inc.",
  },
  {
    id: 14378,
    name: "Parker Hannifin",
  },
  {
    id: 10637,
    name: "Parker Origa",
  },
  {
    id: 2482,
    name: "Parlex",
  },
  {
    id: 20104,
    name: "parlex usa llc",
  },
  {
    id: 20234,
    name: "Parmar",
  },
  {
    id: 2448,
    name: "Partex",
  },
  {
    id: 2365,
    name: "Particle",
  },
  {
    id: 13911,
    name: "PASS & SEYMOUR",
  },
  {
    id: 9933,
    name: "PATLITE",
  },
  {
    id: 3517,
    name: "Paulstra",
  },
  {
    id: 14048,
    name: "PCL",
  },
  {
    id: 14925,
    name: "PCT International",
  },
  {
    id: 15191,
    name: "P-Duke Power",
  },
  {
    id: 16113,
    name: "Peak Electronics Design",
  },
  {
    id: 3314,
    name: "Peaktech",
  },
  {
    id: 10428,
    name: "Peerless by Tymphany",
  },
  {
    id: 10640,
    name: "Peli",
  },
  {
    id: 18679,
    name: "Pelican",
  },
  {
    id: 2390,
    name: "PEM",
  },
  {
    id: 19596,
    name: "Penko",
  },
  {
    id: 19521,
    name: "Penn Engineering",
  },
  {
    id: 9399,
    name: "PENNY & GILES",
  },
  {
    id: 10665,
    name: "Pepperl + Fuchs",
  },
  {
    id: 2654,
    name: "Pepperl+Fuchs",
  },
  {
    id: 14149,
    name: "Peppers",
  },
  {
    id: 3390,
    name: "Perancea",
  },
  {
    id: 3156,
    name: "Peregrine Semiconductor",
  },
  {
    id: 14466,
    name: "Performance Brands",
  },
  {
    id: 3405,
    name: "Performance Tools",
  },
  {
    id: 2705,
    name: "Pericom Saronix-eCera",
  },
  {
    id: 1338,
    name: "Pericom Semiconductor",
  },
  {
    id: 3481,
    name: "Pervasive Displays",
  },
  {
    id: 14056,
    name: "Petrel",
  },
  {
    id: 10542,
    name: "Petzl",
  },
  {
    id: 1563,
    name: "Pexco",
  },
  {
    id: 20231,
    name: "Pfannerberg",
  },
  {
    id: 16956,
    name: "pflitsch",
  },
  {
    id: 2342,
    name: "Phihong",
  },
  {
    id: 2093,
    name: "Philips",
  },
  {
    id: 10595,
    name: "Philips Lighting",
  },
  {
    id: 2856,
    name: "Philips Lumileds Lighting Corp LLC",
  },
  {
    id: 3666,
    name: "Philips Semiconductors",
  },
  {
    id: 1294,
    name: "Phoenix Contact",
  },
  {
    id: 1602,
    name: "Phoenix Mecano Inc",
  },
  {
    id: 9873,
    name: "Phytec",
  },
  {
    id: 2496,
    name: "Pico Technology",
  },
  {
    id: 20128,
    name: "PIC - Proximity Instrumentation Controls GmbH",
  },
  {
    id: 19998,
    name: "piergiacomi",
  },
  {
    id: 2349,
    name: "Pilz",
  },
  {
    id: 2742,
    name: "Pimoroni",
  },
  {
    id: 10532,
    name: "Pinet",
  },
  {
    id: 20191,
    name: "Piper Inc.",
  },
  {
    id: 3365,
    name: "Pi-Plates",
  },
  {
    id: 14020,
    name: "Pi-Top",
  },
  {
    id: 14139,
    name: "PITTMAN AMETEK TIP",
  },
  {
    id: 4901,
    name: "PIXELWORKS",
  },
  {
    id: 14014,
    name: "Planet-Wattohm",
  },
  {
    id: 13982,
    name: "Planorga",
  },
  {
    id: 14167,
    name: "Plastic Systems",
  },
  {
    id: 2685,
    name: "Platinum Tools",
  },
  {
    id: 11999,
    name: "PLESSEY",
  },
  {
    id: 2568,
    name: "Pletronics Inc.",
  },
  {
    id: 1676,
    name: "PLX",
  },
  {
    id: 13732,
    name: "PMA",
  },
  {
    id: 3152,
    name: "PMC",
  },
  {
    id: 2309,
    name: "PMK",
  },
  {
    id: 14685,
    name: "Pneumatic Components",
  },
  {
    id: 13929,
    name: "Pollyboot",
  },
  {
    id: 2684,
    name: "Pololu",
  },
  {
    id: 14689,
    name: "Poly",
  },
  {
    id: 13840,
    name: "Polyco Healthline",
  },
  {
    id: 20913,
    name: "polyhex technology",
  },
  {
    id: 13965,
    name: "Polyplumb",
  },
  {
    id: 1648,
    name: "Pomona Electronics",
  },
  {
    id: 13754,
    name: "POP",
  },
  {
    id: 14455,
    name: "Pop Rivets",
  },
  {
    id: 19625,
    name: "Portacool B.V",
  },
  {
    id: 14390,
    name: "Portasol",
  },
  {
    id: 2775,
    name: "Portescap",
  },
  {
    id: 13805,
    name: "Portwest",
  },
  {
    id: 3325,
    name: "Positronic",
  },
  {
    id: 2499,
    name: "Power Adhesives",
  },
  {
    id: 14701,
    name: "Powerbreaker",
  },
  {
    id: 14703,
    name: "Power Breaker",
  },
  {
    id: 14676,
    name: "PowerConnections",
  },
  {
    id: 3270,
    name: "PowerDsine",
  },
  {
    id: 15462,
    name: "Power Dynamics",
  },
  {
    id: 4199,
    name: "POWEREX",
  },
  {
    id: 3323,
    name: "Powerex / Mitsubishi",
  },
  {
    id: 1914,
    name: "Power Integrations",
  },
  {
    id: 10597,
    name: "PowerLED",
  },
  {
    id: 3275,
    name: "Power-One",
  },
  {
    id: 5479,
    name: "POWER-ONE",
  },
  {
    id: 2170,
    name: "Power Partners / TT Electronics",
  },
  {
    id: 2397,
    name: "Powerpax",
  },
  {
    id: 11130,
    name: "PowerSilicon",
  },
  {
    id: 3563,
    name: "Power-Sonic",
  },
  {
    id: 16851,
    name: "Power-sonic Corp",
  },
  {
    id: 14333,
    name: "PowerStor",
  },
  {
    id: 2480,
    name: "PowerStor / Eaton",
  },
  {
    id: 2370,
    name: "Powertip Technology",
  },
  {
    id: 9832,
    name: "Powertip Technology Corporation",
  },
  {
    id: 14175,
    name: "Powertraveller",
  },
  {
    id: 3147,
    name: "Power Trends",
  },
  {
    id: 3393,
    name: "Powertron",
  },
  {
    id: 13498,
    name: "Powerware / Eaton",
  },
  {
    id: 5094,
    name: "POWTECH",
  },
  {
    id: 13872,
    name: "Pramet",
  },
  {
    id: 14420,
    name: "Praybourne",
  },
  {
    id: 1866,
    name: "Preci-dip",
  },
  {
    id: 17047,
    name: "Precision Electronics Corporation",
  },
  {
    id: 20083,
    name: "Precision Monolithics",
  },
  {
    id: 3555,
    name: "PrehKeyTec",
  },
  {
    id: 14863,
    name: "Preh Werker",
  },
  {
    id: 2811,
    name: "Pressmaster",
  },
  {
    id: 13681,
    name: "PREVOST",
  },
  {
    id: 15245,
    name: "Princeton Technology",
  },
  {
    id: 4894,
    name: "PRISEMI",
  },
  {
    id: 2607,
    name: "Procell",
  },
  {
    id: 1209,
    name: "PRO ELEC",
  },
  {
    id: 10630,
    name: "Pro-face",
  },
  {
    id: 13928,
    name: "Pro Fit",
  },
  {
    id: 13608,
    name: "Progress Lighting",
  },
  {
    id: 1480,
    name: "Projects Unlimited",
  },
  {
    id: 13760,
    name: "ProMinent",
  },
  {
    id: 1761,
    name: "Pro-Power",
  },
  {
    id: 3344,
    name: "Pro Signal",
  },
  {
    id: 2587,
    name: "Proskit Industries",
  },
  {
    id: 15344,
    name: "Protecta Pro",
  },
  {
    id: 2011,
    name: "Protek Devices",
  },
  {
    id: 2491,
    name: "Protektive  Pak",
  },
  {
    id: 14391,
    name: "Proton",
  },
  {
    id: 19920,
    name: "Pro-Wave Electronic Corporation",
  },
  {
    id: 2740,
    name: "Proxxon",
  },
  {
    id: 10692,
    name: "Prysmian",
  },
  {
    id: 18215,
    name: "prysmian group",
  },
  {
    id: 2773,
    name: "PUI Audio Inc",
  },
  {
    id: 14522,
    name: "Pukka",
  },
  {
    id: 782,
    name: "Pulse Electronics",
  },
  {
    id: 1639,
    name: "PulseLarsen Antennas",
  },
  {
    id: 1868,
    name: "Pulser",
  },
  {
    id: 14115,
    name: "Puma Safety",
  },
  {
    id: 2161,
    name: "Püschel KG",
  },
  {
    id: 14387,
    name: "PV Logic",
  },
  {
    id: 3483,
    name: "Pycom Ltd.",
  },
  {
    id: 20209,
    name: "Pyrocontrole",
  },
  {
    id: 10608,
    name: "QANTEK",
  },
  {
    id: 7496,
    name: "QLOGIC",
  },
  {
    id: 14873,
    name: "Qoitech AB",
  },
  {
    id: 1516,
    name: "Qorvo",
  },
  {
    id: 5151,
    name: "QSI",
  },
  {
    id: 3576,
    name: "QST Products",
  },
  {
    id: 3022,
    name: "QT",
  },
  {
    id: 3453,
    name: "QT Brightek (QTB)",
  },
  {
    id: 2993,
    name: "Q-Tech",
  },
  {
    id: 14429,
    name: "QT Quarztechnik",
  },
  {
    id: 13922,
    name: "Quadrant Connectors",
  },
  {
    id: 2564,
    name: "Qualcomm Inc",
  },
  {
    id: 3508,
    name: "Qualcomm (RF360 - A Qualcomm & TDK Joint Venture)",
  },
  {
    id: 19767,
    name: "qualcomm rffe filter products",
  },
  {
    id: 19991,
    name: "Quality Semiconductor",
  },
  {
    id: 1632,
    name: "Qualtek Electronics",
  },
  {
    id: 18750,
    name: "Qualtek Electronics Corporation",
  },
  {
    id: 19852,
    name: "Quasar Electronics",
  },
  {
    id: 2574,
    name: "Quectel",
  },
  {
    id: 2558,
    name: "QuickLogic",
  },
  {
    id: 1724,
    name: "Raaco",
  },
  {
    id: 3384,
    name: "Rabbit Semiconductor",
  },
  {
    id: 1387,
    name: "Radial",
  },
  {
    id: 2796,
    name: "Radial Magnets Inc",
  },
  {
    id: 14217,
    name: "Radiocrafts",
  },
  {
    id: 14692,
    name: "Radiodetection",
  },
  {
    id: 14291,
    name: "Radiohm",
  },
  {
    id: 3038,
    name: "Raditek",
  },
  {
    id: 2691,
    name: "Radpol",
  },
  {
    id: 1386,
    name: "RAF Electronic Hardware",
  },
  {
    id: 3407,
    name: "Raffenday Limited",
  },
  {
    id: 1654,
    name: "Rafi",
  },
  {
    id: 3541,
    name: "Raise3D",
  },
  {
    id: 3519,
    name: "Raltron Electronics",
  },
  {
    id: 15953,
    name: "Raltron Electronics Corporation",
  },
  {
    id: 1638,
    name: "Ramtron",
  },
  {
    id: 13766,
    name: "Rapesco",
  },
  {
    id: 14045,
    name: "Rapid",
  },
  {
    id: 1941,
    name: "Raspberry Pi Foundation",
  },
  {
    id: 10526,
    name: "RawlPlug",
  },
  {
    id: 16376,
    name: "Rayson",
  },
  {
    id: 2660,
    name: "Raystar Optronics",
  },
  {
    id: 2869,
    name: "Raytac",
  },
  {
    id: 3538,
    name: "Raytech",
  },
  {
    id: 14715,
    name: "Raytek",
  },
  {
    id: 1721,
    name: "Raytheon Company",
  },
  {
    id: 5215,
    name: "RCI",
  },
  {
    id: 15246,
    name: "RDA Microelectronics",
  },
  {
    id: 3274,
    name: "Realtek",
  },
  {
    id: 2357,
    name: "REAN / Neutrik",
  },
  {
    id: 14069,
    name: "Reckmann",
  },
  {
    id: 1199,
    name: "RECOM",
  },
  {
    id: 16796,
    name: "RECOM Power GmbH",
  },
  {
    id: 755,
    name: "Rectron",
  },
  {
    id: 2674,
    name: "Redapt",
  },
  {
    id: 2456,
    name: "Red Lion Controls",
  },
  {
    id: 92,
    name: "Red Pitaya",
  },
  {
    id: 13845,
    name: "Redring",
  },
  {
    id: 2425,
    name: "ReFLEX CES",
  },
  {
    id: 15167,
    name: "Refond Optoelectronics",
  },
  {
    id: 15388,
    name: "Regatta Professional",
  },
  {
    id: 13924,
    name: "Reldeen",
  },
  {
    id: 14481,
    name: "Reliance Water Controls",
  },
  {
    id: 1521,
    name: "Reloc",
  },
  {
    id: 2478,
    name: "Relpol",
  },
  {
    id: 3185,
    name: "Renata Batteries",
  },
  {
    id: 263,
    name: "Renesas Electronics",
  },
  {
    id: 1449,
    name: "Renesas / IDT",
  },
  {
    id: 1402,
    name: "Renesas / Intersil",
  },
  {
    id: 3367,
    name: "Rennsteig",
  },
  {
    id: 10663,
    name: "Renold",
  },
  {
    id: 14623,
    name: "Resatec",
  },
  {
    id: 14524,
    name: "Revvo",
  },
  {
    id: 14336,
    name: "Rexnord",
  },
  {
    id: 2129,
    name: "RF360",
  },
  {
    id: 14931,
    name: "RFduino",
  },
  {
    id: 1885,
    name: "RFMD",
  },
  {
    id: 8758,
    name: "RFMi",
  },
  {
    id: 1942,
    name: "RF Solutions",
  },
  {
    id: 3125,
    name: "Rheotor",
  },
  {
    id: 1624,
    name: "RIA Connect",
  },
  {
    id: 9797,
    name: "Richco",
  },
  {
    id: 16860,
    name: "Richtek Technology Corp",
  },
  {
    id: 3324,
    name: "Richtek Technology Corporation",
  },
  {
    id: 8706,
    name: "RichWave Technology Corp",
  },
  {
    id: 2218,
    name: "RICOH Electronic Devices Co LTD",
  },
  {
    id: 4974,
    name: "RIEDON",
  },
  {
    id: 14684,
    name: "Riello",
  },
  {
    id: 14224,
    name: "Riley",
  },
  {
    id: 3358,
    name: "Rittal",
  },
  {
    id: 10496,
    name: "Riverdi",
  },
  {
    id: 10937,
    name: "River Eletec",
  },
  {
    id: 13584,
    name: "RND Components",
  },
  {
    id: 20909,
    name: "Robin Electronics",
  },
  {
    id: 15181,
    name: "Robinson Nugent",
  },
  {
    id: 1975,
    name: "ROBOTIS",
  },
  {
    id: 14182,
    name: "Robustel",
  },
  {
    id: 1798,
    name: "Rochester Electronics",
  },
  {
    id: 4033,
    name: "Rockchip",
  },
  {
    id: 14437,
    name: "Rockfall",
  },
  {
    id: 5177,
    name: "ROCKWELL",
  },
  {
    id: 15179,
    name: "Rockwood Manufacturing",
  },
  {
    id: 10451,
    name: "ROEBUCK",
  },
  {
    id: 2788,
    name: "Rohde & Schwarz",
  },
  {
    id: 1203,
    name: "ROHM",
  },
  {
    id: 1876,
    name: "Roline",
  },
  {
    id: 3016,
    name: "Roqang",
  },
  {
    id: 2567,
    name: "Rose",
  },
  {
    id: 14738,
    name: "Rosemount",
  },
  {
    id: 1852,
    name: "Rosenberger",
  },
  {
    id: 1895,
    name: "Roth Elektronik",
  },
  {
    id: 14247,
    name: "Rotring",
  },
  {
    id: 13984,
    name: "Rotronic Instruments",
  },
  {
    id: 14628,
    name: "Rottner Comsafe",
  },
  {
    id: 2738,
    name: "Roughnek",
  },
  {
    id: 9692,
    name: "ROXBURGH",
  },
  {
    id: 10468,
    name: "ROXBURGH EMC",
  },
  {
    id: 3014,
    name: "Royal",
  },
  {
    id: 15312,
    name: "Royal Ohm",
  },
  {
    id: 5310,
    name: "ROYALOHM",
  },
  {
    id: 22875,
    name: "ROYAL-OHM / UNIROYAL",
  },
  {
    id: 1732,
    name: "RRC Power Solutions",
  },
  {
    id: 10379,
    name: "RS PRO",
  },
  {
    id: 15465,
    name: "Rubbermaid",
  },
  {
    id: 10673,
    name: "Rubbermaid Commercial Products",
  },
  {
    id: 1339,
    name: "Rubycon",
  },
  {
    id: 16869,
    name: "Rubycon Corporation",
  },
  {
    id: 3061,
    name: "Ruilon",
  },
  {
    id: 2720,
    name: "Ruko",
  },
  {
    id: 3041,
    name: "Rukycon",
  },
  {
    id: 13736,
    name: "Ruland",
  },
  {
    id: 14772,
    name: "Ruland Manufacturing",
  },
  {
    id: 19614,
    name: "runic technology",
  },
  {
    id: 14655,
    name: "Runpotec",
  },
  {
    id: 10554,
    name: "RUTRONIK",
  },
  {
    id: 22192,
    name: "Safety Technology",
  },
  {
    id: 4034,
    name: "SAFT",
  },
  {
    id: 5834,
    name: "SAGAMI",
  },
  {
    id: 3095,
    name: "SAGEM",
  },
  {
    id: 17864,
    name: "Saia-Burgess Electronics",
  },
  {
    id: 14287,
    name: "Saint-Gobain",
  },
  {
    id: 15473,
    name: "Sakazume",
  },
  {
    id: 11963,
    name: "Samhop Microelectronics",
  },
  {
    id: 2690,
    name: "SAM Labs",
  },
  {
    id: 2256,
    name: "Samsung ARTIK",
  },
  {
    id: 2243,
    name: "Samsung Electro-Mechanics",
  },
  {
    id: 3055,
    name: "Samsung Electronics",
  },
  {
    id: 2689,
    name: "Samsung GVI",
  },
  {
    id: 1557,
    name: "Samsung SDI",
  },
  {
    id: 2257,
    name: "Samsung Semiconductor Inc",
  },
  {
    id: 1980,
    name: "Samtec Inc.",
  },
  {
    id: 1708,
    name: "Samwha",
  },
  {
    id: 4036,
    name: "SAMXON",
  },
  {
    id: 2226,
    name: "SanDisk",
  },
  {
    id: 18172,
    name: "SanDisk Corporation",
  },
  {
    id: 13565,
    name: "Sandvik Coromant",
  },
  {
    id: 13547,
    name: "Sangdest Microelectronics",
  },
  {
    id: 3244,
    name: "Sangshin",
  },
  {
    id: 2553,
    name: "Sanken",
  },
  {
    id: 17854,
    name: "sanken electric company, ltd.",
  },
  {
    id: 3493,
    name: "Sanmotion",
  },
  {
    id: 2064,
    name: "SanRex",
  },
  {
    id: 14144,
    name: "SANTON",
  },
  {
    id: 1311,
    name: "Sanyo Denki",
  },
  {
    id: 18310,
    name: "Sanyo Electric",
  },
  {
    id: 3360,
    name: "Saronix",
  },
  {
    id: 2921,
    name: "Sast Electronic Co Ltd",
  },
  {
    id: 10938,
    name: "Sato Parts",
  },
  {
    id: 15385,
    name: "SAUERMANN",
  },
  {
    id: 2155,
    name: "SAURO",
  },
  {
    id: 15964,
    name: "SAUTER REGULATION",
  },
  {
    id: 13729,
    name: "Savigny",
  },
  {
    id: 14397,
    name: "SB COMPONENTS LTD",
  },
  {
    id: 2405,
    name: "Scalys",
  },
  {
    id: 10693,
    name: "Scame",
  },
  {
    id: 14600,
    name: "Schaeffler",
  },
  {
    id: 1458,
    name: "Schaffner",
  },
  {
    id: 2484,
    name: "SchmartBoard",
  },
  {
    id: 3364,
    name: "Schmersal",
  },
  {
    id: 817,
    name: "Schneider Electric",
  },
  {
    id: 14241,
    name: "Schoeller Allibert",
  },
  {
    id: 2376,
    name: "Schroff",
  },
  {
    id: 2039,
    name: "Schurter Inc.",
  },
  {
    id: 2054,
    name: "Schutzinger",
  },
  {
    id: 2760,
    name: "Schweitzer",
  },
  {
    id: 14667,
    name: "Scintacor",
  },
  {
    id: 3434,
    name: "ScioSense",
  },
  {
    id: 3591,
    name: "Scolmore OEM Products",
  },
  {
    id: 13737,
    name: "Scruffs",
  },
  {
    id: 42,
    name: "SCS",
  },
  {
    id: 14782,
    name: "SDT Ultrasound Solutions",
  },
  {
    id: 4037,
    name: "SEAGATE",
  },
  {
    id: 2714,
    name: "Sealed Air",
  },
  {
    id: 17748,
    name: "sealey",
  },
  {
    id: 20186,
    name: "Sea Sonic Electronics",
  },
  {
    id: 5745,
    name: "SEAWARD",
  },
  {
    id: 1154,
    name: "SECH SA",
  },
  {
    id: 2402,
    name: "Seco",
  },
  {
    id: 2631,
    name: "Seco-Larm",
  },
  {
    id: 21162,
    name: "Secomp",
  },
  {
    id: 13934,
    name: "Sedis",
  },
  {
    id: 1887,
    name: "Seeed (Studio) Technology",
  },
  {
    id: 14007,
    name: "Seeit",
  },
  {
    id: 3652,
    name: "SEFRAM",
  },
  {
    id: 3442,
    name: "Segger Microcontroller",
  },
  {
    id: 14064,
    name: "Seifert",
  },
  {
    id: 2919,
    name: "Seiko",
  },
  {
    id: 1334,
    name: "Seiko Instruments Inc",
  },
  {
    id: 2294,
    name: "Seiko Semiconductors",
  },
  {
    id: 2311,
    name: "Seiko Time System",
  },
  {
    id: 3059,
    name: "SEI Stackpole Electronics",
  },
  {
    id: 15472,
    name: "Seiwa",
  },
  {
    id: 16944,
    name: "Selco Products",
  },
  {
    id: 20020,
    name: "Semicoa Semiconductors",
  },
  {
    id: 876,
    name: "Semikron",
  },
  {
    id: 19818,
    name: "semiq",
  },
  {
    id: 2358,
    name: "Semitec",
  },
  {
    id: 18239,
    name: "Semi Tech",
  },
  {
    id: 2206,
    name: "Semtech Corporation",
  },
  {
    id: 8365,
    name: "SENSATA",
  },
  {
    id: 2196,
    name: "Sensata-Airpax",
  },
  {
    id: 2801,
    name: "Sensata-BEI Sensors",
  },
  {
    id: 2045,
    name: "Sensata-Crydom",
  },
  {
    id: 8341,
    name: "SENSATA / CYNERGY3",
  },
  {
    id: 13838,
    name: "Sensata / Kavlico",
  },
  {
    id: 949,
    name: "Sensata Technologies",
  },
  {
    id: 2658,
    name: "SensiEDGE",
  },
  {
    id: 1009,
    name: "Sensirion",
  },
  {
    id: 9533,
    name: "SENSITEC",
  },
  {
    id: 2554,
    name: "Sensitron Semiconductor",
  },
  {
    id: 3579,
    name: "Sensorcon",
  },
  {
    id: 20860,
    name: "Sentinel Connector Systems",
  },
  {
    id: 3464,
    name: "Seoul Semiconductor Inc.",
  },
  {
    id: 3462,
    name: "Seoul Viosys",
  },
  {
    id: 14491,
    name: "SE Relays Magnecraft",
  },
  {
    id: 16957,
    name: "Serpac Electronic Enclosures",
  },
  {
    id: 15324,
    name: "SES",
  },
  {
    id: 10537,
    name: "SES Sterling",
  },
  {
    id: 3463,
    name: "SETi/Seoul Viosys",
  },
  {
    id: 2326,
    name: "Sfera Labs",
  },
  {
    id: 1720,
    name: "SG Micro Corp",
  },
  {
    id: 14186,
    name: "Sgos",
  },
  {
    id: 3043,
    name: "Shanghai Xiangriya Electronics Co Ltd",
  },
  {
    id: 16993,
    name: "Sharp Corporation",
  },
  {
    id: 10662,
    name: "Sharpie",
  },
  {
    id: 1882,
    name: "Sharp Microelectronics",
  },
  {
    id: 3502,
    name: "SHARP/Socle Technology",
  },
  {
    id: 19999,
    name: "shenzhen cenker enterprise ltd",
  },
  {
    id: 3319,
    name: "Shenzhen Connector Technology Co Ltd",
  },
  {
    id: 3322,
    name: "Shenzhen Huayangtong Electromechanical Co Ltd",
  },
  {
    id: 10765,
    name: "Shenzhen Sunlord Electronics Co Ltd",
  },
  {
    id: 3224,
    name: "Shenzhen Uling Electronic Co LTD",
  },
  {
    id: 20013,
    name: "shenzhen yangxing technology",
  },
  {
    id: 3105,
    name: "Shenzhen Yangxing Technology Co Ltd",
  },
  {
    id: 3296,
    name: "Shenzhen Yingtongda Industrial Development Co Ltd",
  },
  {
    id: 3381,
    name: "Shesto",
  },
  {
    id: 2091,
    name: "Shin Chin",
  },
  {
    id: 1921,
    name: "Shindengen Electric",
  },
  {
    id: 18757,
    name: "Shindengen Electric Manufacturing",
  },
  {
    id: 19297,
    name: "shindengen electric manufacturing co.",
  },
  {
    id: 1954,
    name: "Shiratech Soultion Tech",
  },
  {
    id: 20177,
    name: "shori electric",
  },
  {
    id: 19438,
    name: "SHOT",
  },
  {
    id: 14021,
    name: "Showa",
  },
  {
    id: 2890,
    name: "Shulin",
  },
  {
    id: 10423,
    name: "Shure",
  },
  {
    id: 13954,
    name: "Shurite",
  },
  {
    id: 9452,
    name: "SIB",
  },
  {
    id: 941,
    name: "SIBA Fuses Llc",
  },
  {
    id: 1973,
    name: "SIBA GmbH",
  },
  {
    id: 14090,
    name: "Sibille",
  },
  {
    id: 16717,
    name: "SICK Electronics",
  },
  {
    id: 14356,
    name: "Sick Optic Electronic",
  },
  {
    id: 13676,
    name: "SICK Sensors",
  },
  {
    id: 14671,
    name: "Sidamo",
  },
  {
    id: 1535,
    name: "Siemens",
  },
  {
    id: 2283,
    name: "Sierra Monitor",
  },
  {
    id: 2763,
    name: "Sierra Wireless",
  },
  {
    id: 19796,
    name: "Sifam Instruments",
  },
  {
    id: 9421,
    name: "SIFAM TINSLEY",
  },
  {
    id: 3597,
    name: "SiFive",
  },
  {
    id: 2346,
    name: "Sigma Designs",
  },
  {
    id: 13782,
    name: "Signal Construct",
  },
  {
    id: 1937,
    name: "Signal-Construct GMBH",
  },
  {
    id: 2822,
    name: "Signal Transformer",
  },
  {
    id: 2649,
    name: "SigNET (AC)",
  },
  {
    id: 3758,
    name: "Signetics",
  },
  {
    id: 13542,
    name: "SII Semiconductor",
  },
  {
    id: 8669,
    name: "SILAN MICRO",
  },
  {
    id: 1323,
    name: "Silego Technology",
  },
  {
    id: 15003,
    name: "Silergy Corporation",
  },
  {
    id: 2579,
    name: "Silex Technology",
  },
  {
    id: 13916,
    name: "Silfox",
  },
  {
    id: 7336,
    name: "SILICONGEAR",
  },
  {
    id: 3284,
    name: "Siliconix",
  },
  {
    id: 1553,
    name: "Silicon Laboratories",
  },
  {
    id: 2582,
    name: "Silicon Microstructures Inc",
  },
  {
    id: 3272,
    name: "Silicon Motion",
  },
  {
    id: 14923,
    name: "Silicon Storage Technology Inc",
  },
  {
    id: 1364,
    name: "Silicon (Taiwan Silicon Core)",
  },
  {
    id: 10842,
    name: "Silicon Touch Technology Inc",
  },
  {
    id: 2633,
    name: "Silverline",
  },
  {
    id: 9360,
    name: "Silvertel",
  },
  {
    id: 3008,
    name: "Silver Telecom",
  },
  {
    id: 3411,
    name: "Simco-Ion",
  },
  {
    id: 2335,
    name: "Simcom",
  },
  {
    id: 17078,
    name: "simcom wireless solutions limited",
  },
  {
    id: 14102,
    name: "Simex",
  },
  {
    id: 17058,
    name: "Simpson Electric Co",
  },
  {
    id: 2021,
    name: "Simpson Electric Company",
  },
  {
    id: 14060,
    name: "Sindanyo H91",
  },
  {
    id: 15024,
    name: "Sinopower Semiconductor Inc",
  },
  {
    id: 17874,
    name: "Sioen",
  },
  {
    id: 1684,
    name: "Sipex",
  },
  {
    id: 9285,
    name: "SIPEX CORPORATION",
  },
  {
    id: 14131,
    name: "Sirai",
  },
  {
    id: 3331,
    name: "Sirenza",
  },
  {
    id: 1790,
    name: "Siretta LTD",
  },
  {
    id: 2083,
    name: "Si Time",
  },
  {
    id: 2274,
    name: "Skeleton Technologies",
  },
  {
    id: 10525,
    name: "SKF",
  },
  {
    id: 2846,
    name: "SK Hynix",
  },
  {
    id: 14269,
    name: "Skipper",
  },
  {
    id: 10944,
    name: "SK Kohki",
  },
  {
    id: 14154,
    name: "SKROSS",
  },
  {
    id: 1906,
    name: "SKS Kontakttechnik",
  },
  {
    id: 2337,
    name: "SkyHigh Memory LTD",
  },
  {
    id: 3353,
    name: "Skytronic",
  },
  {
    id: 2594,
    name: "Sky View Systems",
  },
  {
    id: 1793,
    name: "Skyworks Solutions Inc",
  },
  {
    id: 13786,
    name: "Sloan",
  },
  {
    id: 16731,
    name: "SL Power Electronics",
  },
  {
    id: 1842,
    name: "Smalite",
  },
  {
    id: 2756,
    name: "Smartec",
  },
  {
    id: 1859,
    name: "Smart Embedded Computing",
  },
  {
    id: 2873,
    name: "Smart Modular Technologies",
  },
  {
    id: 14258,
    name: "Smartscan",
  },
  {
    id: 2584,
    name: "Smart Wireless Computing",
  },
  {
    id: 1432,
    name: "SMB Bearings",
  },
  {
    id: 1874,
    name: "SMC Corporation",
  },
  {
    id: 16192,
    name: "SMC Diodes",
  },
  {
    id: 2066,
    name: "SMC Diode Solutions",
  },
  {
    id: 17017,
    name: "Smiths Interconnect",
  },
  {
    id: 2634,
    name: "Smiths Interconnect / Hypertac",
  },
  {
    id: 1780,
    name: "Smiths Interconnect / IDI",
  },
  {
    id: 1429,
    name: "SMSC",
  },
  {
    id: 14398,
    name: "Snaplock",
  },
  {
    id: 14513,
    name: "Snickers",
  },
  {
    id: 14892,
    name: "SNOC",
  },
  {
    id: 10444,
    name: "Soberton Inc.",
  },
  {
    id: 14464,
    name: "Socket & See",
  },
  {
    id: 3460,
    name: "Socle",
  },
  {
    id: 10634,
    name: "Socomec",
  },
  {
    id: 1614,
    name: "SolaHD",
  },
  {
    id: 14881,
    name: "Solar Centre",
  },
  {
    id: 14824,
    name: "Solar Mate",
  },
  {
    id: 14284,
    name: "Solar Technology",
  },
  {
    id: 13814,
    name: "Solartron Metrology",
  },
  {
    id: 14494,
    name: "Solentec Limited",
  },
  {
    id: 17875,
    name: "Soler&Palau",
  },
  {
    id: 15148,
    name: "Solidigm",
  },
  {
    id: 2407,
    name: "SolidRun",
  },
  {
    id: 2598,
    name: "Solid State",
  },
  {
    id: 14349,
    name: "Solid State Manufacturing",
  },
  {
    id: 13768,
    name: "Sollatek",
  },
  {
    id: 20051,
    name: "sollec",
  },
  {
    id: 12007,
    name: "SOLOMON SYSTECH",
  },
  {
    id: 2305,
    name: "Song Chuan",
  },
  {
    id: 18719,
    name: "Song Chuan Group",
  },
  {
    id: 938,
    name: "Sonitron",
  },
  {
    id: 14757,
    name: "Sonnenschein",
  },
  {
    id: 10590,
    name: "Southco",
  },
  {
    id: 3526,
    name: "Space Age Electronics",
  },
  {
    id: 1905,
    name: "SparkFun Electronics",
  },
  {
    id: 14270,
    name: "SparqEE",
  },
  {
    id: 10551,
    name: "SPC Technology",
  },
  {
    id: 14095,
    name: "Spear & Jackson",
  },
  {
    id: 14800,
    name: "Speco Technologies",
  },
  {
    id: 21059,
    name: "Spectrum Controls",
  },
  {
    id: 20200,
    name: "Spectrum Digital Inc",
  },
  {
    id: 16809,
    name: "Spectrum Industrial",
  },
  {
    id: 2177,
    name: "Spelsberg",
  },
  {
    id: 14896,
    name: "Sphero",
  },
  {
    id: 2828,
    name: "SpotSee",
  },
  {
    id: 7140,
    name: "SPRAGUE",
  },
  {
    id: 10603,
    name: "SPREADFAST",
  },
  {
    id: 3568,
    name: "SQFMI",
  },
  {
    id: 14002,
    name: "Squire",
  },
  {
    id: 2980,
    name: "SSI Technologies",
  },
  {
    id: 2385,
    name: "SST Sensing",
  },
  {
    id: 20207,
    name: "sst sensing ltd.",
  },
  {
    id: 2341,
    name: "Stackpole Electronics Inc",
  },
  {
    id: 2429,
    name: "Staco",
  },
  {
    id: 19781,
    name: "staco energy products company",
  },
  {
    id: 14786,
    name: "Stadium IGT",
  },
  {
    id: 14862,
    name: "Stadium Power",
  },
  {
    id: 2436,
    name: "Stageline",
  },
  {
    id: 10613,
    name: "STAHLWILLE",
  },
  {
    id: 10553,
    name: "Standex Electronics Inc",
  },
  {
    id: 1915,
    name: "StandexMeder Electronics GmbH",
  },
  {
    id: 16749,
    name: "Stanley Black & Decker",
  },
  {
    id: 2302,
    name: "Stanley Electric",
  },
  {
    id: 3528,
    name: "Stanley FatMax",
  },
  {
    id: 3485,
    name: "Stannol",
  },
  {
    id: 2747,
    name: "Star Micronics",
  },
  {
    id: 14015,
    name: "Starmix",
  },
  {
    id: 10643,
    name: "Starrett",
  },
  {
    id: 1277,
    name: "Startech",
  },
  {
    id: 3586,
    name: "Status",
  },
  {
    id: 1650,
    name: "Staubli",
  },
  {
    id: 3327,
    name: "STC",
  },
  {
    id: 14754,
    name: "Steadfast",
  },
  {
    id: 14388,
    name: "Steca",
  },
  {
    id: 14841,
    name: "STEERMAN",
  },
  {
    id: 16862,
    name: "STEGO Elektrotechnik",
  },
  {
    id: 2785,
    name: "Steinbach And Vollmann",
  },
  {
    id: 13731,
    name: "Steinbach & Vollman",
  },
  {
    id: 2419,
    name: "Steinel",
  },
  {
    id: 2481,
    name: "Stellar Labs",
  },
  {
    id: 15313,
    name: "Stelvio",
  },
  {
    id: 13721,
    name: "Stelvio Kontek",
  },
  {
    id: 15305,
    name: "Step'n Components",
  },
  {
    id: 4938,
    name: "ST-ERICSSON",
  },
  {
    id: 14281,
    name: "Sterling Power",
  },
  {
    id: 2153,
    name: "Steute",
  },
  {
    id: 3293,
    name: "Steward Inc",
  },
  {
    id: 3373,
    name: "Stewart Connector",
  },
  {
    id: 2458,
    name: "Stewart Connector / Bel",
  },
  {
    id: 14900,
    name: "Stieber",
  },
  {
    id: 22205,
    name: "Stinger Electronics",
  },
  {
    id: 2998,
    name: "STK",
  },
  {
    id: 7,
    name: "STMicroelectronics",
  },
  {
    id: 14274,
    name: "Stontronics",
  },
  {
    id: 1901,
    name: "StoreVault",
  },
  {
    id: 2586,
    name: "Storm Interface",
  },
  {
    id: 3388,
    name: "Streetwize",
  },
  {
    id: 20236,
    name: "Struthers-Dunn",
  },
  {
    id: 14501,
    name: "Stuart",
  },
  {
    id: 3368,
    name: "Suco",
  },
  {
    id: 2340,
    name: "Sullins Connector Solutions",
  },
  {
    id: 1690,
    name: "Sumida",
  },
  {
    id: 2126,
    name: "Sumida America Components Inc.",
  },
  {
    id: 10945,
    name: "Sumida Electric",
  },
  {
    id: 1704,
    name: "Sumitomo Electric",
  },
  {
    id: 3299,
    name: "Sumitube",
  },
  {
    id: 3551,
    name: "Sundplast",
  },
  {
    id: 10586,
    name: "Sunhayato",
  },
  {
    id: 9057,
    name: "SUNLED",
  },
  {
    id: 3101,
    name: "Sunlord",
  },
  {
    id: 2626,
    name: "Sunon Fans",
  },
  {
    id: 15019,
    name: "Sunplus Technology Co Ltd",
  },
  {
    id: 3585,
    name: "Sunpower",
  },
  {
    id: 3587,
    name: "Suntan",
  },
  {
    id: 18227,
    name: "Suntsu Electronics",
  },
  {
    id: 2516,
    name: "Superior Electric",
  },
  {
    id: 19197,
    name: "Superior Electronics",
  },
  {
    id: 2570,
    name: "Superior Sensor",
  },
  {
    id: 18399,
    name: "superior washer & gasket corp.",
  },
  {
    id: 2163,
    name: "Supermicro BV",
  },
  {
    id: 3174,
    name: "Superohm",
  },
  {
    id: 3452,
    name: "SUPER ROD",
  },
  {
    id: 3248,
    name: "Suplet",
  },
  {
    id: 14195,
    name: "Sure24",
  },
  {
    id: 1944,
    name: "Sure Electronics",
  },
  {
    id: 14664,
    name: "Suregrip",
  },
  {
    id: 14674,
    name: "Suresan",
  },
  {
    id: 2171,
    name: "Sure Seal",
  },
  {
    id: 20459,
    name: "Sure Seal Connectors",
  },
  {
    id: 2556,
    name: "Surge",
  },
  {
    id: 1438,
    name: "Susumu",
  },
  {
    id: 2603,
    name: "Swann",
  },
  {
    id: 3361,
    name: "Swann-Morton",
  },
  {
    id: 1785,
    name: "Swissbit",
  },
  {
    id: 12508,
    name: "Switchcraft Conxall",
  },
  {
    id: 2115,
    name: "Switchcraft Inc.",
  },
  {
    id: 14910,
    name: "Sybren",
  },
  {
    id: 17070,
    name: "Sylvania Semiconductors",
  },
  {
    id: 5060,
    name: "SYNQOR",
  },
  {
    id: 14223,
    name: "SYRLINKS",
  },
  {
    id: 10654,
    name: "System Zero",
  },
  {
    id: 3366,
    name: "Tacima",
  },
  {
    id: 2768,
    name: "Tadiran Batteries",
  },
  {
    id: 18501,
    name: "TAG-CONNECT LLC",
  },
  {
    id: 3196,
    name: "Tai-Saw",
  },
  {
    id: 18505,
    name: "TAITIEN ELECTRONICS",
  },
  {
    id: 2194,
    name: "Taiwan Semiconductor Corporation",
  },
  {
    id: 15479,
    name: "Taiyo Electric Industry",
  },
  {
    id: 1446,
    name: "Taiyo Yuden",
  },
  {
    id: 10425,
    name: "TAKACHI",
  },
  {
    id: 11599,
    name: "TAKAMISAWA",
  },
  {
    id: 3346,
    name: "Tallysman Wireless",
  },
  {
    id: 14731,
    name: "Tamtorque",
  },
  {
    id: 2388,
    name: "Tamura",
  },
  {
    id: 2004,
    name: "Taoglas Limited",
  },
  {
    id: 15470,
    name: "Tateyama Kagaku Industry",
  },
  {
    id: 14725,
    name: "Tavismanor",
  },
  {
    id: 14794,
    name: "TB Woods",
  },
  {
    id: 1828,
    name: "TC Communication",
  },
  {
    id: 3119,
    name: "TDK Corporation of America",
  },
  {
    id: 1559,
    name: "TDK Electronics",
  },
  {
    id: 2103,
    name: "TDK-Lambda",
  },
  {
    id: 2670,
    name: "TDK-Lambda Americas Inc",
  },
  {
    id: 2387,
    name: "TDK-Micronas",
  },
  {
    id: 1546,
    name: "TDK - Teridian",
  },
  {
    id: 4041,
    name: "TEAC",
  },
  {
    id: 18226,
    name: "Tecate Industries",
  },
  {
    id: 2954,
    name: "Teccor",
  },
  {
    id: 14459,
    name: "TEC Glue Guns",
  },
  {
    id: 12556,
    name: "Techflex",
  },
  {
    id: 1376,
    name: "TechNexion",
  },
  {
    id: 14834,
    name: "Technics",
  },
  {
    id: 20215,
    name: "Techno Components Corp",
  },
  {
    id: 1603,
    name: "Techspray",
  },
  {
    id: 15025,
    name: "Techwell Inc",
  },
  {
    id: 14087,
    name: "Tecnomatic",
  },
  {
    id: 321,
    name: "TE Connectivity",
  },
  {
    id: 2079,
    name: "TE Connectivity / Aerospace, Defense and Marine",
  },
  {
    id: 2120,
    name: "TE Connectivity / Agastat",
  },
  {
    id: 1166,
    name: "TE Connectivity / Alcoswitch",
  },
  {
    id: 914,
    name: "TE Connectivity / AMP",
  },
  {
    id: 10547,
    name: "TE Connectivity / Application Tooling",
  },
  {
    id: 1754,
    name: "TE Connectivity / Augat",
  },
  {
    id: 1884,
    name: "TE Connectivity / Axicom",
  },
  {
    id: 1465,
    name: "TE Connectivity / Buchanan",
  },
  {
    id: 1452,
    name: "TE Connectivity / CGS",
  },
  {
    id: 2591,
    name: "TE Connectivity / CII",
  },
  {
    id: 1769,
    name: "TE Connectivity / Citec",
  },
  {
    id: 1507,
    name: "TE Connectivity / Corcom",
  },
  {
    id: 2744,
    name: "TE Connectivity / Crompton",
  },
  {
    id: 10548,
    name: "TE Connectivity / Deutsch Connectors",
  },
  {
    id: 2777,
    name: "TE Connectivity Divested",
  },
  {
    id: 10549,
    name: "TE Connectivity / Elcon",
  },
  {
    id: 2479,
    name: "TE Connectivity / Entrelec",
  },
  {
    id: 16150,
    name: "te connectivity erni",
  },
  {
    id: 1772,
    name: "TE Connectivity / Greenpar",
  },
  {
    id: 4121,
    name: "TE Connectivity / Hirschmann",
  },
  {
    id: 1461,
    name: "TE Connectivity / Holsworthy",
  },
  {
    id: 1736,
    name: "TE Connectivity / Intercontec",
  },
  {
    id: 1609,
    name: "TE Connectivity / Kilovac",
  },
  {
    id: 2041,
    name: "TE Connectivity / Kissling",
  },
  {
    id: 18193,
    name: "TE Connectivity Laird",
  },
  {
    id: 2231,
    name: "TE Connectivity / Measurement Specialties",
  },
  {
    id: 1855,
    name: "TE Connectivity / Neohm",
  },
  {
    id: 2468,
    name: "TE Connectivity / OEG",
  },
  {
    id: 1991,
    name: "TE Connectivity / Passive Product",
  },
  {
    id: 2135,
    name: "TE Connectivity / Polamco",
  },
  {
    id: 2071,
    name: "TE Connectivity / Potter & Brumfield Relays",
  },
  {
    id: 1388,
    name: "TE Connectivity / Raychem",
  },
  {
    id: 1663,
    name: "TE Connectivity / Schrack",
  },
  {
    id: 1358,
    name: "TE Connectivity / Sensor Solutions",
  },
  {
    id: 1605,
    name: "TE Connectivity / Sigma Inductors",
  },
  {
    id: 3510,
    name: "TE Connectivity / Simel",
  },
  {
    id: 14465,
    name: "Tectonic",
  },
  {
    id: 10501,
    name: "TEDEA HUNTLEIGH",
  },
  {
    id: 14519,
    name: "TEEPTRAK",
  },
  {
    id: 10950,
    name: "Teishin Electric",
  },
  {
    id: 1767,
    name: "Tektronix",
  },
  {
    id: 3467,
    name: "Tele",
  },
  {
    id: 2877,
    name: "Telecom design",
  },
  {
    id: 4042,
    name: "TELECONNECT GMBH",
  },
  {
    id: 5476,
    name: "TELEDYNE",
  },
  {
    id: 13488,
    name: "Teledyne e2v",
  },
  {
    id: 3860,
    name: "Teledyne FLIR",
  },
  {
    id: 1560,
    name: "Teledyne Lecroy",
  },
  {
    id: 2227,
    name: "Teledyne Relays",
  },
  {
    id: 1636,
    name: "Teledyne Technologies",
  },
  {
    id: 10887,
    name: "Telegärtner",
  },
  {
    id: 2758,
    name: "Telemecanique Sensors",
  },
  {
    id: 1016,
    name: "Telic AG",
  },
  {
    id: 6826,
    name: "TELINK",
  },
  {
    id: 1015,
    name: "Telit",
  },
  {
    id: 19447,
    name: "Telit Wireless Solutions",
  },
  {
    id: 3003,
    name: "Telson",
  },
  {
    id: 2817,
    name: "Teltonika",
  },
  {
    id: 3148,
    name: "Temex SAS",
  },
  {
    id: 3465,
    name: "Tempatron",
  },
  {
    id: 3412,
    name: "Tempo",
  },
  {
    id: 12554,
    name: "Tempo Semiconductor",
  },
  {
    id: 10578,
    name: "Teng Tools",
  },
  {
    id: 1640,
    name: "Tenma",
  },
  {
    id: 13775,
    name: "Tensator",
  },
  {
    id: 13828,
    name: "Tente",
  },
  {
    id: 1517,
    name: "Terabee",
  },
  {
    id: 1385,
    name: "Terasic Technologies",
  },
  {
    id: 3473,
    name: "Teroson",
  },
  {
    id: 14815,
    name: "Terry",
  },
  {
    id: 2636,
    name: "Tesa",
  },
  {
    id: 2569,
    name: "Testec",
  },
  {
    id: 541,
    name: "Testo",
  },
  {
    id: 17040,
    name: "tewa sensors llc",
  },
  {
    id: 3682,
    name: "Texas Advanced Optoelectronic Solutions",
  },
  {
    id: 3681,
    name: "Texas Instruments Inc",
  },
  {
    id: 22892,
    name: "TEXAS / UNITRODE / BURR BROWN",
  },
  {
    id: 1303,
    name: "TFK",
  },
  {
    id: 3547,
    name: "T-Global",
  },
  {
    id: 9144,
    name: "t-Global Technology",
  },
  {
    id: 1774,
    name: "Thales DIS AIS Deutschland GmbH",
  },
  {
    id: 2354,
    name: "THAT Corporation",
  },
  {
    id: 14806,
    name: "Theale",
  },
  {
    id: 13787,
    name: "Theben / Timeguard",
  },
  {
    id: 14891,
    name: "The Dexter Corporation",
  },
  {
    id: 10638,
    name: "Thermaltronics",
  },
  {
    id: 2454,
    name: "Thermodata",
  },
  {
    id: 2778,
    name: "Thermodisc",
  },
  {
    id: 14160,
    name: "Thermo Electric Devices",
  },
  {
    id: 3162,
    name: "Thermostats",
  },
  {
    id: 19649,
    name: "The Safety Knife Company",
  },
  {
    id: 14773,
    name: "The Things Industries",
  },
  {
    id: 3212,
    name: "Thine",
  },
  {
    id: 10951,
    name: "THine Electronics",
  },
  {
    id: 14805,
    name: "THine Solutions Inc.",
  },
  {
    id: 20864,
    name: "thingmagic, a jadak brand",
  },
  {
    id: 19837,
    name: "thinking electronics industrial co.",
  },
  {
    id: 10596,
    name: "THK",
  },
  {
    id: 10639,
    name: "Thomas & Betts",
  },
  {
    id: 10614,
    name: "Thomson Linear",
  },
  {
    id: 14454,
    name: "Thorlux Lighting",
  },
  {
    id: 2104,
    name: "Tianma Microelectronics",
  },
  {
    id: 13847,
    name: "Tilsatec",
  },
  {
    id: 13875,
    name: "Timberland",
  },
  {
    id: 3631,
    name: "TIMEGUARD",
  },
  {
    id: 20663,
    name: "TIMES MICROWAVE SYSTEMS",
  },
  {
    id: 13690,
    name: "Timken",
  },
  {
    id: 2457,
    name: "Tinkerforge",
  },
  {
    id: 2630,
    name: "TinyCircuits",
  },
  {
    id: 3204,
    name: "Titanmec",
  },
  {
    id: 14177,
    name: "Tivoly",
  },
  {
    id: 10487,
    name: "TME",
  },
  {
    id: 22360,
    name: "TMW (TAJIMI ELECTRONICS)",
  },
  {
    id: 20042,
    name: "TOA Corp.",
  },
  {
    id: 7680,
    name: "TOCOS",
  },
  {
    id: 11687,
    name: "TOKEN",
  },
  {
    id: 1136,
    name: "Toko",
  },
  {
    id: 15480,
    name: "Tokyo Coil",
  },
  {
    id: 14653,
    name: "TomTom",
  },
  {
    id: 3298,
    name: "Toppoly",
  },
  {
    id: 2291,
    name: "Toradex",
  },
  {
    id: 2804,
    name: "Torex Semiconductor Ltd",
  },
  {
    id: 10691,
    name: "Tork",
  },
  {
    id: 13950,
    name: "TOSACA",
  },
  {
    id: 1108,
    name: "Toshiba",
  },
  {
    id: 3882,
    name: "Toshiba America Electronic Components Inc",
  },
  {
    id: 2006,
    name: "Toshiba Semiconductor and Storage",
  },
  {
    id: 19838,
    name: "touchstone semiconductor",
  },
  {
    id: 10632,
    name: "Toughcon",
  },
  {
    id: 3021,
    name: "Toyocom",
  },
  {
    id: 10971,
    name: "Toyogiken",
  },
  {
    id: 5653,
    name: "TOYOTA",
  },
  {
    id: 10942,
    name: "Toyozumi",
  },
  {
    id: 2643,
    name: "TP-Link",
  },
  {
    id: 2878,
    name: "Tracknet",
  },
  {
    id: 9141,
    name: "TRACO Electronic AG",
  },
  {
    id: 1738,
    name: "Traco Power",
  },
  {
    id: 15226,
    name: "Trademark Fine Art",
  },
  {
    id: 19644,
    name: "Traffi",
  },
  {
    id: 14826,
    name: "Transair",
  },
  {
    id: 19592,
    name: "Transcend",
  },
  {
    id: 2356,
    name: "TransERA",
  },
  {
    id: 3184,
    name: "TranSwitch",
  },
  {
    id: 14043,
    name: "Trelleborg",
  },
  {
    id: 3488,
    name: "Trenz Electronic GmbH",
  },
  {
    id: 10565,
    name: "Treston",
  },
  {
    id: 1512,
    name: "TR Fastenings",
  },
  {
    id: 1838,
    name: "Triad Magnetics",
  },
  {
    id: 14807,
    name: "TRICOFLEX",
  },
  {
    id: 14508,
    name: "Trident Engineering",
  },
  {
    id: 2440,
    name: "Trident Microsystems",
  },
  {
    id: 9551,
    name: "TRIDONIC",
  },
  {
    id: 2545,
    name: "Trinamic Motion Control GmbH",
  },
  {
    id: 1463,
    name: "Tripp Lite",
  },
  {
    id: 19797,
    name: "Tripus",
  },
  {
    id: 10850,
    name: "TriQuint Semiconductor",
  },
  {
    id: 3291,
    name: "Tri-Star",
  },
  {
    id: 2285,
    name: "Tri-Star Electronics",
  },
  {
    id: 3450,
    name: "Tri-Star Industries Inc",
  },
  {
    id: 3243,
    name: "Tritech",
  },
  {
    id: 2487,
    name: "Triton",
  },
  {
    id: 22381,
    name: "Triton Controls",
  },
  {
    id: 2154,
    name: "Trompeter / Cinch Connectivity Solutions",
  },
  {
    id: 3468,
    name: "Tronics",
  },
  {
    id: 1661,
    name: "TRP Connector / Bel",
  },
  {
    id: 2767,
    name: "Trumeter",
  },
  {
    id: 2513,
    name: "Trust",
  },
  {
    id: 14011,
    name: "TSLC",
  },
  {
    id: 15002,
    name: "TST - Tamsan",
  },
  {
    id: 13678,
    name: "Tsubaki",
  },
  {
    id: 4831,
    name: "TT EIectronics",
  },
  {
    id: 2319,
    name: "TT Electronics",
  },
  {
    id: 10518,
    name: "TT Electronics / International Resistive Company (IRC)",
  },
  {
    id: 2296,
    name: "TT Electronics - IoT Solutions",
  },
  {
    id: 10521,
    name: "TT Electronics / Welwyn Components",
  },
  {
    id: 8189,
    name: "TTI",
  },
  {
    id: 2541,
    name: "TTI Inc Assembly",
  },
  {
    id: 9844,
    name: "TTI Taiwan",
  },
  {
    id: 13753,
    name: "Tufnol",
  },
  {
    id: 3404,
    name: "TUK",
  },
  {
    id: 3604,
    name: "TUL Corporation",
  },
  {
    id: 1251,
    name: "TURCK",
  },
  {
    id: 1967,
    name: "Tusonix / CTS",
  },
  {
    id: 1487,
    name: "Twin Industries",
  },
  {
    id: 2014,
    name: "TXC Corporation",
  },
  {
    id: 12398,
    name: "TYC",
  },
  {
    id: 10509,
    name: "TY-ITS",
  },
  {
    id: 14275,
    name: "Tyvek",
  },
  {
    id: 1865,
    name: "u-blox",
  },
  {
    id: 2352,
    name: "UDOO",
  },
  {
    id: 2077,
    name: "U.I. Lapp GmbH (Lapp-Group Company)",
  },
  {
    id: 3077,
    name: "UIY",
  },
  {
    id: 2624,
    name: "Ultimaker",
  },
  {
    id: 2495,
    name: "Ultrafuse",
  },
  {
    id: 2131,
    name: "Ultralife",
  },
  {
    id: 2725,
    name: "Unbranded",
  },
  {
    id: 13825,
    name: "Uneek",
  },
  {
    id: 20019,
    name: "UNICOM",
  },
  {
    id: 19269,
    name: "unictron technologies corporation",
  },
  {
    id: 14180,
    name: "UNIFIX VORTEX",
  },
  {
    id: 14099,
    name: "Uniglove",
  },
  {
    id: 3013,
    name: "Uniohm",
  },
  {
    id: 3266,
    name: "Union Semiconductor",
  },
  {
    id: 14243,
    name: "Unipower",
  },
  {
    id: 1938,
    name: "Unisonic Technologies Company",
  },
  {
    id: 13842,
    name: "Unistrut",
  },
  {
    id: 14499,
    name: "Unitecnic",
  },
  {
    id: 2750,
    name: "United Automation",
  },
  {
    id: 1504,
    name: "United Chemi-Con",
  },
  {
    id: 10875,
    name: "United Monolithic Semiconductors",
  },
  {
    id: 2149,
    name: "United Radiant Technology",
  },
  {
    id: 2168,
    name: "UnitedSiC",
  },
  {
    id: 14407,
    name: "Univision",
  },
  {
    id: 1706,
    name: "Unknown Arrow Company",
  },
  {
    id: 4107,
    name: "uPI Semiconductor Corp",
  },
  {
    id: 14436,
    name: "UPower",
  },
  {
    id: 2403,
    name: "UrsaLeo",
  },
  {
    id: 14471,
    name: "UTZ",
  },
  {
    id: 10605,
    name: "Uvex",
  },
  {
    id: 13873,
    name: "UVOX",
  },
  {
    id: 13834,
    name: "V12 Footwear",
  },
  {
    id: 14830,
    name: "Vachette",
  },
  {
    id: 3237,
    name: "Vacuumschmelze",
  },
  {
    id: 17542,
    name: "VACUUMSCHMELZE",
  },
  {
    id: 8718,
    name: "Valens Semiconductor",
  },
  {
    id: 471,
    name: "Valueline",
  },
  {
    id: 10809,
    name: "Valukumpu",
  },
  {
    id: 1778,
    name: "Van Damme",
  },
  {
    id: 3071,
    name: "Vantis",
  },
  {
    id: 10975,
    name: "Variscite",
  },
  {
    id: 8393,
    name: "Varitronix",
  },
  {
    id: 2263,
    name: "Varta Microbattery",
  },
  {
    id: 1255,
    name: "VBsemi",
  },
  {
    id: 2393,
    name: "VCC (Visual Communications Company)",
  },
  {
    id: 20674,
    name: "VDC Trading",
  },
  {
    id: 2500,
    name: "Vector Electronics",
  },
  {
    id: 17935,
    name: "Vector Electronics & Technology",
  },
  {
    id: 3045,
    name: "Vectron",
  },
  {
    id: 13904,
    name: "Vega",
  },
  {
    id: 2121,
    name: "Velcro",
  },
  {
    id: 17774,
    name: "Velleman",
  },
  {
    id: 2680,
    name: "Velleman",
  },
  {
    id: 13811,
    name: "Vent-Axia",
  },
  {
    id: 13742,
    name: "Venture Lighting",
  },
  {
    id: 14277,
    name: "Verderflex",
  },
  {
    id: 1672,
    name: "Vero",
  },
  {
    id: 13857,
    name: "Vero Technologies",
  },
  {
    id: 18722,
    name: "VersaLogic",
  },
  {
    id: 18721,
    name: "Vertiv",
  },
  {
    id: 10955,
    name: "VIA Technologies",
  },
  {
    id: 14644,
    name: "Vicon",
  },
  {
    id: 2183,
    name: "Vicor Corporation",
  },
  {
    id: 14106,
    name: "Victorinox",
  },
  {
    id: 1407,
    name: "Videk",
  },
  {
    id: 2611,
    name: "Vigortronix",
  },
  {
    id: 10528,
    name: "Vikan",
  },
  {
    id: 3456,
    name: "Viking",
  },
  {
    id: 13520,
    name: "Viking Tech",
  },
  {
    id: 1659,
    name: "Visaton",
  },
  {
    id: 1671,
    name: "Vishay / BC Components",
  },
  {
    id: 2052,
    name: "Vishay / Beyschlag",
  },
  {
    id: 2434,
    name: "Vishay / Cera-Mite",
  },
  {
    id: 1456,
    name: "Vishay / Dale",
  },
  {
    id: 2156,
    name: "Vishay / Draloric",
  },
  {
    id: 3548,
    name: "Vishay / Electro-Films",
  },
  {
    id: 1786,
    name: "Vishay General Semiconductor",
  },
  {
    id: 2632,
    name: "Vishay / Huntington",
  },
  {
    id: 576,
    name: "Vishay Intertechnology",
  },
  {
    id: 10507,
    name: "Vishay / MCB Industries",
  },
  {
    id: 2538,
    name: "Vishay / Milwaukee",
  },
  {
    id: 2151,
    name: "Vishay Precision Group Foil Resistors",
  },
  {
    id: 2056,
    name: "Vishay / Roederstein",
  },
  {
    id: 2015,
    name: "Vishay Semiconductor Diodes Division",
  },
  {
    id: 2240,
    name: "Vishay Semiconductor Opto Division",
  },
  {
    id: 260,
    name: "Vishay Semiconductors",
  },
  {
    id: 1758,
    name: "Vishay / Sfernice",
  },
  {
    id: 1431,
    name: "Vishay / Siliconix",
  },
  {
    id: 13540,
    name: "Vishay Small Signal",
  },
  {
    id: 2133,
    name: "Vishay / Spectrol",
  },
  {
    id: 1474,
    name: "Vishay / Sprague",
  },
  {
    id: 2282,
    name: "Vishay / Techno",
  },
  {
    id: 2185,
    name: "Vishay / Thin Film",
  },
  {
    id: 1945,
    name: "Vishay / Vitramon",
  },
  {
    id: 14143,
    name: "Viso",
  },
  {
    id: 17545,
    name: "Visual Communications Company",
  },
  {
    id: 14717,
    name: "VITAL",
  },
  {
    id: 3163,
    name: "Vitesse",
  },
  {
    id: 3506,
    name: "Vitriohm",
  },
  {
    id: 2299,
    name: "Vitrohm",
  },
  {
    id: 8720,
    name: "VLSI",
  },
  {
    id: 2187,
    name: "Volex",
  },
  {
    id: 15174,
    name: "Voltronics",
  },
  {
    id: 3437,
    name: "Vorago",
  },
  {
    id: 2178,
    name: "VOTOO",
  },
  {
    id: 19322,
    name: "Vox Power Ltd",
  },
  {
    id: 14226,
    name: "VPG Foil Resistors",
  },
  {
    id: 15157,
    name: "VPT Components",
  },
  {
    id: 2279,
    name: "V-TAC",
  },
  {
    id: 10563,
    name: "Vulcascot",
  },
  {
    id: 2528,
    name: "VXI Power",
  },
  {
    id: 16127,
    name: "vybronics inc",
  },
  {
    id: 4064,
    name: "WACHENDORFF",
  },
  {
    id: 14907,
    name: "Wacoal",
  },
  {
    id: 14081,
    name: "Wade",
  },
  {
    id: 2590,
    name: "WAGO Corporation",
  },
  {
    id: 2759,
    name: "Wah Hing",
  },
  {
    id: 1734,
    name: "Wakefield-Vette Inc",
  },
  {
    id: 2736,
    name: "Waldmann",
  },
  {
    id: 1283,
    name: "Waldom Electronics",
  },
  {
    id: 2245,
    name: "Walsin Technology Corporation",
  },
  {
    id: 2739,
    name: "Walther",
  },
  {
    id: 2353,
    name: "Wandboard",
  },
  {
    id: 14009,
    name: "WASP",
  },
  {
    id: 2879,
    name: "Wavecom S.A",
  },
  {
    id: 2322,
    name: "Wayon Circuit Protection Company",
  },
  {
    id: 1966,
    name: "Webro",
  },
  {
    id: 13907,
    name: "WECO",
  },
  {
    id: 19586,
    name: "weco electrical connectors inc.",
  },
  {
    id: 1540,
    name: "WeEn Semiconductors",
  },
  {
    id: 13725,
    name: "WEG",
  },
  {
    id: 3610,
    name: "Weicon",
  },
  {
    id: 1558,
    name: "Weidmuller",
  },
  {
    id: 9687,
    name: "WEIPU",
  },
  {
    id: 14272,
    name: "Welding Star",
  },
  {
    id: 2394,
    name: "Well Buying",
  },
  {
    id: 2195,
    name: "Weller",
  },
  {
    id: 10600,
    name: "Wenger",
  },
  {
    id: 14452,
    name: "WEPTECH",
  },
  {
    id: 1703,
    name: "Wera",
  },
  {
    id: 1646,
    name: "Werma",
  },
  {
    id: 20210,
    name: "West Controls Solutions",
  },
  {
    id: 2870,
    name: "Western Digital",
  },
  {
    id: 2441,
    name: "Western Digital Deutschland",
  },
  {
    id: 13625,
    name: "Whirlpool",
  },
  {
    id: 2453,
    name: "White-Rodgers",
  },
  {
    id: 2580,
    name: "Wi2Wi",
  },
  {
    id: 9465,
    name: "WIELAND",
  },
  {
    id: 1641,
    name: "Wieland Electric",
  },
  {
    id: 1719,
    name: "Wiha",
  },
  {
    id: 14866,
    name: "Wika Instruments",
  },
  {
    id: 13944,
    name: "William Whiteley & Sons",
  },
  {
    id: 14916,
    name: "Willow Technologies",
  },
  {
    id: 19316,
    name: "Wilo UK LTD",
  },
  {
    id: 1889,
    name: "Wima",
  },
  {
    id: 2239,
    name: "Winbond Electronics",
  },
  {
    id: 19222,
    name: "Winbond Electronics Corporation",
  },
  {
    id: 13708,
    name: "Winchester Electronics",
  },
  {
    id: 19801,
    name: "winchester interconnect",
  },
  {
    id: 4517,
    name: "WINSEN",
  },
  {
    id: 16166,
    name: "Winslow Adaptics",
  },
  {
    id: 19832,
    name: "winstar display co.ltd",
  },
  {
    id: 1922,
    name: "Wiremold",
  },
  {
    id: 2615,
    name: "Wiska",
  },
  {
    id: 5780,
    name: "Wisol",
  },
  {
    id: 2562,
    name: "WIZnet",
  },
  {
    id: 3352,
    name: "Wolfson Microelectronics",
  },
  {
    id: 1514,
    name: "Wolfspeed / Cree",
  },
  {
    id: 9391,
    name: "Wolfspeed Inc",
  },
  {
    id: 3531,
    name: "Wolsey",
  },
  {
    id: 1629,
    name: "W+P Products GmbH",
  },
  {
    id: 14142,
    name: "W Sohngen",
  },
  {
    id: 3065,
    name: "Wurth Electronics",
  },
  {
    id: 3387,
    name: "Wurth Elektronik / Midcom",
  },
  {
    id: 15233,
    name: "Wuxi",
  },
  {
    id: 2682,
    name: "Wylex",
  },
  {
    id: 3206,
    name: "XC Fuse",
  },
  {
    id: 2519,
    name: "Xeltek",
  },
  {
    id: 3246,
    name: "Xiamen Faratronic Co Ltd",
  },
  {
    id: 2287,
    name: "Xicon",
  },
  {
    id: 1341,
    name: "Xicor",
  },
  {
    id: 1957,
    name: "Xilinx Inc.",
  },
  {
    id: 14006,
    name: "XinaBox",
  },
  {
    id: 1996,
    name: "XinaBox Limited",
  },
  {
    id: 3255,
    name: "Xingxia Xingri",
  },
  {
    id: 1374,
    name: "XMOS",
  },
  {
    id: 10361,
    name: "XPELAIR",
  },
  {
    id: 1314,
    name: "XP Power",
  },
  {
    id: 2295,
    name: "Xsens",
  },
  {
    id: 14004,
    name: "Xylem Flojet",
  },
  {
    id: 14451,
    name: "Xylem Jabsco",
  },
  {
    id: 14209,
    name: "Xylem Lowara",
  },
  {
    id: 14641,
    name: "Xylem LVM",
  },
  {
    id: 1223,
    name: "Yageo",
  },
  {
    id: 14761,
    name: "Yale",
  },
  {
    id: 14767,
    name: "Yale Hoists",
  },
  {
    id: 5760,
    name: "YAMAHA",
  },
  {
    id: 2084,
    name: "Yamaichi Electronics",
  },
  {
    id: 5720,
    name: "YAZAKI",
  },
  {
    id: 2420,
    name: "Yeebo",
  },
  {
    id: 15328,
    name: "Yellow Jacket",
  },
  {
    id: 16861,
    name: "yenyo technology",
  },
  {
    id: 20115,
    name: "yokowo manufacturing of america",
  },
  {
    id: 19798,
    name: "Yuasa Battery Co",
  },
  {
    id: 10592,
    name: "Zarges",
  },
  {
    id: 3054,
    name: "Zarlink",
  },
  {
    id: 5754,
    name: "ZEBRA",
  },
  {
    id: 5904,
    name: "ZENTEL",
  },
  {
    id: 4049,
    name: "Zentel Japan",
  },
  {
    id: 14520,
    name: "Zep",
  },
  {
    id: 14201,
    name: "Zerynth",
  },
  {
    id: 1617,
    name: "Zetex",
  },
  {
    id: 1824,
    name: "ZF Electronics",
  },
  {
    id: 2952,
    name: "Zhenjiang Runzhe Electronic Connector Factory",
  },
  {
    id: 1366,
    name: "Zilog",
  },
  {
    id: 3574,
    name: "ZMD",
  },
  {
    id: 14643,
    name: "Zortrax",
  },
  {
    id: 14163,
    name: "ZYMBIT",
  },
  {
    id: 16716,
    name: "三田電波",
  },
];

export default manufacturers;
