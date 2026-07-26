import { PlayerEpaLeader, FieldZoneData } from '../types';

export function getPlayerFieldZones(player: {
  id: string;
  name: string;
  position: string;
  phase: 'offense' | 'defense' | 'special_teams';
  epaPerPlay: number;
  successRate: number;
  totalPlays: number;
}): FieldZoneData[] {
  const isOffense = player.phase === 'offense';
  const isDefense = player.phase === 'defense';
  const baseEpa = player.epaPerPlay;
  const baseSucc = player.successRate;

  // Custom profiles for iconic players
  if (player.id === 'off-brandon-allen-2015') {
    return [
      { id: 'deep_left', name: 'Deep Left (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Left', epaPerPlay: 0.380, successRate: 52.0, playSharePercent: 12, playCount: 53, notes: 'Completed 18 passes down the left boundary.' },
      { id: 'deep_middle', name: 'Deep Middle Seam (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Middle', epaPerPlay: 0.540, successRate: 64.5, playSharePercent: 14, playCount: 62, notes: 'Lethal seam route completions to Hunter Henry & Drew Morgan.' },
      { id: 'deep_right', name: 'Deep Right (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Right', epaPerPlay: 0.410, successRate: 50.0, playSharePercent: 11, playCount: 49, notes: 'High EPA on play-action shot plays.' },
      { id: 'med_left', name: 'Intermediate Left (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Left', epaPerPlay: 0.290, successRate: 55.0, playSharePercent: 15, playCount: 66, notes: 'Reliable comeback and out-route targeting.' },
      { id: 'med_middle', name: 'Intermediate Middle (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Middle', epaPerPlay: 0.420, successRate: 61.2, playSharePercent: 18, playCount: 80, notes: 'Core 3rd down conversion engine in Dan Enos offense.' },
      { id: 'med_right', name: 'Intermediate Right (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Right', epaPerPlay: 0.260, successRate: 51.5, playSharePercent: 13, playCount: 57, notes: 'Targeted Keon Hatcher on dig routes.' },
      { id: 'short_left', name: 'Short Left (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Left', epaPerPlay: 0.180, successRate: 50.0, playSharePercent: 6, playCount: 26, notes: 'Quick flat passes to RBs.' },
      { id: 'short_middle', name: 'Short Middle (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Middle', epaPerPlay: 0.220, successRate: 53.0, playSharePercent: 5, playCount: 22, notes: 'Quick slants under pressure.' },
      { id: 'short_right', name: 'Short Right (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Right', epaPerPlay: 0.150, successRate: 48.0, playSharePercent: 3, playCount: 13, notes: 'Screen pass efficiency.' },
      { id: 'red_zone', name: 'Red Zone (Inside 20 Yds)', depthLabel: 'Red Zone', widthLabel: 'All Width', epaPerPlay: 0.485, successRate: 68.0, playSharePercent: 3, playCount: 14, notes: '30 Passing Touchdowns with 0 red zone interceptions.' }
    ];
  }

  if (player.id === 'off-treylon-burks-2021') {
    return [
      { id: 'deep_left', name: 'Deep Left (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Left', epaPerPlay: 0.650, successRate: 66.7, playSharePercent: 20, playCount: 16, notes: 'Explosive vertical threat against Alabama & Texas A&M.' },
      { id: 'deep_middle', name: 'Deep Middle (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Middle', epaPerPlay: 0.710, successRate: 72.0, playSharePercent: 22, playCount: 18, notes: 'Unstoppable on deep post routes.' },
      { id: 'deep_right', name: 'Deep Right (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Right', epaPerPlay: 0.580, successRate: 60.0, playSharePercent: 15, playCount: 12, notes: 'Physical boundary contested catches.' },
      { id: 'med_middle', name: 'Intermediate Middle (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Middle', epaPerPlay: 0.450, successRate: 62.0, playSharePercent: 25, playCount: 20, notes: 'Slots inside for chunk YAC gains.' },
      { id: 'short_middle', name: 'Short Middle (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Middle', epaPerPlay: 0.280, successRate: 54.0, playSharePercent: 10, playCount: 8, notes: 'Jet sweeps and bubble screens.' },
      { id: 'red_zone', name: 'Red Zone (Inside 20 Yds)', depthLabel: 'Red Zone', widthLabel: 'All Width', epaPerPlay: 0.520, successRate: 71.4, playSharePercent: 8, playCount: 6, notes: '11 Total Touchdowns across all field zones.' }
    ];
  }

  if (player.id === 'def-trey-flowers-2014') {
    return [
      { id: 'behind_los', name: 'TFL Zone (Behind LOS)', depthLabel: 'Behind LOS', widthLabel: 'All Width', epaPerPlay: -0.420, successRate: 85.0, playSharePercent: 35, playCount: 24, notes: '15.5 tackles for loss disrupting opponent backfields.' },
      { id: 'short_left', name: 'Left Edge Pass Rush (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Left', epaPerPlay: -0.350, successRate: 78.0, playSharePercent: 30, playCount: 20, notes: 'Dominant bull rush on right tackles.' },
      { id: 'short_middle', name: 'Interior Run Stuffs (0-5 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Middle', epaPerPlay: -0.250, successRate: 70.0, playSharePercent: 20, playCount: 14, notes: 'Shut down C-gap run concepts.' },
      { id: 'short_right', name: 'Right Edge Contain (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Right', epaPerPlay: -0.210, successRate: 65.0, playSharePercent: 15, playCount: 10, notes: 'Pushed edge rushers into QB hurries.' }
    ];
  }

  if (player.id === 'def-landon-jackson-2023') {
    return [
      { id: 'behind_los', name: 'Backfield Sack Zone', depthLabel: 'Behind LOS', widthLabel: 'Left', epaPerPlay: -0.480, successRate: 88.0, playSharePercent: 40, playCount: 18, notes: '3.5 sacks vs Alabama in single game.' },
      { id: 'short_left', name: 'Left Edge Rush (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Left', epaPerPlay: -0.280, successRate: 72.0, playSharePercent: 35, playCount: 15, notes: '44 QB pressures recorded in 2023.' },
      { id: 'short_right', name: 'Right Edge Stuffs', depthLabel: '0-10 Yds', widthLabel: 'Right', epaPerPlay: -0.180, successRate: 62.0, playSharePercent: 25, playCount: 11, notes: 'Container run stops.' }
    ];
  }

  // Generic realistic zone generator for all other players
  if (isOffense) {
    return [
      { id: 'deep_left', name: 'Deep Left (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Left', epaPerPlay: Number((baseEpa * 1.25).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 0.95).toFixed(1))), playSharePercent: 12, playCount: Math.round(player.totalPlays * 0.12), notes: 'Boundary shot plays.' },
      { id: 'deep_middle', name: 'Deep Middle (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Middle', epaPerPlay: Number((baseEpa * 1.40).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 1.05).toFixed(1))), playSharePercent: 15, playCount: Math.round(player.totalPlays * 0.15), notes: 'High value seam routes.' },
      { id: 'deep_right', name: 'Deep Right (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Right', epaPerPlay: Number((baseEpa * 1.20).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 0.92).toFixed(1))), playSharePercent: 11, playCount: Math.round(player.totalPlays * 0.11), notes: 'Field side go routes.' },
      { id: 'med_left', name: 'Intermediate Left (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Left', epaPerPlay: Number((baseEpa * 1.10).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 1.02).toFixed(1))), playSharePercent: 16, playCount: Math.round(player.totalPlays * 0.16), notes: 'Out & dig routes.' },
      { id: 'med_middle', name: 'Intermediate Middle (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Middle', epaPerPlay: Number((baseEpa * 1.30).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 1.08).toFixed(1))), playSharePercent: 20, playCount: Math.round(player.totalPlays * 0.20), notes: 'High efficiency passing channel.' },
      { id: 'med_right', name: 'Intermediate Right (10-20 Yds)', depthLabel: '10-20 Yds', widthLabel: 'Right', epaPerPlay: Number((baseEpa * 1.05).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 0.98).toFixed(1))), playSharePercent: 14, playCount: Math.round(player.totalPlays * 0.14), notes: 'Comeback passes.' },
      { id: 'short_middle', name: 'Short Middle (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Middle', epaPerPlay: Number((baseEpa * 0.85).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 0.95).toFixed(1))), playSharePercent: 8, playCount: Math.round(player.totalPlays * 0.08), notes: 'Short underneath attempts.' },
      { id: 'red_zone', name: 'Red Zone (Inside 20 Yds)', depthLabel: 'Red Zone', widthLabel: 'All Width', epaPerPlay: Number((baseEpa * 1.35).toFixed(3)), successRate: Math.min(85, Number((baseSucc * 1.12).toFixed(1))), playSharePercent: 4, playCount: Math.round(player.totalPlays * 0.04), notes: 'Scoring opportunity conversions.' }
    ];
  } else if (isDefense) {
    return [
      { id: 'behind_los', name: 'Backfield / TFL Stuffs', depthLabel: 'Behind LOS', widthLabel: 'All Width', epaPerPlay: Number((baseEpa * 1.45).toFixed(3)), successRate: Math.min(92, Number((baseSucc * 1.10).toFixed(1))), playSharePercent: 30, playCount: Math.round(player.totalPlays * 0.30), notes: 'Tackles for loss & sacks.' },
      { id: 'short_left', name: 'Short Left Zone (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Left', epaPerPlay: Number((baseEpa * 1.05).toFixed(3)), successRate: Math.min(92, Number((baseSucc * 0.98).toFixed(1))), playSharePercent: 25, playCount: Math.round(player.totalPlays * 0.25), notes: 'Perimeter run & pass containment.' },
      { id: 'short_middle', name: 'Short Middle Zone (0-10 Yds)', depthLabel: '0-10 Yds', widthLabel: 'Middle', epaPerPlay: Number((baseEpa * 1.15).toFixed(3)), successRate: Math.min(92, Number((baseSucc * 1.02).toFixed(1))), playSharePercent: 25, playCount: Math.round(player.totalPlays * 0.25), notes: 'Interior run stops.' },
      { id: 'deep_middle', name: 'Deep Zone Coverage (20+ Yds)', depthLabel: '20+ Yds', widthLabel: 'Middle', epaPerPlay: Number((baseEpa * 1.25).toFixed(3)), successRate: Math.min(92, Number((baseSucc * 1.06).toFixed(1))), playSharePercent: 20, playCount: Math.round(player.totalPlays * 0.20), notes: 'Pass breakup and turnover zone.' }
    ];
  } else {
    // Special Teams
    return [
      { id: 'opp_50_redzone', name: 'Pin Zone (Opp 20-50 Yd Line)', depthLabel: 'Opponent Territory', widthLabel: 'All Width', epaPerPlay: Number((baseEpa * 1.25).toFixed(3)), successRate: Math.min(95, Number((baseSucc * 1.05).toFixed(1))), playSharePercent: 45, playCount: Math.round(player.totalPlays * 0.45), notes: 'Punts downed inside 20 / FG range.' },
      { id: 'own_20_40', name: 'Field Position Zone (Own 20-40)', depthLabel: 'Own Territory', widthLabel: 'All Width', epaPerPlay: Number((baseEpa * 0.85).toFixed(3)), successRate: Math.min(95, Number((baseSucc * 0.95).toFixed(1))), playSharePercent: 55, playCount: Math.round(player.totalPlays * 0.55), notes: 'Kickoff returns / open field punting.' }
    ];
  }
}

const RAW_PLAYER_EPA_LEADERS: any[] = [
  // OFFENSE LEADERS
  {
    id: 'off-brandon-allen-2015',
    name: 'Brandon Allen',
    number: '#10',
    position: 'QB',
    phase: 'offense',
    season: 2015,
    seasonLabel: '2015 Season',
    epaPerPlay: 0.312,
    totalPlays: 442,
    successRate: 54.2,
    keyStat: '3,440 Pass Yds, 30 TD, 8 INT, 166.5 Rating',
    bestGame: 'vs Ole Miss (53-52 W): 442 Pass Yds, 6 TD, +0.680 EPA/play',
    cpoe: 6.8,
    yardsPerRouteRun: 0,
    passerRatingClean: 172.4,
    passerRatingPressure: 114.8,
    airYardsPerAttempt: 9.8,
    totalAirYards: 3370,
    highlights: [
      'Led the entire SEC in passing efficiency (166.5) and QBR (83.8)',
      'Set school record with 7 passing touchdowns vs Mississippi State',
      'Engineered iconic 4th-and-25 "Hunter Heave" victory over #18 Ole Miss'
    ]
  },
  {
    id: 'off-treylon-burks-2021',
    name: 'Treylon Burks',
    number: '#16',
    position: 'WR',
    phase: 'offense',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: 0.410,
    totalPlays: 80,
    successRate: 58.8,
    keyStat: '66 Rec, 1,104 Yds, 11 TD, 16.7 YPR',
    bestGame: 'vs Alabama (35-42 L): 8 Rec, 179 Yds, 2 TD, +0.720 EPA/target',
    cpoe: 0,
    yardsPerRouteRun: 3.57,
    airYardsPerAttempt: 11.4,
    totalAirYards: 1180,
    highlights: [
      'First-Team All-SEC and 1st Round NFL Draft selection (Tennessee Titans)',
      'Generated +42.8 total expected points added on target catches',
      'Had six 100-yard receiving games including 179 yards against #2 Alabama'
    ]
  },
  {
    id: 'off-kj-jefferson-2021',
    name: 'KJ Jefferson',
    number: '#1',
    position: 'QB',
    phase: 'offense',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: 0.284,
    totalPlays: 445,
    successRate: 51.6,
    keyStat: '2,676 Pass Yds, 21 TD, 4 INT, 664 Rush Yds, 6 TD',
    bestGame: 'vs Ole Miss (51-52 L): 326 Pass Yds, 3 TD, 85 Rush Yds, 3 TD',
    cpoe: 5.4,
    passerRatingClean: 165.2,
    passerRatingPressure: 119.8,
    airYardsPerAttempt: 9.9,
    totalAirYards: 2890,
    highlights: [
      'Led Arkansas to 9-4 record and Outback Bowl victory over Penn State',
      'Averaged +0.342 EPA per dropback on 3rd down conversions',
      'Finished top-10 nationally in yards per pass attempt (9.1)'
    ]
  },
  {
    id: 'off-alex-collins-2015',
    name: 'Alex Collins',
    number: '#3',
    position: 'RB',
    phase: 'offense',
    season: 2015,
    seasonLabel: '2015 Season',
    epaPerPlay: 0.238,
    totalPlays: 271,
    successRate: 52.1,
    keyStat: '1,577 Rush Yds, 20 TD, 5.8 YPC',
    bestGame: 'vs Kansas State (45-23 W): 185 Rush Yds, 3 TD, +0.480 EPA/carry',
    highlights: [
      'Tied Darren McFadden for single-season rushing touchdown record (20)',
      'Only 3rd player in SEC history with three consecutive 1,000-yard seasons',
      'Averaged +0.190 EPA on 1st-and-10 run plays'
    ]
  },
  {
    id: 'off-hunter-henry-2015',
    name: 'Hunter Henry',
    number: '#84',
    position: 'TE',
    phase: 'offense',
    season: 2015,
    seasonLabel: '2015 Season',
    epaPerPlay: 0.385,
    totalPlays: 51,
    successRate: 64.7,
    keyStat: '51 Rec, 739 Yds, 3 TD, 0 Drops',
    bestGame: 'vs LSU (31-14 W): 5 Rec, 52 Yds, 100% catch rate on 3rd down',
    yardsPerRouteRun: 2.48,
    airYardsPerAttempt: 9.1,
    totalAirYards: 610,
    highlights: [
      'John Mackey Award Winner (Nation\'s Top Tight End) & Consensus All-American',
      'Zero dropped passes on 51 catchable targets all season',
      'Executed the miraculous lateral on 4th-and-25 vs Ole Miss'
    ]
  },
  {
    id: 'off-jonathan-williams-2014',
    name: 'Jonathan Williams',
    number: '#32',
    position: 'RB',
    phase: 'offense',
    season: 2014,
    seasonLabel: '2014 Season',
    epaPerPlay: 0.245,
    totalPlays: 211,
    successRate: 53.0,
    keyStat: '1,190 Rush Yds, 12 TD, 5.6 YPC',
    bestGame: 'vs Texas Tech (49-28 W): 145 Rush Yds, 4 TD, +0.520 EPA/carry',
    highlights: [
      'Formed "Regular Car Reviews" tandem with Alex Collins in Bret Bielema\'s power run scheme',
      'Second-Team All-SEC honors',
      'Over +0.300 EPA per carry in red zone situations'
    ]
  },
  {
    id: 'off-rocket-sanders-2022',
    name: 'Raheim "Rocket" Sanders',
    number: '#5',
    position: 'RB',
    phase: 'offense',
    season: 2022,
    seasonLabel: '2022 Season',
    epaPerPlay: 0.222,
    totalPlays: 222,
    successRate: 50.9,
    keyStat: '1,443 Rush Yds, 10 TD, 271 Rec Yds, 2 TD',
    bestGame: 'vs Missouri State (38-27 W): 167 Rush Yds, 1 TD, 75 Yd Rec TD',
    highlights: [
      'First-Team All-SEC tailback',
      '2nd most rushing yards in the SEC in 2022',
      'Averaged 6.5 yards per carry with 18 explosive runs over 15+ yards'
    ]
  },
  {
    id: 'off-taylen-green-2024',
    name: 'Taylen Green',
    number: '#10',
    position: 'QB',
    phase: 'offense',
    season: 2024,
    seasonLabel: '2024 Season',
    epaPerPlay: 0.168,
    totalPlays: 480,
    successRate: 48.5,
    keyStat: '2,892 Pass Yds, 15 TD, 563 Rush Yds, 6 TD',
    bestGame: 'vs Tennessee (19-14 W): 219 Pass Yds, 82 Rush Yds, +0.280 EPA/play',
    cpoe: 2.8,
    passerRatingClean: 158.4,
    passerRatingPressure: 96.8,
    airYardsPerAttempt: 9.5,
    totalAirYards: 3180,
    highlights: [
      'Led upset over #4 Tennessee at Razorback Stadium',
      'Dual-threat dynamic under OC Bobby Petrino',
      'Top-3 SEC quarterback in scrambles resulting in 1st down'
    ]
  },

  // DEFENSE LEADERS (Negative EPA is good - indicates points saved per play)
  {
    id: 'def-trey-flowers-2014',
    name: 'Trey Flowers',
    number: '#86',
    position: 'DE/EDGE',
    phase: 'defense',
    season: 2014,
    seasonLabel: '2014 Season',
    epaPerPlay: -0.285,
    totalPlays: 68,
    successRate: 72.5,
    keyStat: '15.5 TFL, 6.0 Sacks, 68 Tackles, 9 QB Hurries',
    bestGame: 'vs Texas (31-7 W): 2.0 TFL, 1 Sack, held UT to 59 total yards',
    passRushWinRate: 24.8,
    pressureRate: 18.5,
    passBreakupsCount: 3,
    highlights: [
      'Second-Team All-American & 1st Team All-SEC defensive end',
      'Anchor of 2014 defense that recorded back-to-back SEC shutouts vs LSU (17-0) & Ole Miss (30-0)',
      'Generated -0.420 EPA per play when forcing pass rush pressures'
    ]
  },
  {
    id: 'def-martrell-spaight-2014',
    name: 'Martrell Spaight',
    number: '#47',
    position: 'LB',
    phase: 'defense',
    season: 2014,
    seasonLabel: '2014 Season',
    epaPerPlay: -0.242,
    totalPlays: 128,
    successRate: 69.5,
    keyStat: '128 Tackles (SEC Leader), 10.5 TFL, 2 INT, 2 FF',
    bestGame: 'vs Ole Miss (30-0 W): 11 Tackles, 1 INT, 1 FF in shutout victory',
    coverageDisruptionRate: 14.2,
    interceptionsCount: 2,
    passBreakupsCount: 5,
    highlights: [
      'First-Team All-SEC and Consensus All-SEC linebacker',
      'Led the entire Southeastern Conference in total tackles (128)',
      'Produced +24.5 net defensive expected points saved on run stops'
    ]
  },
  {
    id: 'def-bumper-pool-2021',
    name: 'Bumper Pool',
    number: '#10',
    position: 'LB',
    phase: 'defense',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: -0.198,
    totalPlays: 125,
    successRate: 66.4,
    keyStat: '125 Tackles, 7.5 TFL, 2 Pass Breakups',
    bestGame: 'vs Texas A&M (20-10 W): 8 Tackles, 1.5 TFL, key 4th quarter goal-line stop',
    coverageDisruptionRate: 10.8,
    passBreakupsCount: 2,
    highlights: [
      'All-Time Arkansas Razorbacks Tackle Leader (441 Career Tackles)',
      'Second-Team All-SEC honors in 2021',
      'Allowed under 3.2 yards per target when targeted in pass coverage'
    ]
  },
  {
    id: 'def-jalen-catalon-2020',
    name: 'Jalen Catalon',
    number: '#1',
    position: 'S',
    phase: 'defense',
    season: 2020,
    seasonLabel: '2020 Season',
    epaPerPlay: -0.260,
    totalPlays: 99,
    successRate: 70.2,
    keyStat: '99 Tackles, 3 INT, 2 Forced Fumbles, 1 Pick-6',
    bestGame: 'vs Ole Miss (33-21 W): 9 Tackles, 1 INT Pick-6 return for TD',
    coverageDisruptionRate: 21.5,
    interceptionsCount: 3,
    passBreakupsCount: 8,
    highlights: [
      'FWAA Freshman All-American & First-Team All-SEC (Phil Steele)',
      'First SEC freshman safety with 90+ tackles and 3+ interceptions since 2005',
      'Recorded -0.380 EPA impact on passes thrown into deep safety zone'
    ]
  },
  {
    id: 'def-landon-jackson-2023',
    name: 'Landon Jackson',
    number: '#40',
    position: 'DE',
    phase: 'defense',
    season: 2023,
    seasonLabel: '2023 Season',
    epaPerPlay: -0.230,
    totalPlays: 44,
    successRate: 68.2,
    keyStat: '13.5 TFL, 6.5 Sacks, 44 Pressures, 44 Tackles',
    bestGame: 'vs Alabama (21-24 L): 3.5 Sacks, 4.5 TFL, dominated Crimson Tide O-Line',
    passRushWinRate: 22.4,
    pressureRate: 19.8,
    passBreakupsCount: 2,
    highlights: [
      'First-Team All-SEC defensive lineman',
      '3.5 sacks vs Alabama was the most by an opponent against Alabama since 2014',
      'Led Arkansas in quarterback pressures and tackle for losses'
    ]
  },
  {
    id: 'def-montaric-brown-2021',
    name: 'Montaric Brown',
    number: '#21',
    position: 'CB',
    phase: 'defense',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: -0.215,
    totalPlays: 54,
    successRate: 67.5,
    keyStat: '5 INT (Co-SEC Leader), 54 Tackles, 6 Pass Breakups',
    bestGame: 'vs Penn State (24-10 W): 1 INT in end zone, 6 tackles in Outback Bowl',
    coverageDisruptionRate: 26.8,
    interceptionsCount: 5,
    passBreakupsCount: 6,
    highlights: [
      'First-Team All-SEC cornerback',
      'Co-led SEC in interceptions (5)',
      'Allowed a passer rating of just 42.1 when targeted man-to-man'
    ]
  },
  {
    id: 'def-tre-williams-2021',
    name: 'Tre Williams',
    number: '#55',
    position: 'DE',
    phase: 'defense',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: -0.225,
    totalPlays: 28,
    successRate: 68.0,
    keyStat: '6.0 Sacks, 6.5 TFL, 28 QB Pressures',
    bestGame: 'vs Texas A&M (20-10 W): 2.0 Sacks, 4 QB Hurries',
    passRushWinRate: 21.6,
    pressureRate: 17.4,
    highlights: [
      'Transfer edge rusher who transformed Barry Odom\'s 3-man front',
      'Highest pass-rush win percentage on 3rd-and-long in 2021 SEC play'
    ]
  },

  // SPECIAL TEAMS LEADERS
  {
    id: 'st-cam-little-2021',
    name: 'Cam Little',
    number: '#29',
    position: 'K',
    phase: 'special_teams',
    season: 2021,
    seasonLabel: '2021-2023 All-Time',
    epaPerPlay: 0.185,
    totalPlays: 64,
    successRate: 82.8,
    keyStat: '53/64 FG (82.8%), 129/129 PATs (100%), 56-Yd Long',
    bestGame: 'vs Texas (40-21 W): 4/4 Field Goals (44, 22, 23, 22 yds)',
    highlights: [
      'Freshman All-American & SEC All-Freshman Team',
      'Perfect 100% career PAT conversion rate (129 of 129)',
      'Drafted in 6th Round of 2024 NFL Draft by Jacksonville Jaguars; hit 56-yd FG in SEC play'
    ]
  },
  {
    id: 'st-reid-bauer-2021',
    name: 'Reid Bauer',
    number: '#30',
    position: 'P / Holder',
    phase: 'special_teams',
    season: 2021,
    seasonLabel: '2021 Season',
    epaPerPlay: 0.142,
    totalPlays: 58,
    successRate: 77.6,
    keyStat: '43.3 Yds/Punt, 16 inside 20-yd line, 1 Pass TD on fake FG',
    bestGame: 'vs LSU (16-13 W): 23-yd pass on fake FG & key punts pinning LSU inside 10',
    highlights: [
      'Peter Mortell Holder of the Year Award Winner',
      'Executed iconic fake field goal touchdown pass vs LSU',
      'Net punting average of +4.2 yards above SEC standard'
    ]
  },
  {
    id: 'st-max-fletcher-2023',
    name: 'Max Fletcher',
    number: '#31',
    position: 'P',
    phase: 'special_teams',
    season: 2023,
    seasonLabel: '2023 Season',
    epaPerPlay: 0.135,
    totalPlays: 59,
    successRate: 76.2,
    keyStat: '46.9 Yds/Punt (SEC Leader), 23 inside 20, 19 punts 50+ yds',
    bestGame: 'vs Auburn (10-48 L): 71-yard punt, 4 punts downed inside 15',
    highlights: [
      'Second-Team All-SEC punter',
      'Ranked 7th nationally in gross punting average (46.9 yards)',
      'Boomed 19 punts of 50 or more yards'
    ]
  },
  {
    id: 'st-aj-green-2022',
    name: 'AJ Green',
    number: '#0',
    position: 'KR / RB',
    phase: 'special_teams',
    season: 2022,
    seasonLabel: '2022 Season',
    epaPerPlay: 0.210,
    totalPlays: 16,
    successRate: 68.8,
    keyStat: '16 Kick Returns, 392 Yds, 24.5 Yds/Return',
    bestGame: 'vs Ole Miss (42-27 W): 89 Kickoff return yards setup 2 scoring drives',
    highlights: [
      'Ranked top-3 in SEC in kickoff return average',
      'Generated +8.2 net field position points added on return coverage splits'
    ]
  },
  {
    id: 'st-korliss-marshall-2014',
    name: 'Korliss Marshall',
    number: '#33',
    position: 'KR',
    phase: 'special_teams',
    season: 2014,
    seasonLabel: '2014 Season',
    epaPerPlay: 0.230,
    totalPlays: 12,
    successRate: 75.0,
    keyStat: '97-Yd Kick Return TD vs Northern Illinois',
    bestGame: 'vs NIU (52-14 W): 97-yard kickoff return touchdown on opening kick',
    highlights: [
      'First Razorback opening kick return TD in SEC era',
      'Top speed recorded at 21.8 mph during 97-yard touchdown sprint'
    ]
  }
];

export const PLAYER_EPA_LEADERS: PlayerEpaLeader[] = RAW_PLAYER_EPA_LEADERS.map((p) => ({
  ...p,
  fieldZones: getPlayerFieldZones(p)
}));
