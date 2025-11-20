import axios from 'axios';
import * as cheerio from 'cheerio';

const SCHOLAR_USER = process.env.SCHOLAR_USER;
const SCHOLAR_PROFILE_URL = process.env.SCHOLAR_PROFILE_URL || (SCHOLAR_USER ? `https://scholar.google.com/citations?user=${SCHOLAR_USER}&hl=en` : null);

if (!SCHOLAR_PROFILE_URL) {
  console.error('Provide SCHOLAR_USER or SCHOLAR_PROFILE_URL environment variable');
  process.exit(2);
}

async function fetchMetrics() {
  const res = await axios.get(SCHOLAR_PROFILE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; metrics-updater/1.0; +https://github.com)'
    },
    timeout: 15000
  });

  const $ = cheerio.load(res.data);
  const metrics = { citations: 0, hIndex: 0, i10Index: 0 };

  $('#gsc_rsb_st tbody tr').each((i, tr) => {
    const label = $(tr).find('td.gsc_rsb_sc1').text().trim().toLowerCase();
    const allTime = $(tr).find('td.gsc_rsb_sc2').text().trim();
    if (label.includes('citations')) metrics.citations = parseInt(allTime.replace(/,/g, '')) || 0;
    if (label.includes('h-index') || label.includes('h index')) metrics.hIndex = parseInt(allTime.replace(/,/g, '')) || 0;
    if (label.includes('i10-index') || label.includes('i10 index')) metrics.i10Index = parseInt(allTime.replace(/,/g, '')) || 0;
  });

  return metrics;
}

(async () => {
  try {
    const m = await fetchMetrics();
    console.log(JSON.stringify(m));
  } catch (err) {
    console.error('Failed to fetch or parse Google Scholar:', err.message || err);
    process.exit(1);
  }
})();
