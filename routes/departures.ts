import { Router, Request, Response } from 'express';
import { DEPARTURES_DATA, getDepartureSummaryBySeason } from '../src/data/departuresData';

const router = Router();

// GET /api/v1/departures/summary - Yearly departure totals & production lost summary
router.get('/summary', (req: Request, res: Response) => {
  const summary = getDepartureSummaryBySeason();
  res.json({
    success: true,
    count: summary.length,
    data: summary
  });
});

// GET /api/v1/departures/:season - Departures for specific year
router.get('/:season([0-9]{4})', (req: Request, res: Response) => {
  const season = parseInt(req.params.season, 10);
  const { position, exit_type } = req.query;

  let filtered = DEPARTURES_DATA.filter(p => p.season === season);

  if (position) {
    filtered = filtered.filter(p => p.position.toUpperCase() === String(position).toUpperCase());
  }
  if (exit_type) {
    filtered = filtered.filter(p => p.exit_type.toLowerCase().includes(String(exit_type).toLowerCase()));
  }

  res.json({
    success: true,
    season,
    count: filtered.length,
    data: filtered
  });
});

// GET /api/v1/departures - Search all departures or filter by season/year/position/exit_type
router.get('/', (req: Request, res: Response) => {
  const { season, year, position, exit_type } = req.query;

  let filtered = [...DEPARTURES_DATA];

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

export default router;
