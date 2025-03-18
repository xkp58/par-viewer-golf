
export type Player = {
  id: number;
  name: string;
  scores: number[];
  totalScore: number;
};

export type GolfGameResult = {
  clubName: string;
  clubImage: string;
  courseName: string;
  teeTime: string;
  startTime: string;
  finishTime: string;
  date: string;
  par: number[];
  players: Player[];
};

export const golfGameResult: GolfGameResult = {
  clubName: "Pebble Beach Golf Links",
  clubImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
  courseName: "Championship Course",
  teeTime: "08:30 AM",
  startTime: "08:35 AM",
  finishTime: "12:45 PM",
  date: "June 15, 2023",
  par: [4, 5, 3, 4, 4, 5, 3, 4, 4, 4, 4, 3, 4, 5, 4, 3, 4, 5],
  players: [
    {
      id: 1,
      name: "Michael Chen",
      scores: [4, 5, 3, 4, 4, 6, 2, 4, 4, 4, 4, 2, 3, 5, 4, 3, 5, 4],
      totalScore: 70
    },
    {
      id: 2,
      name: "Sarah Johnson",
      scores: [5, 6, 3, 5, 4, 5, 3, 5, 5, 5, 3, 3, 4, 4, 5, 2, 4, 6],
      totalScore: 77
    },
    {
      id: 3,
      name: "David Thompson",
      scores: [4, 5, 4, 5, 5, 7, 4, 4, 5, 4, 5, 4, 5, 5, 4, 4, 4, 5],
      totalScore: 83
    },
    {
      id: 4,
      name: "Emma Wilson",
      scores: [5, 7, 4, 6, 5, 6, 3, 5, 4, 5, 4, 3, 5, 6, 5, 3, 5, 6],
      totalScore: 87
    }
  ]
};

// Calculate player position by score
export const calculatePositions = (players: Player[]): { [key: number]: number } => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const positions: { [key: number]: number } = {};
  
  sortedPlayers.forEach((player, index) => {
    if (index > 0 && player.totalScore === sortedPlayers[index - 1].totalScore) {
      positions[player.id] = positions[sortedPlayers[index - 1].id];
    } else {
      positions[player.id] = index + 1;
    }
  });
  
  return positions;
};

// Calculate if player is over or under par
export const calculateParStatus = (score: number, parTotal: number): string => {
  const diff = score - parTotal;
  if (diff === 0) return "E";
  return diff > 0 ? `+${diff}` : `${diff}`;
};
