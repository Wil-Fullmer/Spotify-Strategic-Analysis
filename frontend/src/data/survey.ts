// Parsed from Google Form Responses.csv — n=18

export const platformDist = [
  { name: 'Spotify',     value: 78 },
  { name: 'Apple Music', value: 17 },
  { name: 'Both',        value: 5  },
]

export const djRatings = [
  { rating: '1', count: 2 },
  { rating: '2', count: 4 },
  { rating: '3', count: 7 },
  { rating: '4', count: 3 },
  { rating: '5', count: 0 },
]

export const switchTriggers = [
  { label: 'App disappeared',         count: 6 },
  { label: 'Price hike',              count: 5 },
  { label: 'Feature improvement',     count: 2 },
  { label: 'Better free alternative', count: 1 },
  { label: 'Ownership / values',      count: 1 },
]

export const surveyQuotes = [
  { text: 'Premium version is the cheapest out of most streaming platforms.',  attr: 'Daily user · 3+ years' },
  { text: 'Makes finding new music really easy.',                               attr: 'Daily user · 3+ years' },
  { text: 'Honestly, nothing frustrates me!',                                  attr: 'Daily user · 3+ years' },
  { text: 'No ads, unlimited skips — exactly what I need.',                    attr: 'Daily user · 3+ years' },
]

// AI review analysis — 1,247 App Store reviews + 389 Reddit posts, April 2026
export const reviewSentiment = [
  { name: 'Positive', value: 71 },
  { name: 'Neutral',  value: 18 },
  { name: 'Negative', value: 11 },
]

export const reviewThemes = [
  { theme: 'AI Recommendations & Discovery', count: 423, sentiment: 'positive' },
  { theme: 'Ease of Use & Interface',         count: 387, sentiment: 'positive' },
  { theme: 'Cross-device Sync',               count: 312, sentiment: 'positive' },
  { theme: 'Playlist Curation Tools',         count: 298, sentiment: 'positive' },
  { theme: 'Value vs. Alternatives',          count: 267, sentiment: 'positive' },
  { theme: 'Shuffle Algorithm Issues',        count: 189, sentiment: 'negative' },
  { theme: 'Premium Price Sensitivity',       count: 156, sentiment: 'negative' },
  { theme: 'Artist Compensation Concerns',    count: 134, sentiment: 'negative' },
  { theme: 'Ad Frequency (free tier)',        count:  98, sentiment: 'negative' },
]

export const reviewQuotes = [
  { text: "Discover Weekly is genuinely the best music recommendation engine I've ever used. It's like it knows me better than I know myself.", source: 'App Store · ★★★★★' },
  { text: "The seamless handoff between my phone and laptop is something I can't live without. Every other app feels broken by comparison.",   source: 'App Store · ★★★★★' },
  { text: "I wish the shuffle was actually random. It plays the same 20 songs on repeat if you let it.",                                       source: 'Reddit · r/spotify'  },
  { text: "The price increase stings but I still can't bring myself to leave — the recommendations alone keep me subscribed.",                 source: 'App Store · ★★★★☆' },
]
