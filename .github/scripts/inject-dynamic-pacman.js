const fs = require('fs');
const path = require('path');

const palettes = [
  {
    "id": 0,
    "name": "Lilac Royal",
    "dark_text": "e0c2ff",
    "light_text": "9400bd",
    "dark_wall": "ba75ff",
    "light_wall": "d4a8ff"
  },
  {
    "id": 1,
    "name": "Cedar Flame",
    "dark_text": "ffc7a8",
    "light_text": "a82a00",
    "dark_wall": "ff5900",
    "light_wall": "ff8e52"
  },
  {
    "id": 2,
    "name": "Oak Citron",
    "dark_text": "fff9d1",
    "light_text": "565c00",
    "dark_wall": "ffe433",
    "light_wall": "ffee80"
  },
  {
    "id": 3,
    "name": "Viridiflora Jade",
    "dark_text": "adffe0",
    "light_text": "00615f",
    "dark_wall": "00cc7e",
    "light_wall": "47ffb9"
  },
  {
    "id": 4,
    "name": "Juniper Indigo",
    "dark_text": "c2deff",
    "light_text": "2930ff",
    "dark_wall": "5294ff",
    "light_wall": "85beff"
  },
  {
    "id": 5,
    "name": "Rose Crimson",
    "dark_text": "ffd1d1",
    "light_text": "b30000",
    "dark_wall": "ff6161",
    "light_wall": "ff9999"
  },
  {
    "id": 6,
    "name": "Walnut Sunflower",
    "dark_text": "ffe59e",
    "light_text": "705200",
    "dark_wall": "ffbb00",
    "light_wall": "ffd666"
  },
  {
    "id": 7,
    "name": "Pine Emerald",
    "dark_text": "c7ffd6",
    "light_text": "0c6600",
    "dark_wall": "3dff64",
    "light_wall": "99ffad"
  },
  {
    "id": 8,
    "name": "Azure Sky",
    "dark_text": "b3ecff",
    "light_text": "005c7a",
    "dark_wall": "009afa",
    "light_wall": "4dd2ff"
  },
  {
    "id": 9,
    "name": "Plum Velvet",
    "dark_text": "ffd6f4",
    "light_text": "a30085",
    "dark_wall": "ff4dcf",
    "light_wall": "ffa3e7"
  },
  {
    "id": 10,
    "name": "Rosewood Solar",
    "dark_text": "ffdbb3",
    "light_text": "854700",
    "dark_wall": "ff8800",
    "light_wall": "ffb35c"
  },
  {
    "id": 11,
    "name": "Apple Cyber",
    "dark_text": "d6ffc7",
    "light_text": "1b6600",
    "dark_wall": "44ff00",
    "light_wall": "9aff75"
  },
  {
    "id": 12,
    "name": "Aqua Cyan",
    "dark_text": "9efdff",
    "light_text": "005c7a",
    "dark_wall": "00b5b8",
    "light_wall": "29fbff"
  },
  {
    "id": 13,
    "name": "Electric Violet",
    "dark_text": "ddd6ff",
    "light_text": "6800bd",
    "dark_wall": "9985ff",
    "light_wall": "c8bdff"
  },
  {
    "id": 14,
    "name": "Umber Tangerine",
    "dark_text": "ffc2ad",
    "light_text": "993600",
    "dark_wall": "ff622e",
    "light_wall": "ff8861"
  },
  {
    "id": 15,
    "name": "Kiwi Chartreuse",
    "dark_text": "fffdb8",
    "light_text": "485c00",
    "dark_wall": "fff700",
    "light_wall": "fffb7a"
  },
  {
    "id": 16,
    "name": "Sage Seafoam",
    "dark_text": "b8fff3",
    "light_text": "005c7a",
    "dark_wall": "00ffd5",
    "light_wall": "70ffe7"
  },
  {
    "id": 17,
    "name": "Amethyst Orchid",
    "dark_text": "e0c2ff",
    "light_text": "9400bd",
    "dark_wall": "ba75ff",
    "light_wall": "d4a8ff"
  },
  {
    "id": 18,
    "name": "Canna Fire",
    "dark_text": "ffb3ad",
    "light_text": "b30c00",
    "dark_wall": "ff6257",
    "light_wall": "ff8880"
  },
  {
    "id": 19,
    "name": "Larch Lemon",
    "dark_text": "fff5b3",
    "light_text": "5c5000",
    "dark_wall": "ffdd00",
    "light_wall": "ffea61"
  },
  {
    "id": 20,
    "name": "Basil Mint",
    "dark_text": "ccffe7",
    "light_text": "006122",
    "dark_wall": "00ff88",
    "light_wall": "75ffbf"
  },
  {
    "id": 21,
    "name": "Cobalt Frost",
    "dark_text": "a8deff",
    "light_text": "0537ff",
    "dark_wall": "3d98ff",
    "light_wall": "66c4ff"
  },
  {
    "id": 22,
    "name": "Fuchsia Neon",
    "dark_text": "ffd6dd",
    "light_text": "ad005c",
    "dark_wall": "ff6179",
    "light_wall": "ffa8b5"
  },
  {
    "id": 23,
    "name": "Teak Gold",
    "dark_text": "ffdfa8",
    "light_text": "7a4e00",
    "dark_wall": "ffa200",
    "light_wall": "ffbf52"
  },
  {
    "id": 24,
    "name": "Pea Neon Green",
    "dark_text": "c2ffc6",
    "light_text": "006607",
    "dark_wall": "00ff11",
    "light_wall": "8aff92"
  },
  {
    "id": 25,
    "name": "Hosta Cerulean",
    "dark_text": "8af7ff",
    "light_text": "0056b3",
    "dark_wall": "00a4db",
    "light_wall": "1ff0ff"
  },
  {
    "id": 26,
    "name": "Blueberry Pulse",
    "dark_text": "cce0ff",
    "light_text": "600aff",
    "dark_wall": "5294ff",
    "light_wall": "9ec3ff"
  },
  {
    "id": 27,
    "name": "Chestnut Amber",
    "dark_text": "ffd8b8",
    "light_text": "8f4000",
    "dark_wall": "ff7300",
    "light_wall": "ffab66"
  },
  {
    "id": 28,
    "name": "Lime Electric",
    "dark_text": "f3ffb8",
    "light_text": "325c00",
    "dark_wall": "d4ff00",
    "light_wall": "e6ff66"
  },
  {
    "id": 29,
    "name": "Teal Matrix",
    "dark_text": "9efff4",
    "light_text": "0056b3",
    "dark_wall": "00e0c6",
    "light_wall": "57ffeb"
  }
];

function generateKeyframesCSS(isLight = false, totalDuration = 150) {
  const n = palettes.length;
  const p = 100 / n;
  const hold = p * 0.82;

  // Daily synchronized coprime lockstep (matches microservices lockstep exactly)
  const slot = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const startIndex = (slot * 7 + 6) % n;
  const activePalettes = [...palettes.slice(startIndex), ...palettes.slice(0, startIndex)];

  let dotKfs = '';
  let wallKfs = '';
  let textKfs = '';

  activePalettes.forEach((pal, i) => {
    const p1 = (i * p).toFixed(2);
    const p2 = (i * p + hold).toFixed(2);
    const wallCol = isLight ? pal.light_wall : pal.dark_wall;
    const textCol = isLight ? pal.light_text : pal.dark_text;

    dotKfs += '    ' + p1 + '%, ' + p2 + '% { fill: #' + wallCol + '; }\n';
    wallKfs += '    ' + p1 + '%, ' + p2 + '% { fill: #' + wallCol + '; }\n';
    textKfs += '    ' + p1 + '%, ' + p2 + '% { fill: #' + textCol + '; }\n';
  });

  const firstPal = activePalettes[0];
  const firstWall = isLight ? firstPal.light_wall : firstPal.dark_wall;
  const firstText = isLight ? firstPal.light_text : firstPal.dark_text;

  dotKfs += '    100% { fill: #' + firstWall + '; }\n';
  wallKfs += '    100% { fill: #' + firstWall + '; }\n';
  textKfs += '    100% { fill: #' + firstText + '; }\n';

  const animPrefix = isLight ? 'dyn_light' : 'dyn_dark';

  return `
    <style>
      @keyframes ${animPrefix}_dot {
${dotKfs}      }
      @keyframes ${animPrefix}_wall {
${wallKfs}      }
      @keyframes ${animPrefix}_text {
${textKfs}      }
      .dot-lvl-1 { animation: ${animPrefix}_dot ${totalDuration}s linear infinite !important; opacity: 0.30; }
      .dot-lvl-2 { animation: ${animPrefix}_dot ${totalDuration}s linear infinite !important; opacity: 0.55; }
      .dot-lvl-3 { animation: ${animPrefix}_dot ${totalDuration}s linear infinite !important; opacity: 0.80; }
      .dot-lvl-4 { animation: ${animPrefix}_dot ${totalDuration}s linear infinite !important; opacity: 1.00; }
      rect[id^="wh-"], rect[id^="wv-"] {
        animation: ${animPrefix}_wall ${totalDuration}s linear infinite !important;
      }
      text {
        animation: ${animPrefix}_text ${totalDuration}s linear infinite !important;
      }
    </style>
  `;
}

function transformDots(content, isLight = false) {
  const levelMap = isLight ? {
    '#cfe8ff': 1,
    '#9fd1ff': 2,
    '#61dafb': 3,
    '#2196f3': 4
  } : {
    '#1e6679': 1,
    '#1897b4': 2,
    '#00ddff': 3,
    '#00ffff': 4
  };

  const emptyFill = isLight ? '#f5faff' : '#161b22';
  const bgSlotFill = isLight ? '#ebedf0' : '#161b22';

  const cellRegex = /<rect id="(c-\d+-\d+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)" rx="([^"]+)"[^>]*>([\s\S]*?)<\/rect>/g;

  return content.replace(cellRegex, (match, cid, x, y, w, h, rx, inner) => {
    const animMatch = inner.match(/<animate attributeName="fill"[^>]*values="([^"]+)"[^>]*keyTimes="([^"]+)"[^>]*\/>/);
    if (!animMatch) {
      return match;
    }

    const valuesStr = animMatch[1];
    const keytimesStr = animMatch[2];
    const durMatch = inner.match(/dur="([^"]+)"/);
    const dur = durMatch ? durMatch[1] : '255200ms';

    const initialColor = valuesStr.split(';')[0];
    const level = levelMap[initialColor] || 0;

    if (level === 0 || valuesStr.split(';').length <= 2) {
      return `<rect id="${cid}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${emptyFill}"/>`;
    }

    const bgRect = `<rect id="bg-${cid}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${bgSlotFill}"/>`;
    const dotRect = `<rect id="${cid}" class="dot-lvl-${level}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}">\n\t\t\t\t<animate attributeName="visibility" dur="${dur}" repeatCount="indefinite" values="visible;visible;hidden;hidden" keyTimes="${keytimesStr}"/>\n\t\t\t</rect>`;

    return bgRect + '\n\t\t\t' + dotRect;
  });
}

function injectDynamicTheme(filePath, isLight = false) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found, skipping: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove any previously injected dyn_<theme> style tags
  content = content.replace(/<style>[\s\S]*?dyn_(?:dark|light)_[\s\S]*?<\/style>/g, '');

  // Transform dots into synchronized dynamic dots with visibility eating
  content = transformDots(content, isLight);

  const styleBlock = generateKeyframesCSS(isLight);

  if (content.includes('</defs>')) {
    content = content.replace('</defs>', `</defs>\n${styleBlock}`);
  } else {
    content = content.replace(/<svg[^>]*>/, `$&\n${styleBlock}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully injected synchronized dynamic theme + dots into ${filePath} (isLight=${isLight})`);
}

function main() {
  const darkPath = path.resolve(__dirname, '../../dist/pacman-contribution-graph-dark.svg');
  const lightPath = path.resolve(__dirname, '../../dist/pacman-contribution-graph-light.svg');

  injectDynamicTheme(darkPath, false);
  injectDynamicTheme(lightPath, true);
}

if (require.main === module) {
  main();
}

module.exports = { injectDynamicTheme, generateKeyframesCSS, transformDots };
