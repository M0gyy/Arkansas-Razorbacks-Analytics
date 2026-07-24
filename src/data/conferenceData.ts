import { RAZORBACKS_SEASONS } from './razorbacksData';

export type ConferenceName = 'SEC' | 'Big Ten' | 'Big 12' | 'ACC' | 'G5 / Ind';

export interface ConferenceTeamEpa {
  teamName: string;
  shortName: string;
  logo: string;
  conference: ConferenceName;
  season: number;
  record: string;
  offenseEpa: number;
  defenseEpa: number; // Points added by opponent offense (lower/negative is better)
  specialTeamsEpa: number;
  netEpa: number;
  passEpa: number;
  rushEpa: number;
  successRate: number;
  defenseSuccessRate: number;
  stuffRate: number; // % of rush carries stopped at or behind LOS (lower is better for offense)
  opportunityRate: number; // % of rush carries gaining >= 4 yards (higher is better for offense)
  defensiveStuffRate: number; // % of opponent carries stuffed (higher is better)
  defensiveOpportunityRate: number; // % of opponent carries gaining >= 4 yards allowed (lower is better)
  isArkansas?: boolean;
}

// Base template definitions for major FBS programs
const BASE_TEAMS: { name: string; short: string; logo: string; conf: ConferenceName; tier: 'elite' | 'upper' | 'mid' | 'lower' }[] = [
  // SEC
  { name: 'Arkansas Razorbacks', short: 'Arkansas', logo: '🐗', conf: 'SEC', tier: 'mid' },
  { name: 'Georgia Bulldogs', short: 'Georgia', logo: '🐶', conf: 'SEC', tier: 'elite' },
  { name: 'Alabama Crimson Tide', short: 'Alabama', logo: '🐘', conf: 'SEC', tier: 'elite' },
  { name: 'Texas Longhorns', short: 'Texas', logo: '🤘', conf: 'SEC', tier: 'elite' },
  { name: 'Ole Miss Rebels', short: 'Ole Miss', logo: '🦈', conf: 'SEC', tier: 'upper' },
  { name: 'LSU Tigers', short: 'LSU', logo: '🐯', conf: 'SEC', tier: 'upper' },
  { name: 'Tennessee Volunteers', short: 'Tennessee', logo: '🍊', conf: 'SEC', tier: 'upper' },
  { name: 'Missouri Tigers', short: 'Missouri', logo: '🐯', conf: 'SEC', tier: 'upper' },
  { name: 'Texas A&M Aggies', short: 'Texas A&M', logo: '👍', conf: 'SEC', tier: 'upper' },
  { name: 'Oklahoma Sooners', short: 'Oklahoma', logo: '⭕', conf: 'SEC', tier: 'upper' },
  { name: 'Auburn Tigers', short: 'Auburn', logo: '🦅', conf: 'SEC', tier: 'mid' },
  { name: 'Florida Gators', short: 'Florida', logo: '🐊', conf: 'SEC', tier: 'mid' },
  { name: 'South Carolina Gamecocks', short: 'S. Carolina', logo: '🐔', conf: 'SEC', tier: 'mid' },
  { name: 'Kentucky Wildcats', short: 'Kentucky', logo: '🐱', conf: 'SEC', tier: 'mid' },
  { name: 'Vanderbilt Commodores', short: 'Vanderbilt', logo: '⚓', conf: 'SEC', tier: 'lower' },
  { name: 'Mississippi State Bulldogs', short: 'Miss State', logo: '🔔', conf: 'SEC', tier: 'lower' },

  // Big Ten
  { name: 'Ohio State Buckeyes', short: 'Ohio State', logo: '🌰', conf: 'Big Ten', tier: 'elite' },
  { name: 'Oregon Ducks', short: 'Oregon', logo: '🦆', conf: 'Big Ten', tier: 'elite' },
  { name: 'Penn State Nittany Lions', short: 'Penn State', logo: '🦁', conf: 'Big Ten', tier: 'upper' },
  { name: 'Michigan Wolverines', short: 'Michigan', logo: '〽️', conf: 'Big Ten', tier: 'upper' },
  { name: 'Indiana Hoosiers', short: 'Indiana', logo: '⚪', conf: 'Big Ten', tier: 'upper' },
  { name: 'Iowa Hawkeyes', short: 'Iowa', logo: '🦅', conf: 'Big Ten', tier: 'upper' },
  { name: 'USC Trojans', short: 'USC', logo: '✌️', conf: 'Big Ten', tier: 'mid' },
  { name: 'Wisconsin Badgers', short: 'Wisconsin', logo: '🦡', conf: 'Big Ten', tier: 'mid' },
  { name: 'Nebraska Cornhuskers', short: 'Nebraska', logo: '🌽', conf: 'Big Ten', tier: 'mid' },
  { name: 'Illinois Fighting Illini', short: 'Illinois', logo: '🔶', conf: 'Big Ten', tier: 'mid' },

  // Big 12
  { name: 'BYU Cougars', short: 'BYU', logo: '🤙', conf: 'Big 12', tier: 'upper' },
  { name: 'Iowa State Cyclones', short: 'Iowa State', logo: '🌪️', conf: 'Big 12', tier: 'upper' },
  { name: 'Kansas State Wildcats', short: 'Kansas St', logo: '🌾', conf: 'Big 12', tier: 'upper' },
  { name: 'Colorado Buffaloes', short: 'Colorado', logo: '🦬', conf: 'Big 12', tier: 'mid' },
  { name: 'Texas Tech Red Raiders', short: 'Texas Tech', logo: '🔫', conf: 'Big 12', tier: 'mid' },
  { name: 'Utah Utes', short: 'Utah', logo: '🏔️', conf: 'Big 12', tier: 'mid' },
  { name: 'TCU Horned Frogs', short: 'TCU', logo: '🐸', conf: 'Big 12', tier: 'mid' },
  { name: 'Oklahoma State Cowboys', short: 'Okla State', logo: '🤠', conf: 'Big 12', tier: 'mid' },

  // ACC
  { name: 'Miami Hurricanes', short: 'Miami', logo: '🙌', conf: 'ACC', tier: 'upper' },
  { name: 'Clemson Tigers', short: 'Clemson', logo: '🐾', conf: 'ACC', tier: 'elite' },
  { name: 'SMU Mustangs', short: 'SMU', logo: '🐎', conf: 'ACC', tier: 'upper' },
  { name: 'Louisville Cardinals', short: 'Louisville', logo: '🐦', conf: 'ACC', tier: 'mid' },
  { name: 'Pittsburgh Panthers', short: 'Pitt', logo: '🐆', conf: 'ACC', tier: 'mid' },
  { name: 'Florida State Seminoles', short: 'Florida St', logo: '🍢', conf: 'ACC', tier: 'mid' },
  { name: 'North Carolina Tar Heels', short: 'UNC', logo: '🐏', conf: 'ACC', tier: 'mid' },
  { name: 'NC State Wolfpack', short: 'NC State', logo: '🐺', conf: 'ACC', tier: 'mid' },

  // Group of 5 / Independents
  { name: 'Notre Dame Fighting Irish', short: 'Notre Dame', logo: '☘️', conf: 'G5 / Ind', tier: 'elite' },
  { name: 'Boise State Broncos', short: 'Boise State', logo: '🐴', conf: 'G5 / Ind', tier: 'upper' },
  { name: 'Memphis Tigers', short: 'Memphis', logo: '🐯', conf: 'G5 / Ind', tier: 'mid' },
  { name: 'Liberty Flames', short: 'Liberty', logo: '🦅', conf: 'G5 / Ind', tier: 'mid' },
  { name: 'Tulane Green Wave', short: 'Tulane', logo: '🌊', conf: 'G5 / Ind', tier: 'mid' },
  { name: 'Army Black Knights', short: 'Army', logo: '⚔️', conf: 'G5 / Ind', tier: 'mid' }
];

// Seeded pseudo-random variance for consistency across renders
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate full Conference EPA Dataset for any season
export function getConferenceEpaData(year: number): ConferenceTeamEpa[] {
  const arkSeason = RAZORBACKS_SEASONS.find((s) => s.season === year) || RAZORBACKS_SEASONS[0];

  const results: ConferenceTeamEpa[] = BASE_TEAMS.map((tm, idx) => {
    if (tm.short === 'Arkansas') {
      return {
        teamName: 'Arkansas Razorbacks',
        shortName: 'Arkansas',
        logo: '🐗',
        conference: 'SEC',
        season: year,
        record: arkSeason.record,
        offenseEpa: arkSeason.offenseEpaPerPlay,
        defenseEpa: arkSeason.defenseEpaPerPlay,
        specialTeamsEpa: arkSeason.specialTeamsEpaPerPlay,
        netEpa: arkSeason.netEpaPerPlay,
        passEpa: arkSeason.passEpaPerPlay,
        rushEpa: arkSeason.rushEpaPerPlay,
        successRate: arkSeason.offenseSuccessRate,
        defenseSuccessRate: arkSeason.defenseSuccessRate,
        stuffRate: arkSeason.stuffRate ?? 15.6,
        opportunityRate: arkSeason.opportunityRate ?? 50.2,
        defensiveStuffRate: arkSeason.defensiveStuffRate ?? 18.5,
        defensiveOpportunityRate: arkSeason.defensiveOpportunityRate ?? 43.5,
        isArkansas: true
      };
    }

    // Tier-based baseline values with year-seeded variance
    const seed = year * 100 + idx * 7;
    const r1 = pseudoRandom(seed);
    const r2 = pseudoRandom(seed + 1);
    const r3 = pseudoRandom(seed + 2);
    const r4 = pseudoRandom(seed + 3);

    let baseOffEpa = 0.05;
    let baseDefEpa = 0.02; // lower is better
    let winCount = 6;

    if (tm.tier === 'elite') {
      baseOffEpa = 0.22 + r1 * 0.12;
      baseDefEpa = -0.08 - r2 * 0.06;
      winCount = 10 + Math.floor(r3 * 3); // 10 to 12 wins
    } else if (tm.tier === 'upper') {
      baseOffEpa = 0.12 + r1 * 0.10;
      baseDefEpa = -0.02 - r2 * 0.05;
      winCount = 8 + Math.floor(r3 * 3); // 8 to 10 wins
    } else if (tm.tier === 'mid') {
      baseOffEpa = 0.04 + r1 * 0.08;
      baseDefEpa = 0.02 + r2 * 0.04;
      winCount = 5 + Math.floor(r3 * 4); // 5 to 8 wins
    } else {
      baseOffEpa = -0.05 + r1 * 0.08;
      baseDefEpa = 0.08 + r2 * 0.06;
      winCount = 2 + Math.floor(r3 * 4); // 2 to 5 wins
    }

    const stEpa = Number(((r4 - 0.4) * 0.02).toFixed(3));
    const offEpa = Number(baseOffEpa.toFixed(3));
    const defEpa = Number(baseDefEpa.toFixed(3));
    const netEpa = Number((offEpa - defEpa + stEpa).toFixed(3));

    const passEpa = Number((offEpa * (1.1 + r2 * 0.3)).toFixed(3));
    const rushEpa = Number((offEpa * (0.7 + r3 * 0.4)).toFixed(3));

    const successRate = Number((40 + offEpa * 30 + r1 * 3).toFixed(1));
    const defenseSuccessRate = Number((42 + defEpa * 25 - r2 * 2).toFixed(1));

    // Stuff Rate (12-24%, lower is better for offense)
    const stuffRate = Number((20 - rushEpa * 25 + r3 * 3).toFixed(1));
    // Opportunity Rate (38-56%, higher is better for offense)
    const opportunityRate = Number((44 + rushEpa * 40 + r1 * 4).toFixed(1));
    // Defensive Stuff Rate (13-24%, higher is better)
    const defensiveStuffRate = Number((16 - defEpa * 20 + r2 * 4).toFixed(1));
    // Defensive Opportunity Rate (38-54%, lower is better)
    const defensiveOpportunityRate = Number((47 + defEpa * 25 - r4 * 3).toFixed(1));

    const losses = 12 - winCount;
    const recordStr = `${winCount}-${losses}`;

    return {
      teamName: tm.name,
      shortName: tm.short,
      logo: tm.logo,
      conference: tm.conf,
      season: year,
      record: recordStr,
      offenseEpa: offEpa,
      defenseEpa: defEpa,
      specialTeamsEpa: stEpa,
      netEpa: netEpa,
      passEpa: passEpa,
      rushEpa: rushEpa,
      successRate: successRate,
      defenseSuccessRate: defenseSuccessRate,
      stuffRate: stuffRate,
      opportunityRate: opportunityRate,
      defensiveStuffRate: defensiveStuffRate,
      defensiveOpportunityRate: defensiveOpportunityRate,
      isArkansas: false
    };
  });

  return results;
}

// Calculate conference averages for a given year
export function getConferenceAverages(year: number): Record<ConferenceName | 'FBS_ALL', {
  avgOffEpa: number;
  avgDefEpa: number;
  avgNetEpa: number;
  avgSuccessRate: number;
  teamCount: number;
}> {
  const teams = getConferenceEpaData(year);

  const confs: (ConferenceName | 'FBS_ALL')[] = ['SEC', 'Big Ten', 'Big 12', 'ACC', 'G5 / Ind', 'FBS_ALL'];
  const averages: Partial<Record<ConferenceName | 'FBS_ALL', any>> = {};

  confs.forEach((conf) => {
    const list = conf === 'FBS_ALL' ? teams : teams.filter((t) => t.conference === conf);
    if (list.length === 0) return;

    const sumOff = list.reduce((acc, t) => acc + t.offenseEpa, 0);
    const sumDef = list.reduce((acc, t) => acc + t.defenseEpa, 0);
    const sumNet = list.reduce((acc, t) => acc + t.netEpa, 0);
    const sumSucc = list.reduce((acc, t) => acc + t.successRate, 0);

    averages[conf] = {
      avgOffEpa: Number((sumOff / list.length).toFixed(3)),
      avgDefEpa: Number((sumDef / list.length).toFixed(3)),
      avgNetEpa: Number((sumNet / list.length).toFixed(3)),
      avgSuccessRate: Number((sumSucc / list.length).toFixed(1)),
      teamCount: list.length
    };
  });

  return averages as Record<ConferenceName | 'FBS_ALL', {
    avgOffEpa: number;
    avgDefEpa: number;
    avgNetEpa: number;
    avgSuccessRate: number;
    teamCount: number;
  }>;
}
