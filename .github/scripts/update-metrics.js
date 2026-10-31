const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Perform HTTPS GET request with JSON response parsing.
 */
function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'blackscythe123-metrics-bot',
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Fetch all-time coding time from WakaTime API.
 */
async function getWakatimeCodeTime(apiKey) {
  if (!apiKey) {
    console.warn('WAKATIME_API_KEY not provided, skipping WakaTime fetch.');
    return null;
  }

  try {
    const auth = Buffer.from(apiKey.trim()).toString('base64');
    const res = await fetchJSON('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      'Authorization': `Basic ${auth}`
    });

    if (res && res.data && res.data.text) {
      console.log(`Fetched WakaTime code time: ${res.data.text}`);
      return res.data.text; // e.g. "500 hrs 54 mins"
    }
  } catch (err) {
    console.error(`WakaTime API error: ${err.message}`);
  }
  return null;
}

/**
 * Fetch GitHub user public repos and repository stars.
 */
async function getGithubMetrics(token, username = 'blackscythe123') {
  const headers = token ? { 'Authorization': `token ${token.trim()}` } : {};

  let publicRepos = null;
  try {
    const user = await fetchJSON(`https://api.github.com/users/${username}`, headers);
    if (user && typeof user.public_repos === 'number') {
      publicRepos = user.public_repos;
      console.log(`Fetched GitHub public repos: ${publicRepos}`);
    }
  } catch (err) {
    console.error(`GitHub user API error: ${err.message}`);
  }

  return { publicRepos };
}

/**
 * Calculate total Lines of Code crafted across user's repositories.
 */
async function calculateTotalLinesOfCode(token, username = 'blackscythe123') {
  if (!token) return null;

  try {
    const headers = {
      'Authorization': `token ${token.trim()}`
    };

    // Fetch user repositories
    const repos = await fetchJSON(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, headers);
    if (!Array.isArray(repos)) return null;

    let totalAdditions = 0;
    let totalDeletions = 0;

    // Sample commit additions/deletions across repos
    for (const repo of repos) {
      if (repo.fork) continue;
      try {
        const stats = await fetchJSON(`https://api.github.com/repos/${username}/${repo.name}/stats/contributors`, headers);
        if (Array.isArray(stats)) {
          for (const contributor of stats) {
            if (contributor.author && contributor.author.login.toLowerCase() === username.toLowerCase()) {
              for (const week of contributor.weeks) {
                totalAdditions += week.a || 0;
                totalDeletions += week.d || 0;
              }
            }
          }
        }
      } catch (e) {
        // Stats can sometimes return 202 while computing, ignore and continue
      }
    }

    if (totalAdditions > 0) {
      const netLOC = totalAdditions;
      const formattedLOC = netLOC >= 1000000 
        ? `${(netLOC / 1000000).toFixed(2)}M LOC`
        : `${(netLOC / 1000).toFixed(1)}k LOC`;
      console.log(`Computed total lines crafted: ${formattedLOC} (${netLOC} lines)`);
      return formattedLOC;
    }
  } catch (err) {
    console.error(`Error calculating lines of code: ${err.message}`);
  }
  return null;
}

/**
 * Update README badges in place.
 */
async function updateReadme() {
  const readmePath = path.resolve(__dirname, '../../README.md');
  if (!fs.existsSync(readmePath)) {
    console.error(`README not found at: ${readmePath}`);
    return;
  }

  let content = fs.readFileSync(readmePath, 'utf8');

  const wakaKey = process.env.WAKATIME_API_KEY;
  const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

  // 1. WakaTime Code Time
  const codeTimeText = await getWakatimeCodeTime(wakaKey);
  if (codeTimeText) {
    const safeCodeTime = codeTimeText.replace(/\s+/g, '_').replace(/-/g, '--');
    content = content.replace(
      /img\.shields\.io\/badge\/Code_Time-[^"&?]+-0052CC/g,
      `img.shields.io/badge/Code_Time-${safeCodeTime}-0052CC`
    );
  }

  // 2. Lines of Code
  const locText = await calculateTotalLinesOfCode(ghToken);
  if (locText) {
    const safeLOC = locText.replace(/\s+/g, '_').replace(/-/g, '--');
    content = content.replace(
      /img\.shields\.io\/badge\/Lines_Crafted-[^"&?]+-107C41/g,
      `img.shields.io/badge/Lines_Crafted-${safeLOC}-107C41`
    );
  }

  // 3. Public Repos & Stars
  const { publicRepos } = await getGithubMetrics(ghToken);
  if (publicRepos !== null) {
    content = content.replace(
      /<a href="https:\/\/github\.com\/blackscythe123\?tab=repositories"><img src="[^"]*Public%20Repos[^"]*" alt="Public Repositories" \/><\/a>/g,
      `<a href="https://github.com/blackscythe123?tab=repositories"><img src="https://img.shields.io/badge/Public_Repos-${publicRepos}-161b22?style=flat-square&logo=github&logoColor=white" alt="Public Repositories" /></a>`
    );
    content = content.replace(
      /img\.shields\.io\/badge\/Public_Repos-\d+-161b22/g,
      `img.shields.io/badge/Public_Repos-${publicRepos}-161b22`
    );
  }

  fs.writeFileSync(readmePath, content, 'utf8');
  console.log('README metrics update complete.');
}

if (require.main === module) {
  updateReadme().catch(err => {
    console.error('Fatal update error:', err);
    process.exit(1);
  });
}

module.exports = { updateReadme, getWakatimeCodeTime, getGithubMetrics };
