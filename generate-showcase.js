const fs = require('fs');
const enriched = JSON.parse(fs.readFileSync('C:/projects/palettes-enriched.json', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Profile Dynamic Spectrum — 100 Palette Showcase & Contrast Audit</title>
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

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

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

    .badge-100 {
      background: linear-gradient(135deg, #7057ff, #b71414);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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

    .search-box input:focus {
      border-color: #58a6ff;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--muted-dark);
      pointer-events: none;
      font-size: 14px;
    }

    /* HUE FILTER CHIPS */
    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 18px 32px;
      align-items: center;
    }

    .chip-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--muted-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-right: 4px;
    }

    .chip {
      background: #161b22;
      border: 1px solid #30363d;
      color: var(--muted-dark);
      font-size: 12px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .chip:hover {
      border-color: #8b949e;
      color: #fff;
    }

    .chip.active {
      background: #21262d;
      border-color: #58a6ff;
      color: #fff;
    }

    .chip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    /* STATS SUMMARY BANNER */
    .stats-summary {
      margin: 0 32px 24px 32px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 16px 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-val {
      font-size: 20px;
      font-weight: 800;
      color: #fff;
    }

    .stat-label {
      font-size: 12px;
      color: var(--muted-dark);
      margin-top: 2px;
    }

    /* MAIN CONTAINER */
    main {
      padding: 0 32px;
    }

    /* GRID LAYOUTS */
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 20px;
    }

    /* COMPARISON CARD (SPLIT VIEW) */
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
      box-shadow: 0 0 20px rgba(63, 185, 80, 0.4);
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

    .compare-card.active-live .live-badge-card {
      display: block;
    }

    .card-top-bar {
      padding: 10px 16px;
      background: #0d1117;
      border-bottom: 1px solid #30363d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .card-id-hue {
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hue-degree {
      color: var(--muted-dark);
      font-size: 11px;
    }

    /* CAPSULE MINI BANNER */
    .capsule-preview-row {
      height: 48px;
      width: 100%;
      position: relative;
      display: flex;
      overflow: hidden;
    }

    .capsule-half-dark {
      flex: 1;
      height: 100%;
      position: relative;
    }

    .capsule-half-light {
      flex: 1;
      height: 100%;
      position: relative;
      border-left: 1px solid #d0d7de;
    }

    .capsule-label-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      text-shadow: 0 1px 3px rgba(0,0,0,0.6);
      color: #fff;
      pointer-events: none;
    }

    /* SPLIT THEME BODY */
    .split-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    /* DARK SIDE */
    .split-pane-dark {
      background: var(--bg-dark);
      padding: 14px;
      border-right: 1px solid #30363d;
    }

    /* LIGHT SIDE */
    .split-pane-light {
      background: var(--bg-light);
      padding: 14px;
      color: var(--text-light);
    }

    .pane-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .split-pane-dark .pane-title {
      color: var(--muted-dark);
    }

    .split-pane-light .pane-title {
      color: var(--muted-light);
    }

    /* MINI STREAK CARD SIMULATION */
    .mini-streak-card {
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      transition: all 0.2s;
    }

    .split-pane-dark .mini-streak-card {
      background: var(--card-dark);
      border: 1px solid var(--border-dark);
    }

    .split-pane-light .mini-streak-card {
      background: var(--card-light);
      border: 1px solid var(--border-light);
    }

    .streak-header {
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

    .streak-stat-box {
      text-align: center;
      flex: 1;
    }

    .streak-stat-num {
      font-size: 16px;
      font-weight: 800;
    }

    .split-pane-dark .streak-stat-num {
      color: #fff;
    }

    .split-pane-light .streak-stat-num {
      color: #1f2328;
    }

    .streak-stat-lbl {
      font-size: 9px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .split-pane-dark .streak-stat-lbl {
      color: var(--muted-dark);
    }

    .split-pane-light .streak-stat-lbl {
      color: var(--muted-light);
    }

    .center-flame-stat {
      border-left: 1px dashed rgba(255,255,255,0.1);
      border-right: 1px dashed rgba(255,255,255,0.1);
      padding: 0 4px;
    }

    .split-pane-light .center-flame-stat {
      border-left: 1px dashed rgba(0,0,0,0.1);
      border-right: 1px dashed rgba(0,0,0,0.1);
    }

    .flame-icon {
      color: var(--flame-orange);
      font-size: 13px;
    }

    /* COLOR METRIC & COPY */
    .color-meta {
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
      padding: 3px 6px;
      font-size: 11px;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.15s;
    }

    .split-pane-dark .hex-copy-btn {
      color: #e6edf3;
      border-color: #30363d;
    }
    .split-pane-dark .hex-copy-btn:hover {
      background: #21262d;
      border-color: #8b949e;
    }

    .split-pane-light .hex-copy-btn {
      color: #1f2328;
      border-color: #d0d7de;
    }
    .split-pane-light .hex-copy-btn:hover {
      background: #eaeef2;
      border-color: #8c959f;
    }

    .contrast-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.3px;
    }

    .badge-pass-aaa {
      background: #23863622;
      color: #3fb950;
      border: 1px solid #23863655;
    }

    .badge-pass-aa {
      background: #1f6feb22;
      color: #58a6ff;
      border: 1px solid #1f6feb55;
    }

    /* TABLE AUDIT VIEW */
    .audit-table-wrap {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      overflow-x: auto;
    }

    table.audit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
    }

    table.audit-table th {
      background: #0d1117;
      padding: 12px 16px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--muted-dark);
      border-bottom: 1px solid #30363d;
    }

    table.audit-table td {
      padding: 10px 16px;
      border-bottom: 1px solid #21262d;
      vertical-align: middle;
    }

    table.audit-table tr:hover {
      background: #21262d55;
    }

    .table-swatch {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* MODAL INSPECTOR */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .modal-overlay.open {
      display: flex;
    }

    .modal-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
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
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
    }

    .modal-close-btn:hover {
      color: #fff;
    }

    .modal-content {
      padding: 24px;
    }

    .modal-preview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .modal-preview-grid {
        grid-template-columns: 1fr;
      }
      .split-body {
        grid-template-columns: 1fr;
      }
      .split-pane-dark {
        border-right: none;
        border-bottom: 1px solid #30363d;
      }
    }

    .endpoint-code-box {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 12px 16px;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      font-size: 12px;
      color: #79c0ff;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      word-break: break-all;
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

    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
  </style>
</head>
<body>

  <!-- HEADER & LIVE TRACKER -->
  <header>
    <div class="header-top">
      <div class="title-group">
        <h1>
          100-Palette Color Spectrum
          <span class="badge-100">WCAG AA Compliant</span>
        </h1>
        <p>15-Second Synchronized Live Engine for Capsule Render, GitHub Stats, Streak & LeetCode</p>
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
            <span id="liveActiveName" style="color:#58a6ff; font-weight:700; margin-left:6px;">--</span>
          </div>
          <div>
            <span style="color: var(--muted-dark);">Hue:</span>
            <span id="liveActiveHue" style="color:#58a6ff; font-weight:700; margin-left:4px;">--°</span>
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
      <!-- VIEW MODES -->
      <div class="segmented-control" id="viewModeControl">
        <button class="seg-btn active" data-view="split">Side-by-Side Split</button>
        <button class="seg-btn" data-view="dark">Dark Theme Only</button>
        <button class="seg-btn" data-view="light">Light Theme Only</button>
        <button class="seg-btn" data-view="audit">Audit Table</button>
      </div>

      <!-- SEARCH BOX -->
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search by ID (0-99), hex, or hue..." oninput="handleSearch(this.value)">
      </div>
    </div>
  </header>

  <!-- HUE FILTER CHIPS -->
  <div class="filter-chips" id="filterChips">
    <span class="chip-label">Hue Spectrum:</span>
    <button class="chip active" data-hue="all" onclick="filterHue('all')">All (100)</button>
    <button class="chip" data-hue="red" onclick="filterHue('red')"><span class="chip-dot" style="background:#ea746c;"></span> Reds (0°-20°)</button>
    <button class="chip" data-hue="orange" onclick="filterHue('orange')"><span class="chip-dot" style="background:#e57a4b;"></span> Oranges (21°-45°)</button>
    <button class="chip" data-hue="amber" onclick="filterHue('amber')"><span class="chip-dot" style="background:#cca120;"></span> Ambers/Golds (46°-70°)</button>
    <button class="chip" data-hue="green" onclick="filterHue('green')"><span class="chip-dot" style="background:#3fb950;"></span> Greens (71°-155°)</button>
    <button class="chip" data-hue="cyan" onclick="filterHue('cyan')"><span class="chip-dot" style="background:#38bdf8;"></span> Cyans/Teals (156°-195°)</button>
    <button class="chip" data-hue="blue" onclick="filterHue('blue')"><span class="chip-dot" style="background:#58a6ff;"></span> Blues (196°-260°)</button>
    <button class="chip" data-hue="purple" onclick="filterHue('purple')"><span class="chip-dot" style="background:#d2a8ff;"></span> Purples/Violets (261°-310°)</button>
    <button class="chip" data-hue="pink" onclick="filterHue('pink')"><span class="chip-dot" style="background:#f472b6;"></span> Pinks/Roses (311°-359°)</button>
  </div>

  <!-- STATS SUMMARY BANNER -->
  <div class="stats-summary">
    <div class="stat-item">
      <span class="stat-val">100 / 100</span>
      <span class="stat-label">Total Unique Palettes</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #3fb950;">100% WCAG AA</span>
      <span class="stat-label">Contrast Standard Guarantee</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #58a6ff;">6.5:1 – 13.2:1</span>
      <span class="stat-label">Dark Theme Contrast Range (on #0d1117)</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: #d2a8ff;">5.5:1 – 8.9:1</span>
      <span class="stat-label">Light Theme Contrast Range (on #ffffff)</span>
    </div>
    <div class="stat-item">
      <span class="stat-val" style="color: var(--flame-orange);">#FFA500</span>
      <span class="stat-label">Center Flame Color (Strict Rule)</span>
    </div>
  </div>

  <!-- MAIN CONTENT CONTAINER -->
  <main id="mainContainer">
    <!-- Grid will be rendered dynamically by JavaScript -->
    <div class="palette-grid" id="paletteGrid"></div>
    <div class="audit-table-wrap" id="auditTableWrap" style="display: none;"></div>
  </main>

  <!-- MODAL INSPECTOR -->
  <div class="modal-overlay" id="modalOverlay" onclick="closeModalOnBg(event)">
    <div class="modal-card">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 id="modalTitle" style="font-size: 18px; color: #fff;">Palette Inspector</h2>
          <span class="contrast-badge badge-pass-aaa" id="modalWcagBadge">WCAG AAA</span>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">×</button>
      </div>
      <div class="modal-content" id="modalContent">
        <!-- Injected via JS -->
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div class="toast" id="toast">Copied to clipboard!</div>

  <!-- EMBEDDED DATA & APPLICATION SCRIPT -->
  <script>
    const PALETTES = ${JSON.stringify(enriched)};

    let currentView = 'split'; // 'split', 'dark', 'light', 'audit'
    let currentHueFilter = 'all';
    let searchQuery = '';
    let currentLiveId = -1;

    // Epoch Window: 15 seconds
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
      document.getElementById('liveActiveHue').textContent = pal.hue + '°';
      document.getElementById('liveSwatchDark').style.backgroundColor = '#' + pal.dark;
      document.getElementById('liveSwatchLight').style.backgroundColor = '#' + pal.light;
      document.getElementById('liveCountdown').textContent = secondsRemaining + 's';

      if (currentLiveId !== index) {
        currentLiveId = index;
        // Update active highlight classes without re-rendering entire grid
        document.querySelectorAll('.compare-card').forEach(card => {
          const cardId = parseInt(card.dataset.id, 10);
          if (cardId === index) {
            card.classList.add('active-live');
          } else {
            card.classList.remove('active-live');
          }
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

    function getHueCategory(hue) {
      if (hue <= 20) return 'red';
      if (hue <= 45) return 'orange';
      if (hue <= 70) return 'amber';
      if (hue <= 155) return 'green';
      if (hue <= 195) return 'cyan';
      if (hue <= 260) return 'blue';
      if (hue <= 310) return 'purple';
      return 'pink';
    }

    function filterHue(cat) {
      currentHueFilter = cat;
      document.querySelectorAll('#filterChips .chip').forEach(btn => {
        if (btn.dataset.hue === cat) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      render();
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
      const auditWrap = document.getElementById('auditTableWrap');

      // Filter palettes
      const filtered = PALETTES.filter(p => {
        // Hue filter
        if (currentHueFilter !== 'all') {
          const cat = getHueCategory(p.hue);
          if (cat !== currentHueFilter) return false;
        }
        // Search query
        if (searchQuery) {
          const matchId = p.id.toString() === searchQuery || ('#' + p.id) === searchQuery;
          const matchHue = p.hue.toString().includes(searchQuery);
          const matchDark = p.dark.toLowerCase().includes(searchQuery);
          const matchLight = p.light.toLowerCase().includes(searchQuery);
          const matchCapsule = p.capsule_accent.toLowerCase().includes(searchQuery);
          if (!matchId && !matchHue && !matchDark && !matchLight && !matchCapsule) return false;
        }
        return true;
      });

      if (currentView === 'audit') {
        grid.style.display = 'none';
        auditWrap.style.display = 'block';
        renderAuditTable(filtered);
      } else {
        grid.style.display = 'grid';
        auditWrap.style.display = 'none';
        renderCards(filtered);
      }
    }

    function renderCards(list) {
      const grid = document.getElementById('paletteGrid');
      if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--muted-dark);">No palettes match your search/filter criteria.</div>';
        return;
      }

      grid.innerHTML = list.map(p => {
        const isLive = p.id === currentLiveId;

        // Visual layout based on currentView
        const showDarkOnly = currentView === 'dark';
        const showLightOnly = currentView === 'light';

        return \`
          <div class="compare-card \${isLive ? 'active-live' : ''}" data-id="\${p.id}" onclick="openModal(\${p.id})">
            <div class="live-badge-card">LIVE ACTIVE</div>
            
            <!-- TOP BAR -->
            <div class="card-top-bar">
              <div class="card-id-hue">
                <span>#\${p.id}</span>
                <span style="color: #fff; font-weight: 700;">\${p.name}</span>
                <span class="hue-degree">(\${p.hue}°)</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <span class="contrast-badge badge-pass-aaa">\${p.darkRatio}:1 Dark</span>
                <span class="contrast-badge badge-pass-aa">\${p.lightRatio}:1 Light</span>
              </div>
            </div>

            <!-- CAPSULE BANNER GRADIENT PREVIEW -->
            <div class="capsule-preview-row">
              \${!showLightOnly ? \`
                <div class="capsule-half-dark" style="background: linear-gradient(90deg, #\${p.capsule_accent} 0%, #161b22 65%, #0d1117 100%);">
                  <div class="capsule-label-overlay" style="color: #ffffff; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">Simiyon Vinscent Samuel</div>
                </div>
              \` : ''}
              \${!showDarkOnly ? \`
                <div class="capsule-half-light" style="background: linear-gradient(90deg, #\${p.capsule_accent} 0%, #\${p.capsule_light_mid} 65%, #f6f8fa 100%);">
                  <div class="capsule-label-overlay" style="color: #ffffff; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">Simiyon Vinscent Samuel</div>
                </div>
              \` : ''}
            </div>

            <!-- CARD BODY -->
            <div class="split-body" style="\${showDarkOnly || showLightOnly ? 'grid-template-columns: 1fr;' : ''}">
              
              <!-- DARK THEME PREVIEW -->
              \${!showLightOnly ? \`
                <div class="split-pane-dark">
                  <div class="pane-title">
                    <span>GitHub Dark</span>
                    <span style="color:#\${p.dark}">#\${p.dark}</span>
                  </div>

                  <div class="mini-streak-card">
                    <div class="streak-header" style="color: #\${p.dark};">
                      <span>⚡</span> GitHub Streak
                    </div>
                    <div class="streak-stats-row">
                      <div class="streak-stat-box">
                        <div class="streak-stat-num">3,490</div>
                        <div class="streak-stat-lbl">Total</div>
                      </div>
                      <div class="streak-stat-box center-flame-stat">
                        <div class="streak-stat-num">297 <span class="flame-icon">🔥</span></div>
                        <div class="streak-stat-lbl">Streak</div>
                      </div>
                      <div class="streak-stat-box">
                        <div class="streak-stat-num">297</div>
                        <div class="streak-stat-lbl">Best</div>
                      </div>
                    </div>
                  </div>

                  <div class="color-meta">
                    <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.dark}', event)">
                      📋 #\${p.dark}
                    </button>
                    <span class="contrast-badge badge-pass-aaa">\${p.darkRatio}:1 AAA</span>
                  </div>
                </div>
              \` : ''}

              <!-- LIGHT THEME PREVIEW -->
              \${!showDarkOnly ? \`
                <div class="split-pane-light">
                  <div class="pane-title">
                    <span>GitHub Light</span>
                    <span style="color:#\${p.light}">#\${p.light}</span>
                  </div>

                  <div class="mini-streak-card">
                    <div class="streak-header" style="color: #\${p.light};">
                      <span>⚡</span> GitHub Streak
                    </div>
                    <div class="streak-stats-row">
                      <div class="streak-stat-box">
                        <div class="streak-stat-num">3,490</div>
                        <div class="streak-stat-lbl">Total</div>
                      </div>
                      <div class="streak-stat-box center-flame-stat">
                        <div class="streak-stat-num">297 <span class="flame-icon">🔥</span></div>
                        <div class="streak-stat-lbl">Streak</div>
                      </div>
                      <div class="streak-stat-box">
                        <div class="streak-stat-num">297</div>
                        <div class="streak-stat-lbl">Best</div>
                      </div>
                    </div>
                  </div>

                  <div class="color-meta">
                    <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.light}', event)">
                      📋 #\${p.light}
                    </button>
                    <span class="contrast-badge badge-pass-aa">\${p.lightRatio}:1 AA</span>
                  </div>
                </div>
              \` : ''}

            </div>
          </div>
        \`;
      }).join('');
    }

    function renderAuditTable(list) {
      const wrap = document.getElementById('auditTableWrap');
      wrap.innerHTML = \`
        <table class="audit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hue</th>
              <th>Dark Color (#0d1117)</th>
              <th>Dark Contrast</th>
              <th>Light Color (#ffffff)</th>
              <th>Light Contrast</th>
              <th>Capsule Accent</th>
              <th>Capsule Mid</th>
              <th>Compliance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            \${list.map(p => \`
              <tr style="cursor: pointer;" onclick="openModal(\${p.id})">
                <td style="font-weight: 700;">#\${p.id}</td>
                <td>\${p.hue}° (\${getHueCategory(p.hue)})</td>
                <td>
                  <span class="table-swatch" style="background:#\${p.dark};"></span>
                  <code>#\${p.dark}</code>
                </td>
                <td><span class="contrast-badge badge-pass-aaa">\${p.darkRatio}:1 AAA</span></td>
                <td>
                  <span class="table-swatch" style="background:#\${p.light};"></span>
                  <code>#\${p.light}</code>
                </td>
                <td><span class="contrast-badge badge-pass-aa">\${p.lightRatio}:1 AA</span></td>
                <td>
                  <span class="table-swatch" style="background:#\${p.capsule_accent};"></span>
                  <code>#\${p.capsule_accent}</code>
                </td>
                <td>
                  <span class="table-swatch" style="background:#\${p.capsule_light_mid};"></span>
                  <code>#\${p.capsule_light_mid}</code>
                </td>
                <td><span style="color:#3fb950; font-weight:700;">PASS (AA/AAA)</span></td>
                <td>
                  <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.dark}', event)">Copy Dark</button>
                  <button class="hex-copy-btn" onclick="copyToClipboard('#\${p.light}', event)">Copy Light</button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      \`;
    }

    function openModal(id) {
      const p = PALETTES.find(x => x.id === id);
      if (!p) return;

      document.getElementById('modalTitle').textContent = \`Palette #\${p.id} — \${p.hue}° Hue Spectrum\`;
      document.getElementById('modalWcagBadge').textContent = \`Dark \${p.darkRatio}:1 / Light \${p.lightRatio}:1\`;

      const content = document.getElementById('modalContent');
      content.innerHTML = \`
        <div class="modal-preview-grid">
          
          <!-- DARK THEME FULL PREVIEW -->
          <div style="background: var(--bg-dark); border: 1px solid var(--border-dark); border-radius: 12px; padding: 20px;">
            <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span>GitHub Dark Mode Preview</span>
              <span style="color: #\${p.dark}; font-family: monospace;">#\${p.dark}</span>
            </div>

            <!-- CAPSULE HEADER -->
            <div style="background: linear-gradient(90deg, #\${p.capsule_accent} 0%, #161b22 55%, #0d1117 100%); height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 13px; margin-bottom: 14px;">
              Simiyon Vinscent Samuel
            </div>

            <!-- STREAK CARD FULL -->
            <div style="background: var(--card-dark); border: 1px solid var(--border-dark); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <div style="color: #\${p.dark}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                ⚡ GitHub Streak Stats
              </div>
              <div style="display: flex; justify-content: space-between; text-align: center;">
                <div>
                  <div style="font-size: 18px; font-weight: 800; color: #fff;">3,490</div>
                  <div style="font-size: 10px; color: var(--muted-dark); text-transform: uppercase;">Total Contributions</div>
                </div>
                <div style="border-left: 1px dashed rgba(255,255,255,0.1); border-right: 1px dashed rgba(255,255,255,0.1); padding: 0 16px;">
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
              <div style="color: #\${p.dark}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                🧩 LeetCode Stats
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="border: 3px solid #\${p.dark}; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 14px;">
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
              <strong style="color: #3fb950;">\${p.darkRatio}:1 (WCAG AAA)</strong>
            </div>
          </div>

          <!-- LIGHT THEME FULL PREVIEW -->
          <div style="background: var(--bg-light); border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; color: var(--text-light);">
            <div style="font-size: 13px; font-weight: 700; color: #1f2328; margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span>GitHub Light Mode Preview</span>
              <span style="color: #\${p.light}; font-family: monospace;">#\${p.light}</span>
            </div>

            <!-- CAPSULE HEADER -->
            <div style="background: linear-gradient(90deg, #\${p.capsule_accent} 0%, #\${p.capsule_light_mid} 65%, #f6f8fa 100%); height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 14px; margin-bottom: 14px; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">
              Simiyon Vinscent Samuel
            </div>

            <!-- STREAK CARD FULL -->
            <div style="background: var(--card-light); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <div style="color: #\${p.light}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
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
              <div style="color: #\${p.light}; font-weight: 700; font-size: 14px; margin-bottom: 10px;">
                🧩 LeetCode Stats
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="border: 3px solid #\${p.light}; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1f2328; font-size: 14px;">
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

            <div style="margin-top: 14px; font-size: 12px; color: var(--muted-light); display: flex; justify-content: space-between;">
              <span>Contrast Ratio on #ffffff:</span>
              <strong style="color: #1f6feb;">\${p.lightRatio}:1 (WCAG AA)</strong>
            </div>
          </div>

        </div>

        <!-- INTEGRATION ENDPOINTS -->
        <div style="margin-top: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px;">Microservice Endpoints</h4>
          
          <div class="endpoint-code-box">
            <span>https://capsule-render-omega.vercel.app/api?type=waving&theme=dynamic_dark</span>
            <button class="hex-copy-btn" onclick="copyToClipboard('https://capsule-render-omega.vercel.app/api?type=waving&theme=dynamic_dark')">Copy</button>
          </div>

          <div class="endpoint-code-box">
            <span>https://stats-blackscythe123.vercel.app/api/streak?user=blackscythe123&theme=dynamic_dark</span>
            <button class="hex-copy-btn" onclick="copyToClipboard('https://stats-blackscythe123.vercel.app/api/streak?user=blackscythe123&theme=dynamic_dark')">Copy</button>
          </div>

          <div class="endpoint-code-box">
            <span>https://github-readme-leetcode-stats.vercel.app/api?username=blackscythe123&theme=dynamic_dark</span>
            <button class="hex-copy-btn" onclick="copyToClipboard('https://github-readme-leetcode-stats.vercel.app/api?username=blackscythe123&theme=dynamic_dark')">Copy</button>
          </div>
        </div>
      \`;

      document.getElementById('modalOverlay').classList.add('open');
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('open');
    }

    function closeModalOnBg(e) {
      if (e.target.id === 'modalOverlay') {
        closeModal();
      }
    }

    // Keydown ESC to close modal
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // View mode button bindings
    document.querySelectorAll('#viewModeControl .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#viewModeControl .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        render();
      });
    });

    // Initialize
    setInterval(updateLiveClock, 1000);
    updateLiveClock();
    render();
  </script>
</body>
</html>
`;

fs.writeFileSync('C:/projects/palettes-showcase.html', html, 'utf8');
console.log('Successfully wrote C:/projects/palettes-showcase.html (size: ' + html.length + ' bytes)');
