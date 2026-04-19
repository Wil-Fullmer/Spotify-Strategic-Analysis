// Annual financials from AllReports.csv (USD millions)
export const annualIncome = [
  { year: 2019, revenue: 7579, grossProfit: 1929, operatingIncome: -82,  netIncome: -208,  grossMargin: 25.46, opMargin: -1.08 },
  { year: 2020, revenue: 9625, grossProfit: 2461, operatingIncome: -358, netIncome: -710,  grossMargin: 25.57, opMargin: -3.72 },
  { year: 2021, revenue: 10993,grossProfit: 2946, operatingIncome: 107,  netIncome: -39,   grossMargin: 26.80, opMargin:  0.97 },
  { year: 2022, revenue: 12553,grossProfit: 3132, operatingIncome: -705, netIncome: -460,  grossMargin: 24.95, opMargin: -5.62 },
  { year: 2023, revenue: 14621,grossProfit: 3773, operatingIncome: -492, netIncome: -587,  grossMargin: 25.81, opMargin: -3.37 },
  { year: 2024, revenue: 16227,grossProfit: 4909, operatingIncome: 1413, netIncome: 1178,  grossMargin: 30.25, opMargin:  8.71 },
  { year: 2025, revenue: 20186,grossProfit: 6455, operatingIncome: 2582, netIncome: 2598,  grossMargin: 31.98, opMargin: 12.79 },
]

// Quarterly KPIs — Q1 2024 through Q4 2025 (EUR millions for financials, millions for users)
// Q1–Q3 2024 sourced from prior-year comparatives in 2025 shareholder decks
export const quarterlyKPIs = [
  {
    quarter: 'Q1 2024',
    mau: 615, premiumSubs: 239, adMAU: 388,
    premiumRevenue: 3247, adRevenue: 389, totalRevenue: 3636,
    grossProfit: 1145, grossMargin: 31.5, opIncome: 168, opMargin: 4.6,
    fcf: 172,
  },
  {
    quarter: 'Q2 2024',
    mau: 626, premiumSubs: 246, adMAU: 393,
    premiumRevenue: 3351, adRevenue: 456, totalRevenue: 3807,
    grossProfit: 1210, grossMargin: 31.8, opIncome: 266, opMargin: 7.0,
    fcf: 313,
  },
  {
    quarter: 'Q3 2024',
    mau: 640, premiumSubs: 252, adMAU: 402,
    premiumRevenue: 3516, adRevenue: 472, totalRevenue: 3988,
    grossProfit: 1274, grossMargin: 31.9, opIncome: 454, opMargin: 11.4,
    fcf: 659,
  },
  {
    quarter: 'Q4 2024',
    mau: 675, premiumSubs: 263, adMAU: 425,
    premiumRevenue: 3705, adRevenue: 537, totalRevenue: 4242,
    grossProfit: 1368, grossMargin: 32.2, opIncome: 477, opMargin: 11.2,
    fcf: 877,
  },
  {
    quarter: 'Q1 2025',
    mau: 678, premiumSubs: 268, adMAU: 423,
    premiumRevenue: 3771, adRevenue: 419, totalRevenue: 4190,
    grossProfit: 1326, grossMargin: 31.6, opIncome: 509, opMargin: 12.1,
    fcf: 398,
  },
  {
    quarter: 'Q2 2025',
    mau: 696, premiumSubs: 276, adMAU: 433,
    premiumRevenue: 3740, adRevenue: 453, totalRevenue: 4193,
    grossProfit: 1320, grossMargin: 31.5, opIncome: 406, opMargin: 9.7,
    fcf: 469,
  },
  {
    quarter: 'Q3 2025',
    mau: 713, premiumSubs: 281, adMAU: 446,
    premiumRevenue: 3826, adRevenue: 446, totalRevenue: 4272,
    grossProfit: 1351, grossMargin: 31.6, opIncome: 582, opMargin: 13.6,
    fcf: 806,
  },
  {
    quarter: 'Q4 2025',
    mau: 751, premiumSubs: 290, adMAU: 476,
    premiumRevenue: 4013, adRevenue: 518, totalRevenue: 4531,
    grossProfit: 1499, grossMargin: 33.1, opIncome: 701, opMargin: 15.5,
    fcf: 834,
  },
]

// Annual headcount
export const headcount = [
  { year: 2019, employees: 4405 },
  { year: 2020, employees: 5584 },
  { year: 2021, employees: 6617 },
  { year: 2022, employees: 8359 },
  { year: 2023, employees: 9123 },
  { year: 2024, employees: 7691 },
  { year: 2025, employees: 7287 },
]

// Annual free cash flow (USD millions)
export const annualFCF = [
  { year: 2019, fcf: 491 },
  { year: 2020, fcf: 221 },
  { year: 2021, fcf: 314 },
  { year: 2022, fcf: 22  },
  { year: 2023, fcf: 744 },
  { year: 2024, fcf: 2365},
  { year: 2025, fcf: 3373},
]

// Competitor comparison — paid subscribers & free-tier users (millions)
// Sources: Spotify Q4 2025 Shareholder Deck (Spotify figures);
// Apple Music ~93M per Apple Services disclosure (2023); Amazon Music & YouTube Music
// ~100M each per MIDiA Research Global Music Subscription Market Report 2024.
// Free-tier figures: Spotify Q4 2025 deck; Apple Music, Amazon Music, YouTube Music
// operate paid-only or bundle-only models with no standalone free tier.
export const competitorSubs = [
  { platform: 'Spotify',       paidSubs: 290, freeSubs: 461 },
  { platform: 'Apple Music',   paidSubs: 93,  freeSubs: 0   },
  { platform: 'Amazon Music',  paidSubs: 100, freeSubs: 0   },
  { platform: 'YouTube Music', paidSubs: 100, freeSubs: 0   },
]

// Global music streaming market share by revenue (%)
// Source: MIDiA Research Global Music Subscription Market Report 2024
export const marketShare = [
  { platform: 'Spotify',       share: 31 },
  { platform: 'Apple Music',   share: 15 },
  { platform: 'Amazon Music',  share: 13 },
  { platform: 'YouTube Music', share: 10 },
  { platform: 'Others',        share: 31 },
]

// Q1 2026 guidance
export const q1_2026_guidance = {
  totalRevenue: 4500,
  grossMargin: 32.8,
  opIncome: 660,
  revenueGrowthFXN: 15,
}
