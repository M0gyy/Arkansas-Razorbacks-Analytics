export interface TeamMeta {
  espnId: number;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  mascot: string;
  emoji?: string;
}

export const TEAM_META_MAP: Record<string, TeamMeta> = {
  'Arkansas': { espnId: 8, abbreviation: 'ARK', primaryColor: '#9D2235', secondaryColor: '#FFFFFF', mascot: 'Razorbacks', emoji: '🐗' },
  'Alabama': { espnId: 333, abbreviation: 'BAMA', primaryColor: '#9E1B32', secondaryColor: '#FFFFFF', mascot: 'Crimson Tide', emoji: '🐘' },
  'Alcorn State': { espnId: 2010, abbreviation: 'ALCN', primaryColor: '#4B0082', secondaryColor: '#FFD700', mascot: 'Braves', emoji: '🏹' },
  'Arkansas State': { espnId: 2032, abbreviation: 'AST', primaryColor: '#CC0000', secondaryColor: '#000000', mascot: 'Red Wolves', emoji: '🐺' },
  'Auburn': { espnId: 2, abbreviation: 'AUB', primaryColor: '#0C2340', secondaryColor: '#E87722', mascot: 'Tigers', emoji: '🐯' },
  'BYU': { espnId: 252, abbreviation: 'BYU', primaryColor: '#002E5D', secondaryColor: '#FFFFFF', mascot: 'Cougars', emoji: '🐾' },
  'Cincinnati': { espnId: 2132, abbreviation: 'CIN', primaryColor: '#E00122', secondaryColor: '#000000', mascot: 'Bearcats', emoji: '🐾' },
  'Coastal Carolina': { espnId: 324, abbreviation: 'CCU', primaryColor: '#006F71', secondaryColor: '#A27752', mascot: 'Chanticleers', emoji: '🐓' },
  'Colorado State': { espnId: 36, abbreviation: 'CSU', primaryColor: '#1E4D2B', secondaryColor: '#C8C372', mascot: 'Rams', emoji: '🐏' },
  'Duke': { espnId: 150, abbreviation: 'DUKE', primaryColor: '#003087', secondaryColor: '#FFFFFF', mascot: 'Blue Devils', emoji: '😈' },
  'Eastern Illinois': { espnId: 2197, abbreviation: 'EIU', primaryColor: '#003366', secondaryColor: '#C0C0C0', mascot: 'Panthers', emoji: '🐆' },
  'FIU': { espnId: 2229, abbreviation: 'FIU', primaryColor: '#081E3F', secondaryColor: '#B89D18', mascot: 'Panthers', emoji: '🐆' },
  'Florida': { espnId: 57, abbreviation: 'UF', primaryColor: '#FA4616', secondaryColor: '#0021A5', mascot: 'Gators', emoji: '🐊' },
  'Florida A&M': { espnId: 2210, abbreviation: 'FAMU', primaryColor: '#E05206', secondaryColor: '#006B3F', mascot: 'Rattlers', emoji: '🐍' },
  'Georgia': { espnId: 61, abbreviation: 'UGA', primaryColor: '#BA0C2F', secondaryColor: '#000000', mascot: 'Bulldogs', emoji: '🐶' },
  'Georgia Southern': { espnId: 290, abbreviation: 'GASO', primaryColor: '#011E41', secondaryColor: '#FFFFFF', mascot: 'Eagles', emoji: '🦅' },
  'Kansas': { espnId: 2305, abbreviation: 'KU', primaryColor: '#0051BA', secondaryColor: '#E8000D', mascot: 'Jayhawks', emoji: '🐦' },
  'Kansas State': { espnId: 2306, abbreviation: 'KSU', primaryColor: '#512888', secondaryColor: '#A7A8AA', mascot: 'Wildcats', emoji: '🐱' },
  'Kent State': { espnId: 2309, abbreviation: 'KENT', primaryColor: '#002664', secondaryColor: '#EAAB00', mascot: 'Golden Flashes', emoji: '⚡' },
  'Kentucky': { espnId: 96, abbreviation: 'UK', primaryColor: '#0033A0', secondaryColor: '#FFFFFF', mascot: 'Wildcats', emoji: '🐱' },
  'Liberty': { espnId: 2335, abbreviation: 'LIB', primaryColor: '#00205B', secondaryColor: '#C41230', mascot: 'Flames', emoji: '🔥' },
  'Louisiana Tech': { espnId: 2348, abbreviation: 'LT', primaryColor: '#002F6C', secondaryColor: '#E31B23', mascot: 'Bulldogs', emoji: '🐶' },
  'LSU': { espnId: 99, abbreviation: 'LSU', primaryColor: '#461D7C', secondaryColor: '#FDD023', mascot: 'Tigers', emoji: '🐯' },
  'Memphis': { espnId: 235, abbreviation: 'MEM', primaryColor: '#003087', secondaryColor: '#8A8D8F', mascot: 'Tigers', emoji: '🐯' },
  'Mississippi State': { espnId: 344, abbreviation: 'MSST', primaryColor: '#660000', secondaryColor: '#FFFFFF', mascot: 'Bulldogs', emoji: '🐶' },
  'Missouri': { espnId: 142, abbreviation: 'MIZ', primaryColor: '#000000', secondaryColor: '#F1B82D', mascot: 'Tigers', emoji: '🐯' },
  'Missouri State': { espnId: 2623, abbreviation: 'MOST', primaryColor: '#5E0009', secondaryColor: '#FFFFFF', mascot: 'Bears', emoji: '🐻' },
  'New Mexico State': { espnId: 166, abbreviation: 'NMSU', primaryColor: '#8B0000', secondaryColor: '#FFFFFF', mascot: 'Aggies', emoji: '🤠' },
  'Nicholls State': { espnId: 2447, abbreviation: 'NICH', primaryColor: '#CC0000', secondaryColor: '#A7A8AA', mascot: 'Colonels', emoji: '⚔️' },
  'Northern Illinois': { espnId: 2459, abbreviation: 'NIU', primaryColor: '#BA0C2F', secondaryColor: '#000000', mascot: 'Huskies', emoji: '🐺' },
  'North Texas': { espnId: 249, abbreviation: 'UNT', primaryColor: '#00853E', secondaryColor: '#FFFFFF', mascot: 'Mean Green', emoji: '🦅' },
  'Notre Dame': { espnId: 87, abbreviation: 'ND', primaryColor: '#0C2340', secondaryColor: '#C99700', mascot: 'Fighting Irish', emoji: '☘️' },
  'Oklahoma': { espnId: 201, abbreviation: 'OU', primaryColor: '#841617', secondaryColor: '#FDF9D8', mascot: 'Sooners', emoji: '🐎' },
  'Oklahoma State': { espnId: 197, abbreviation: 'OKST', primaryColor: '#FF7300', secondaryColor: '#000000', mascot: 'Cowboys', emoji: '🤠' },
  'Ole Miss': { espnId: 145, abbreviation: 'MISS', primaryColor: '#00205B', secondaryColor: '#CE1126', mascot: 'Rebels', emoji: '🦈' },
  'Penn State': { espnId: 213, abbreviation: 'PSU', primaryColor: '#041E42', secondaryColor: '#FFFFFF', mascot: 'Nittany Lions', emoji: '🦁' },
  'Portland State': { espnId: 2502, abbreviation: 'PSU', primaryColor: '#154734', secondaryColor: '#FFFFFF', mascot: 'Vikings', emoji: '🛡️' },
  'Rice': { espnId: 242, abbreviation: 'RICE', primaryColor: '#00205B', secondaryColor: '#C0C0C0', mascot: 'Owls', emoji: '🦉' },
  'San Jose State': { espnId: 23, abbreviation: 'SJSU', primaryColor: '#0055A5', secondaryColor: '#E5A823', mascot: 'Spartans', emoji: '🛡️' },
  'South Carolina': { espnId: 2579, abbreviation: 'SCAR', primaryColor: '#73000A', secondaryColor: '#000000', mascot: 'Gamecocks', emoji: '🐓' },
  'TCU': { espnId: 2628, abbreviation: 'TCU', primaryColor: '#4D1979', secondaryColor: '#FFFFFF', mascot: 'Horned Frogs', emoji: '🐸' },
  'Tennessee': { espnId: 2633, abbreviation: 'TENN', primaryColor: '#FF8200', secondaryColor: '#FFFFFF', mascot: 'Volunteers', emoji: '🍊' },
  'Texas': { espnId: 251, abbreviation: 'TEX', primaryColor: '#BF5700', secondaryColor: '#FFFFFF', mascot: 'Longhorns', emoji: '🤘' },
  'Texas A&M': { espnId: 245, abbreviation: 'A&M', primaryColor: '#500000', secondaryColor: '#FFFFFF', mascot: 'Aggies', emoji: '👍' },
  'Texas State': { espnId: 326, abbreviation: 'TXST', primaryColor: '#501214', secondaryColor: '#8D734A', mascot: 'Bobcats', emoji: '🐱' },
  'Texas Tech': { espnId: 2641, abbreviation: 'TTU', primaryColor: '#CC0000', secondaryColor: '#000000', mascot: 'Red Raiders', emoji: '🤠' },
  'Toledo': { espnId: 2649, abbreviation: 'TOL', primaryColor: '#152B52', secondaryColor: '#F2A900', mascot: 'Rockets', emoji: '🚀' },
  'Tulsa': { espnId: 202, abbreviation: 'TLSA', primaryColor: '#002D62', secondaryColor: '#C59B27', mascot: 'Golden Hurricane', emoji: '🌀' },
  'UAB': { espnId: 5, abbreviation: 'UAB', primaryColor: '#006341', secondaryColor: '#CC9900', mascot: 'Blazers', emoji: '🐉' },
  'UAPB': { espnId: 2029, abbreviation: 'UAPB', primaryColor: '#000000', secondaryColor: '#DAA520', mascot: 'Golden Lions', emoji: '🦁' },
  'UTEP': { espnId: 2638, abbreviation: 'UTEP', primaryColor: '#041E42', secondaryColor: '#FF5F05', mascot: 'Miners', emoji: '⛏️' },
  'UT Martin': { espnId: 2630, abbreviation: 'UTM', primaryColor: '#002649', secondaryColor: '#F37021', mascot: 'Skyhawks', emoji: '🦅' },
  'Vanderbilt': { espnId: 238, abbreviation: 'VANDY', primaryColor: '#000000', secondaryColor: '#866D4B', mascot: 'Commodores', emoji: '⚓' },
  'Virginia Tech': { espnId: 259, abbreviation: 'VT', primaryColor: '#630031', secondaryColor: '#CF4420', mascot: 'Hokies', emoji: '🦃' },
  'Western Carolina': { espnId: 2717, abbreviation: 'WCU', primaryColor: '#592A8A', secondaryColor: '#C1A260', mascot: 'Catamounts', emoji: '🐆' },
  'Western Kentucky': { espnId: 98, abbreviation: 'WKU', primaryColor: '#B31942', secondaryColor: '#FFFFFF', mascot: 'Hilltoppers', emoji: '🔴' }
};

export function getTeamMeta(teamName: string): TeamMeta {
  // Direct match
  if (TEAM_META_MAP[teamName]) {
    return TEAM_META_MAP[teamName];
  }

  // Soft fuzzy match
  const normalized = teamName.toLowerCase();
  for (const [key, meta] of Object.entries(TEAM_META_MAP)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return meta;
    }
  }

  // Default fallback meta
  return {
    espnId: 0,
    abbreviation: teamName.substring(0, 4).toUpperCase(),
    primaryColor: '#374151',
    secondaryColor: '#9CA3AF',
    mascot: teamName,
    emoji: '🏈'
  };
}
