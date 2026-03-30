// src/utils/dummyData.js

export const DUMMY_CROPS = [
  {
    id: "1",
    name: "گندم (Wheat)",
    date: "30 مارچ 2026",
    maxPrice: 4900,
    minPrice: 4300,
    trend: "up",
    percentage: "+1.5%",
  },
  {
    id: "2",
    name: "کپاس (Cotton)",
    date: "30 مارچ 2026",
    maxPrice: 8600,
    minPrice: 8100,
    trend: "down",
    percentage: "-0.5%",
  },
  {
    id: "3",
    name: "چاول (باسمتی) (Rice)",
    date: "30 مارچ 2026",
    maxPrice: 9100,
    minPrice: 8800,
    trend: "up",
    percentage: "+2.1%",
  },
];

// 30 Days of Date Selectors for the Horizontal Scroll
export const HISTORY_DATES = [
  {
    id: "d30",
    dayName: "MON",
    dateNum: "30",
    month: "مارچ",
    fullDate: "30 مارچ 2026",
  },
  {
    id: "d29",
    dayName: "SUN",
    dateNum: "29",
    month: "مارچ",
    fullDate: "29 مارچ 2026",
  },
  {
    id: "d28",
    dayName: "SAT",
    dateNum: "28",
    month: "مارچ",
    fullDate: "28 مارچ 2026",
  },
  {
    id: "d27",
    dayName: "FRI",
    dateNum: "27",
    month: "مارچ",
    fullDate: "27 مارچ 2026",
  },
  {
    id: "d26",
    dayName: "THU",
    dateNum: "26",
    month: "مارچ",
    fullDate: "26 مارچ 2026",
  },
  {
    id: "d25",
    dayName: "WED",
    dateNum: "25",
    month: "مارچ",
    fullDate: "25 مارچ 2026",
  },
  {
    id: "d24",
    dayName: "TUE",
    dateNum: "24",
    month: "مارچ",
    fullDate: "24 مارچ 2026",
  },
  {
    id: "d23",
    dayName: "MON",
    dateNum: "23",
    month: "مارچ",
    fullDate: "23 مارچ 2026",
  },
  {
    id: "d22",
    dayName: "SUN",
    dateNum: "22",
    month: "مارچ",
    fullDate: "22 مارچ 2026",
  },
  {
    id: "d21",
    dayName: "SAT",
    dateNum: "21",
    month: "مارچ",
    fullDate: "21 مارچ 2026",
  },
  {
    id: "d20",
    dayName: "FRI",
    dateNum: "20",
    month: "مارچ",
    fullDate: "20 مارچ 2026",
  },
  {
    id: "d19",
    dayName: "THU",
    dateNum: "19",
    month: "مارچ",
    fullDate: "19 مارچ 2026",
  },
  {
    id: "d18",
    dayName: "WED",
    dateNum: "18",
    month: "مارچ",
    fullDate: "18 مارچ 2026",
  },
  {
    id: "d17",
    dayName: "TUE",
    dateNum: "17",
    month: "مارچ",
    fullDate: "17 مارچ 2026",
  },
  {
    id: "d16",
    dayName: "MON",
    dateNum: "16",
    month: "مارچ",
    fullDate: "16 مارچ 2026",
  },
  {
    id: "d15",
    dayName: "SUN",
    dateNum: "15",
    month: "مارچ",
    fullDate: "15 مارچ 2026",
  },
  {
    id: "d14",
    dayName: "SAT",
    dateNum: "14",
    month: "مارچ",
    fullDate: "14 مارچ 2026",
  },
  {
    id: "d13",
    dayName: "FRI",
    dateNum: "13",
    month: "مارچ",
    fullDate: "13 مارچ 2026",
  },
  {
    id: "d12",
    dayName: "THU",
    dateNum: "12",
    month: "مارچ",
    fullDate: "12 مارچ 2026",
  },
  {
    id: "d11",
    dayName: "WED",
    dateNum: "11",
    month: "مارچ",
    fullDate: "11 مارچ 2026",
  },
  {
    id: "d10",
    dayName: "TUE",
    dateNum: "10",
    month: "مارچ",
    fullDate: "10 مارچ 2026",
  },
  {
    id: "d09",
    dayName: "MON",
    dateNum: "09",
    month: "مارچ",
    fullDate: "9 مارچ 2026",
  },
  {
    id: "d08",
    dayName: "SUN",
    dateNum: "08",
    month: "مارچ",
    fullDate: "8 مارچ 2026",
  },
  {
    id: "d07",
    dayName: "SAT",
    dateNum: "07",
    month: "مارچ",
    fullDate: "7 مارچ 2026",
  },
  {
    id: "d06",
    dayName: "FRI",
    dateNum: "06",
    month: "مارچ",
    fullDate: "6 مارچ 2026",
  },
  {
    id: "d05",
    dayName: "THU",
    dateNum: "05",
    month: "مارچ",
    fullDate: "5 مارچ 2026",
  },
  {
    id: "d04",
    dayName: "WED",
    dateNum: "04",
    month: "مارچ",
    fullDate: "4 مارچ 2026",
  },
  {
    id: "d03",
    dayName: "TUE",
    dateNum: "03",
    month: "مارچ",
    fullDate: "3 مارچ 2026",
  },
  {
    id: "d02",
    dayName: "MON",
    dateNum: "02",
    month: "مارچ",
    fullDate: "2 مارچ 2026",
  },
  {
    id: "d01",
    dayName: "SUN",
    dateNum: "01",
    month: "مارچ",
    fullDate: "1 مارچ 2026",
  },
];

// Generating 90 Records (3 Crops * 30 Days)
const generateHistory = () => {
  const records = [];
  const crops = [
    { name: "گندم (Wheat)", baseMax: 4800, baseMin: 4200 },
    { name: "کپاس (Cotton)", baseMax: 8500, baseMin: 8000 },
    { name: "چاول (باسمتی) (Rice)", baseMax: 9000, baseMin: 8600 },
  ];

  HISTORY_DATES.forEach((dateObj, index) => {
    crops.forEach((crop) => {
      // Add a little random variation so prices aren't identical every day
      const variation = Math.floor(Math.random() * 150) - 75;
      records.push({
        id: `h-${crop.name}-${dateObj.id}`,
        cropName: crop.name,
        fullDate: dateObj.fullDate,
        maxPrice: crop.baseMax + variation + index * 5, // Simulates slight inflation
        minPrice: crop.baseMin + variation + index * 5,
      });
    });
  });
  return records;
};

export const DUMMY_HISTORY = generateHistory();
