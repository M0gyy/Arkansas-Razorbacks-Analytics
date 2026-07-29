const express = require('express');
const router = express.Router();
const departuresData = require('../src/data/arkansas_departures_2014_2025.json');

// GET /api/v1/departures/summary
router.get('/summary', (req, res) => {
  const seasons = Array.from(new Set(departuresData.map(d => d.season))).sort((a, b) => a - b);
  const summary = seasons.map(yr => {
    const list = departuresData.filter(d => d.season === yr);
    const totalSnaps = list.reduce((acc, d) => acc + d.snap_count, 0);
    const offEpaLost = list.filter(d => ['QB','RB','WR','TE','OL'].includes(d.position)).reduce((acc, d) => acc + d.total_epa_impact, 0);
    const defEpaLost = list.filter(d => ['DL','LB','DB','S'].includes(d.position)).reduce((acc, d) => acc + d.total_epa_impact, 0);

    return {
      season: yr,
      totalDepartures: list.length,
      totalSnaps,
      offEpaLost: Number(offEpaLost.toFixed(1)),
      defEpaLost: Number(defEpaLost.toFixed(1)),
      draftCount: list.filter(d => d.exit_type.toLowerCase().includes('draft')).length,
      portalCount: list.filter(d => d.exit_type.toLowerCase().includes('portal') || d.exit_type.toLowerCase().includes('transfer')).length,
      gradCount: list.filter(d => d.exit_type.toLowerCase().includes('grad')).length
    };
  });

  res.json({ success: true, count: summary.length, data: summary });
});

// GET /api/v1/departures/:season
router.get('/:season([0-9]{4})', (req, res) => {
  const season = parseInt(req.params.season, 10);
  const { position, exit_type } = req.query;

  let filtered = departuresData.filter(p => p.season === season);
  if (position) {
    filtered = filtered.filter(p => p.position.toUpperCase() === String(position).toUpperCase());
  }
  if (exit_type) {
    filtered = filtered.filter(p => p.exit_type.toLowerCase().includes(String(exit_type).toLowerCase()));
  }

  res.json({ success: true, season, count: filtered.length, data: filtered });
});

// GET /api/v1/departures
router.get('/', (req, res) => {
  const { season, year, position, exit_type } = req.query;
  
  let filtered = departuresData;
  const targetSeason = season || year;
  if (targetSeason && String(targetSeason).toUpperCase() !== 'ALL') {
    const yr = parseInt(String(targetSeason), 10);
    if (!isNaN(yr)) {
      filtered = filtered.filter(p => p.season === yr);
    }
  }

  if (position) {
    filtered = filtered.filter(p => p.position.toUpperCase() === String(position).toUpperCase());
  }
  if (exit_type) {
    filtered = filtered.filter(p => p.exit_type.toLowerCase().includes(String(exit_type).toLowerCase()));
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

module.exports = router;
