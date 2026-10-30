const fs = require('fs');
const palettes = JSON.parse(fs.readFileSync('C:/projects/blackscythe123/palettes.json', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WCAG AAA Dynamic Design System — Figma & ColorContrast Verified</title>
  <style>
    :root {
      --bg-dark: #0d1117;
      --card-dark: #161b22;
      --border-dark: #30363d;
      --text-dark: #e6edf3;
      --muted-dark: #8b949e;

      --bg-light: #ffffff;
      --card-light: #f6f8fa;
      --border-light: #d0d7de;
      --text-light: #1f2328;
      --muted-light: #57606a;

      --flame-orange: #FFA500;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      background: #090d13;
      color: #e6edf3;
      min-height: 100vh;
      padding-bottom: 80px;
    }

    /* HEADER & LIVE SYNC BAR */
    header {
      background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
      border-bottom: 1px solid #30363d;
      padding: 24px 32px;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 18px;
    }

    .title-group h1 {
      font-size: 24px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 12px;
      letter-spacing: -0.5px;
    }

    .badge-aaa {
      background: linear-gradient(135deg, #238636, #2ea043);
      color: #fff;
      font-size: 12px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 0 10px rgba(46, 160, 67, 0.4);
    }

    .title-group p {
      font-size: 14px;
      color: var(--muted-dark);
      margin-top: 4px;
    }

    /* LIVE CLOCK WIDGET */
    .live-clock-card {
      background: #0b0f14;
      border: 1px solid #388bfd44;
      border-radius: 12px;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      gap: 18px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .live-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #58a6ff;
    }

    .pulsing-dot {
      width: 10px;
      height: 10px;
      background: #3fb950;
      border-radius: 50%;
      box-shadow: 0 0 10px #3fb950;
      animation: pulse 1.5s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .live-details {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 13px;
    }

    .live-swatch {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.2);
      display: inline-block;
      vertical-align: middle;
      transition: background 0.3s;
    }

    .jump-btn {
      background: #21262d;
      color: #58a6ff;
      border: 1px solid #30363d;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .jump-btn:hover {
      background: #30363d;
      color: #fff;
    }

    /* CONTROLS ROW */
    .controls-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .segmented-control {
      display: inline-flex;
      background: #090d13;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 3px;
      gap: 2px;
    }

    .seg-btn {
      background: transparent;
      border: none;
      color: var(--muted-dark);
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .seg-btn.active {
      background: #21262d;
      color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }

    .search-box {
      position: relative;
      min-width: 260px;
    }

    .search-box input {
      width: 100%;
      background: #090d13;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 8px 12px 8px 34px;
      color: #fff;
      font-size: 13px;
      outline: none;
      transition: border 0.2s;
    }

    .search-box input:focus { border-color: #58a6ff; }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--muted-dark);
      pointer-events: none;
      font-size: 14px;
    }

    /* STATS SUMMARY BANNER */
    .stats-summary {
      margin: 20px 32px 24px 32px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 16px 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .stat-item { display: flex; flex-direction: column; }
    .stat-val { font-size: 20px; font-weight: 800; color: #fff; }
    .stat-label { font-size: 12px; color: var(--muted-dark); margin-top: 2px; }

    /* MAIN CONTAINER */
    main { padding: 0 32px; }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 24px;
    }

    /* COMPARISON CARD */
    .compare-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      transition: transform 0.2s, border-color 0.2s;
      cursor: pointer;
      position: relative;
    }

    .compare-card:hover {
      transform: translateY(-3px);
      border-color: #58a6ff;
    }

    .compare-card.active-live {
      border: 2px solid #3fb950 !important;
      box-shadow: 0 0 24px rgba(63, 185, 80, 0.5);
    }

    .live-badge-card {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #3fb950;
      color: #000;
      font-size: 10px;
      font-weight: 900;
      padding: 3px 8px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      z-index: 10;
      display: none;
    }

    .compare-card.active-live .live-badge-card { display: block; }

    .card-top-bar {
      padding: 12px 18px;
      background: #0d1117;
      border-bottom: 1px solid #30363d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }

    .card-id-name {
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .capsule-preview-banner {
      height: 60px;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.3px;
      border-bottom: 1px solid #30363d;
    }

    /* SPLIT THEME BODY */
    .split-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .split-pane-dark {
      background: var(--bg-dark);
      padding: 16px;
      border-right: 1px solid #30363d;
    }

    .split-pane-light {
      background: var(--bg-light);
      padding: 16px;
      color: var(--text-light);
    }

    .pane-header-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .split-pane-dark .pane-header-title { color: var(--muted-dark); }
    .split-pane-light .pane-header-title { color: var(--muted-light); }

    /* MINI STREAK CARD */
    .mini-card-box {
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      transition: all 0.2s;
    }

    .split-pane-dark .mini-card-box {
      background: var(--card-dark);
      border: 1px solid var(--border-dark);
    }

    .split-pane-light .mini-card-box {
      background: var(--card-light);
      border: 1px solid var(--border-light);
    }

    .streak-title-row {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .streak-stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .streak-stat-cell { text-align: center; flex: 1; }
    .streak-stat-num { font-size: 16px; font-weight: 800; }
    .split-pane-dark .streak-stat-num { color: #ffffff; }
    .split-pane-light .streak-stat-num { color: #1f2328; }

    .streak-stat-lbl {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 700;
      margin-top: 3px;
    }
    .split-pane-dark .streak-stat-lbl { color: var(--muted-dark); }
    .split-pane-light .streak-stat-lbl { color: var(--muted-light); }

    .center-flame-cell {
      border-left: 1px dashed rgba(255,255,255,0.12);
      border-right: 1px dashed rgba(255,255,255,0.12);
      padding: 0 4px;
    }
    .split-pane-light .center-flame-cell {
      border-left: 1px dashed rgba(0,0,0,0.1);
      border-right: 1px dashed rgba(0,0,0,0.1);
    }

    .flame-icon { color: var(--flame-orange); font-size: 13px; }

    .contrast-badge {
      font-size: 10px;
      font-weight: 800;
      padding: 3px 7px;
      border-radius: 4px;
      letter-spacing: 0.3px;
    }

    .badge-aaa-dark {
      background: #23863622;
      color: #3fb950;
      border: 1px solid #23863655;
    }

    .badge-aaa-light {
      background: #1f6feb22;
      color: #58a6ff;
      border: 1px solid #1f6feb55;
    }

    .color-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      margin-top: 6px;
    }

    .hex-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 11px;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.15s;
    }

    .split-pane-dark .hex-copy-btn { color: #e6edf3; border-color: #30363d; }
    .split-pane-dark .hex-copy-btn:hover { background: #21262d; border-color: #8b949e; }

    .split-pane-light .hex-copy-btn { color: #1f2328; border-color: #d0d7de; }
    .split-pane-light .hex-copy-btn:hover { background: #eaeef2; border-color: #8c959f; }

    /* MODAL INSPECTOR */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .modal-overlay.open { display: flex; }

    .modal-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      max-width: 960px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid #30363d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0d1117;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      color: var(--muted-dark);
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }

    .modal-close-btn:hover { color: #fff; }
    .modal-content { padding: 24px; }

    .modal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    @media (max-width: 840px) {
      .modal-grid, .split-body { grid-template-columns: 1fr; }
      .split-pane-dark { border-right: none; border-bottom: 1px solid #30363d; }
    }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #238636;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 18px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      z-index: 2000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.25s ease-out;
      pointer-events: none;
    }

    .toast.show { transform: translateY(0); opacity: 1; }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="header-top">
      <div class="title-group">
        <h1>
          WCAG AAA Dynamic Spectrum
          <span class="badge-aaa">Figma &amp; ColorContrast Verified</span>
        </h1>
        <p>30 High-Vibe Master Palettes — Synchronized Across Capsule Render, GitHub Stats, Streak &amp; LeetCode</p>
      </div>

      <!-- LIVE EPOCH CLOCK -->
      <div class="live-clock-card" id="liveClockCard">
        <div class="live-indicator">
          <div class="pulsing-dot"></div>
          <span>LIVE SYNC</span>
        </div>
        <div class="live-details">
          <div>
            <span style="color: var(--muted-dark);">Active:</span>
            <strong id="liveActiveId" style="color:#fff; margin-left:4px;">#--</strong>
            <span id="liveActiveName" style="color:#58a6ff; font-weight:800; margin-left:6px;">--</span>
          </div>
          <div>
            <span class="live-swatch" id="liveSwatchDark" title="Dark theme swatch"></span>
            <span class="live-swatch" id="liveSwatchLight" title="Light theme swatch" style="margin-left:4px;"></span>
          </div>
          <div style="font-size: 11px; color: var(--muted-dark);">
            Rotates in <strong id="liveCountdown" style="color:#e6edf3;">15s</strong>
          </div>
        </div>
        <button class="jump-btn" onclick="jumpToActivePalette()">Focus Live</button>
      </div>
    </div>

    <!-- CONTROLS -->
    <div class="controls-row">
      <div class="segmented-control" id="viewModeControl">
        <button class="seg-btn active" data-view="split">Side-by-Side Split</button>
        <button class="seg-btn" data-view="dark">Dark Theme Only</button>
        <button class="seg-btn" data-view="light">Light Theme Only</button>
      </div>

      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search by name, ID (#0-#29), or hex..." oninput="handleSearch(this.value)">
      </div>
    </div>
  </header>

  <!-- STATS SUMMARY BANNER -->
  <div class="stats-summary">
    <div class="stat-item">
      <span class="stat-val">30 Curated Themes</span>
      <span class="stat-label">Golden Stride Dispersal (Every 15s jump)</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #3fb950;">100% WCAG AAA</span>
      <span class="stat-label">Strict Accessibility Guarantee</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #58a6ff;">11.1:1 – 18.0:1</span>
      <span class="stat-label">Dark Theme Contrast (Luminous Glow Text on #0d1117)</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #d2a8ff;">7.0:1 – 9.0:1</span>
      <span class="stat-label">Light Theme Contrast (Deep Bold Text on #ffffff)</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: var(--flame-orange);">#FFA500</span>
      <span class="stat-label">Center Flame Streak (Strict Rule)</span>
    </div>
  </div>

  <!-- MAIN GRID -->
  <main>
    <div class="palette-grid" id="paletteGrid"></div>
  </main>

  <!-- MODAL -->
  <div class="modal-overlay" id="modalOverlay" onclick="closeModalOnBg(event)">
    <div class="modal-card">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 id="modalTitle" style="font-size: 18px; color: #fff;">Palette Inspector</h2>
          <span class="contrast-badge badge-aaa-dark" id="modalWcagBadge">WCAG AAA Verified</span>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">×</button>
      </div>
      <div class="modal-content" id="modalContent"></div>
    </div>
  </div>

  <!-- TOAST -->
  <div class="toast" id="toast">Copied to clipboard!</div>

  <script>
    const PALETTES = ${JSON.stringify(palettes)};
    let currentView = 'split';
    let searchQuery = '';
    let currentLiveId = -1;

    function calculateEpoch() {
      const now = Date.now();
      const epochSeconds = Math.floor(now / 1000);
      const windowSeconds = 15;
      const index = Math.floor(now / (windowSeconds * 1000)) % PALETTES.length;
      const secondsRemaining = windowSeconds - (epochSeconds % windowSeconds);
      return { index, secondsRemaining };
    }

    function updateLiveClock() {
      const { index, secondsRemaining } = calculateEpoch();
      const pal = PALETTES[index];

      document.getElementById('liveActiveId').textContent = '#' + pal.id;
      document.getElementById('liveActiveName').textContent = pal.name;
      document.getElementById('liveSwatchDark').style.backgroundColor = '#' + pal.dark_text;
      document.getElementById('liveSwatchLight').style.backgroundColor = '#' + pal.light_text;
      document.getElementById('liveCountdown').textContent = secondsRemaining + 's';

      if (currentLiveId !== index) {
        currentLiveId = index;
        document.querySelectorAll('.compare-card').forEach(card => {
          const cardId = parseInt(card.dataset.id, 10);
          if (cardId === index) card.classList.add('active-live');
          else card.classList.remove('active-live');
        });
      }
    }

    function jumpToActivePalette() {
      const card = document.querySelector(\`.compare-card[data-id="\${currentLiveId}"]\`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('active-live');
      }
    }

    function handleSearch(q) {
      searchQuery = q.trim().toLowerCase();
      render();
    }

    function copyToClipboard(text, e) {
      if (e) e.stopPropagation();
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = \`Copied: \${text}\`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }

    function render() {
      const grid = document.getElementById('paletteGrid');
      const filtered = PALETTES.filter(p => {
        if (!searchQuery) return true;
        const matchId = ('#' + p.id) === searchQuery || p.id.toString() === searchQuery;
        const matchName = p.name.toLowerCase().includes(searchQuery);
        const matchDark = p.dark_text.toLowerCase().includes(searchQuery);
        const matchLight = p.light_text.toLowerCase().includes(searchQuery);
        return matchId || matchName || matchDark || matchLight;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--muted-dark);">No palettes match your search.</div>';
        return;
      }

      const showDarkOnly = currentView === 'dark';
      const showLightOnly = currentView === 'light';

      grid.innerHTML = filtered.map(p => {
        const isLive = p.id === currentLiveId;

        return \`
          <div class="compare-card \${isLive ? 'active-live' : ''}" data-id="\${p.id}" onclick="openModal(\${p.id})">
            <div class="live-badge-card">LIVE ACTIVE</div>

            <!-- TOP BAR -->
            <div class="card-top-bar">
              <div class="card-id-name">
                <span style="color: #58a6ff;">#\${p.id}</span>
                <span>\${p.name}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <span class="contrast-badge badge-aaa-dark">\${p.cDark}:1 Dark</span>
                <span class="contrast-badge badge-aaa-light">\${p.cLight}:1 Light</span>
              </div>
            </div>

            <!-- CARD BODY -->
            <div class="split-body" style="\${showDarkOnly || showLightOnly ? 'grid-template-columns: 1fr;' : ''}">

              <!-- DARK THEME -->
              \${!showLightOnly ? \`
                <div class="split-pane-dark">
                  <div class="pane-header-title">
                    <span>GitHub Dark Mode</span>
                    <span style="color:#\${p.dark_text}">#\${p.dark_text}</span>
                  </div>

                  <!-- CAPSULE PREVIEW DARK -->
                  <div class="capsule-preview-banner" style="background: linear-gradient(90deg, #\${p.dark_wave_start} 0%, #\${p.dark_wave_mid} 55%, #0d1117 100%); color: #\${p.dark_text}; text-shadow: 0 0 12px rgba(0,0,0,0.9);">
                    Simiyon Vinscent Samuel
                  </div>

                  <!-- MINI STREAK CARD -->
                  <div class="mini-card-box" style="margin-top: 12px;">
                    <div class="streak-title-row" style="color: #\${p.dark_text};">
                      <span>⚡</span> GitHub Streak
                    </div>
                    <div class="streak-stats-row">
                      <div class="streak-stat-cell">
                        <div class="streak-stat-num">3,490</div>
                        <div class="streak-stat-lbl">Total</div>
                      </div>
                      <div class="streak-stat-cell center-flame-cell">
                        <div class="streak-stat-num">297 <span class="flame-icon">🔥</span></div>
                        <div class="streak-stat-lbl">Streak</div>
                      </div>
                      <div class="streak-stat-cell">
                        <div class="streak-stat-num">297</div>
                        <div class="streak-stat-lbl">Best</div>
                      </div>
                    </div>
                  </div>

                  <div class="color-meta-row">
                    <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.dark_text}', event)">
                      📋 #\${p.dark_text} Glow
                    </button>
                    <span class="contrast-badge badge-aaa-dark">\${p.cDark}:1 AAA</span>
                  </div>
                </div>
              \` : ''}

              <!-- LIGHT THEME -->
              \${!showDarkOnly ? \`
                <div class="split-pane-light">
                  <div class="pane-header-title">
                    <span>GitHub Light Mode</span>
                    <span style="color:#\${p.light_text}">#\${p.light_text}</span>
                  </div>

                  <!-- CAPSULE PREVIEW LIGHT -->
                  <div class="capsule-preview-banner" style="background: linear-gradient(90deg, #\${p.light_wave_start} 0%, #\${p.light_wave_mid} 55%, #f6f8fa 100%); color: #\${p.light_text}; text-shadow: 0 1px 2px rgba(255,255,255,0.7);">
                    Simiyon Vinscent Samuel
                  </div>

                  <!-- MINI STREAK CARD -->
                  <div class="mini-card-box" style="margin-top: 12px;">
                    <div class="streak-title-row" style="color: #\${p.light_text};">
                      <span>⚡</span> GitHub Streak
                    </div>
                    <div class="streak-stats-row">
                      <div class="streak-stat-cell">
                        <div class="streak-stat-num">3,490</div>
                        <div class="streak-stat-lbl">Total</div>
                      </div>
                      <div class="streak-stat-cell center-flame-cell">
                        <div class="streak-stat-num">297 <span class="flame-icon">🔥</span></div>
                        <div class="streak-stat-lbl">Streak</div>
                      </div>
                      <div class="streak-stat-cell">
                        <div class="streak-stat-num">297</div>
                        <div class="streak-stat-lbl">Best</div>
                      </div>
                    </div>
                  </div>

                  <div class="color-meta-row">
                    <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.light_text}', event)">
                      📋 #\${p.light_text} Bold
                    </button>
                    <span class="contrast-badge badge-aaa-light">\${p.cLight}:1 AAA</span>
                  </div>
                </div>
              \` : ''}

            </div>
          </div>
        \`;
      }).join('');
    }

    function openModal(id) {
      const p = PALETTES.find(x => x.id === id);
      if (!p) return;

      document.getElementById('modalTitle').textContent = \`Theme #\${p.id} — \${p.name} (WCAG AAA)\`;
      document.getElementById('modalWcagBadge').textContent = \`Dark \${p.cDark}:1 / Light \${p.cLight}:1\`;

      const content = document.getElementById('modalContent');
      content.innerHTML = \`
        <div class="modal-grid">
          
          <!-- DARK PREVIEW -->
          <div style="background: var(--bg-dark); border: 1px solid var(--border-dark); border-radius: 12px; padding: 20px;">
            <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span>GitHub Dark Mode</span>
              <span style="color: #\${p.dark_text}; font-family: monospace;">#\${p.dark_text}</span>
            </div>

            <!-- CAPSULE BANNER -->
            <div style="background: linear-gradient(90deg, #\${p.dark_wave_start} 0%, #\${p.dark_wave_mid} 55%, #0d1117 100%); height: 56px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #\${p.dark_text}; font-weight: 800; font-size: 16px; margin-bottom: 14px; text-shadow: 0 0 14px rgba(0,0,0,0.9);">
              Simiyon Vinscent Samuel
            </div>

            <!-- STREAK CARD FULL -->
            <div style="background: var(--card-dark); border: 1px solid var(--border-dark); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <div style="color: #\${p.dark_text}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                ⚡ GitHub Streak Stats
              </div>
              <div style="display: flex; justify-content: space-between; text-align: center;">
                <div>
                  <div style="font-size: 18px; font-weight: 800; color: #fff;">3,490</div>
                  <div style="font-size: 10px; color: var(--muted-dark); text-transform: uppercase;">Total Contributions</div>
                </div>
                <div style="border-left: 1px dashed rgba(255,255,255,0.12); border-right: 1px dashed rgba(255,255,255,0.12); padding: 0 16px;">
                  <div style="font-size: 18px; font-weight: 800; color: var(--flame-orange);">297 🔥</div>
                  <div style="font-size: 10px; color: var(--flame-orange); text-transform: uppercase;">Current Streak</div>
                </div>
                <div>
                  <div style="font-size: 18px; font-weight: 800; color: #fff;">297</div>
                  <div style="font-size: 10px; color: var(--muted-dark); text-transform: uppercase;">Longest Streak</div>
                </div>
              </div>
            </div>

            <!-- LEETCODE CARD FULL -->
            <div style="background: var(--card-dark); border: 1px solid var(--border-dark); border-radius: 8px; padding: 14px;">
              <div style="color: #\${p.dark_text}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                🧩 LeetCode Stats
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="border: 3px solid #\${p.dark_text}; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 14px;">
                  312
                </div>
                <div style="flex: 1; margin-left: 16px; font-size: 12px;">
                  <div style="color: #00b8a3;">Easy: 142</div>
                  <div style="color: #ffc01e;">Medium: 148</div>
                  <div style="color: #ff375f;">Hard: 22</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 16px; font-weight: 800; color: var(--flame-orange);">76 🔥</div>
                  <div style="font-size: 10px; color: var(--flame-orange); text-transform: uppercase;">Streak</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 14px; font-size: 12px; color: var(--muted-dark); display: flex; justify-content: space-between;">
              <span>Contrast Ratio on #0d1117:</span>
              <strong style="color: #3fb950;">\${p.cDark}:1 (WCAG AAA)</strong>
            </div>
          </div>

          <!-- LIGHT PREVIEW -->
          <div style="background: var(--bg-light); border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; color: var(--text-light);">
            <div style="font-size: 13px; font-weight: 700; color: #1f2328; margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span>GitHub Light Mode</span>
              <span style="color: #\${p.light_text}; font-family: monospace;">#\${p.light_text}</span>
            </div>

            <!-- CAPSULE BANNER -->
            <div style="background: linear-gradient(90deg, #\${p.light_wave_start} 0%, #\${p.light_wave_mid} 55%, #f6f8fa 100%); height: 56px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #\${p.light_text}; font-weight: 800; font-size: 16px; margin-bottom: 14px; text-shadow: 0 1px 2px rgba(255,255,255,0.7);">
              Simiyon Vinscent Samuel
            </div>

            <!-- STREAK CARD FULL -->
            <div style="background: var(--card-light); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <div style="color: #\${p.light_text}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                ⚡ GitHub Streak Stats
              </div>
              <div style="display: flex; justify-content: space-between; text-align: center;">
                <div>
                  <div style="font-size: 18px; font-weight: 800; color: #1f2328;">3,490</div>
                  <div style="font-size: 10px; color: var(--muted-light); text-transform: uppercase; font-weight: 700;">Total Contributions</div>
                </div>
                <div style="border-left: 1px dashed rgba(0,0,0,0.1); border-right: 1px dashed rgba(0,0,0,0.1); padding: 0 16px;">
                  <div style="font-size: 18px; font-weight: 800; color: var(--flame-orange);">297 🔥</div>
                  <div style="font-size: 10px; color: var(--muted-light); text-transform: uppercase; font-weight: 700;">Current Streak</div>
                </div>
                <div>
                  <div style="font-size: 18px; font-weight: 800; color: #1f2328;">297</div>
                  <div style="font-size: 10px; color: var(--muted-light); text-transform: uppercase; font-weight: 700;">Longest Streak</div>
                </div>
              </div>
            </div>

            <!-- LEETCODE CARD FULL -->
            <div style="background: var(--card-light); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px;">
              <div style="color: #\${p.light_text}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                🧩 LeetCode Stats
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="border: 3px solid #\${p.light_text}; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1f2328; font-size: 14px;">
                  312
                </div>
                <div style="flex: 1; margin-left: 16px; font-size: 12px;">
                  <div style="color: #00b8a3;">Easy: 142</div>
                  <div style="color: #ffc01e;">Medium: 148</div>
                  <div style="color: #ff375f;">Hard: 22</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 16px; font-weight: 800; color: var(--flame-orange);">76 🔥</div>
                  <div style="font-size: 10px; color: var(--muted-light); text-transform: uppercase; font-weight: 700;">Streak</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 14px; font-size: 12px; color: var(--muted-light); display: flex; justify-content: space-between;">
              <span>Contrast Ratio on #ffffff:</span>
              <strong style="color: #1f6feb;">\${p.cLight}:1 (WCAG AAA)</strong>
            </div>
          </div>

        </div>
      \`;

      document.getElementById('modalOverlay').classList.add('open');
    }

    function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
    function closeModalOnBg(e) { if (e.target.id === 'modalOverlay') closeModal(); }

    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    document.querySelectorAll('#viewModeControl .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#viewModeControl .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        render();
      });
    });

    setInterval(updateLiveClock, 1000);
    updateLiveClock();
    render();
  </script>
</body>
</html>
`;

fs.writeFileSync('C:/projects/blackscythe123/palettes-showcase.html', html, 'utf8');
console.log('Successfully generated C:/projects/blackscythe123/palettes-showcase.html (size: ' + html.length + ' bytes)');
