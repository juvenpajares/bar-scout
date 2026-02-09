export const bars = [
  {
    id: "bar_001",
    name: "The Buzzer Bar",
    location: { lat: 14.5547, lng: 121.0245 },
    address: "Poblacion, Makati",
    priceRange: "₱₱",
    vibeTags: ["Party", "Live Music"],
    openingHours: "18:00-02:00",
    avgBeerPrice: 120,
    entryFee: 200,
    ratingAvg: 4.1,
    reviewCount: 214,
    cautionBadge: {
      enabled: true,
      tags: ["Rude Bouncers", "Overpriced"]
    }
  },
  {
    id: "bar_002",
    name: "Lanai Lounge",
    location: { lat: 14.5532, lng: 121.0211 },
    address: "Salcedo Village, Makati",
    priceRange: "₱",
    vibeTags: ["Chill"],
    openingHours: "16:00-01:00",
    avgBeerPrice: 95,
    entryFee: 0,
    ratingAvg: 4.4,
    reviewCount: 102,
    cautionBadge: {
      enabled: false,
      tags: []
    }
  },
  {
    id: "bar_003",
    name: "Rooftop Pulse",
    location: { lat: 14.5619, lng: 121.0152 },
    address: "BGC, Taguig",
    priceRange: "₱₱₱",
    vibeTags: ["Party"],
    openingHours: "19:00-03:00",
    avgBeerPrice: 180,
    entryFee: 350,
    ratingAvg: 4.0,
    reviewCount: 89,
    cautionBadge: {
      enabled: true,
      tags: ["Rowdy Crowd"]
    }
  }
];

export const reviews = [
  {
    id: "review_001",
    barId: "bar_001",
    userId: "user_007",
    rating: 2,
    comment: "Bouncer was rude and beer was overpriced.",
    sentiment: {
      score: -0.8,
      labels: ["Rude Bouncers", "Overpriced"]
    },
    createdAt: "2025-02-14T21:10:00Z",
    helpfulVotes: 12
  },
  {
    id: "review_002",
    barId: "bar_002",
    userId: "user_021",
    rating: 5,
    comment: "Relaxed vibe and affordable drinks.",
    sentiment: {
      score: 0.7,
      labels: ["Chill", "Great Value"]
    },
    createdAt: "2025-02-12T20:05:00Z",
    helpfulVotes: 4
  }
];

export const liveReports = [
  {
    id: "report_001",
    barId: "bar_001",
    userId: "user_014",
    type: "Long Queue",
    description: "Line is around the block.",
    createdAt: "2025-02-14T22:00:00Z",
    expiresAt: "2025-02-15T02:00:00Z",
    helpfulVotes: 5,
    verified: true
  },
  {
    id: "report_002",
    barId: "bar_003",
    userId: "user_033",
    type: "Rowdy Crowd",
    description: "Crowd is rowdy; consider arriving later.",
    createdAt: "2025-02-14T23:15:00Z",
    expiresAt: "2025-02-15T02:15:00Z",
    helpfulVotes: 2,
    verified: true
  }
];
