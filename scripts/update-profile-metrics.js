import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function getMetrics() {
  // run fetch-scholar.js and parse JSON output
  const out = execSync('node scripts/fetch-scholar.js', { encoding: 'utf8', env: process.env });
  return JSON.parse(out.trim());
}

(async () => {
  const repoPath = process.cwd();
  const profilePath = path.join(repoPath, 'src', 'data', 'profile.json');
  if (!fs.existsSync(profilePath)) {
    console.error('profile.json not found at', profilePath);
    process.exit(2);
  }

  try {
    const metrics = getMetrics();
    const raw = fs.readFileSync(profilePath, 'utf8');
    const profile = JSON.parse(raw);

    profile.research = profile.research || {};
    profile.research.metrics = {
      citations: metrics.citations,
      hIndex: metrics.hIndex,
      i10Index: metrics.i10Index
    };

    const newRaw = JSON.stringify(profile, null, 2) + '\n';
    if (newRaw !== raw) {
      fs.writeFileSync(profilePath, newRaw, 'utf8');
      console.log('Updated profile.json metrics:', profile.research.metrics);
    } else {
      console.log('No metrics change; nothing to commit.');
    }
  } catch (err) {
    console.error('Error updating profile metrics:', err);
    process.exit(1);
  }
})();
