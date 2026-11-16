'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json')));
const files = ['manifest.json', 'index.html', 'src/style.css', 'src/enhancements.css', 'src/app.js', 'src/background.js',
  'src/desk-core.js', 'src/timer-core.js', 'src/pomodoro.js', 'src/enhancements.js', 'src/tabs-panel.js', 'src/card-drag.js', 'src/close-confirm.js', 'src/palette-core.js', 'src/notes-panel.js', 'src/bookmarks.js', 'src/forest-library.js', 'src/wallpaper.js', 'src/background-image.js',
  'src/dashboard-runtime.js', 'src/deferred-trigger-position.js', 'src/drawer-manager.js', 'src/group-order.js',
  'src/icon-utils.js', 'src/list-order.js', 'src/session-groups.js', 'src/theme-controls.js', 'src/todos-store.js',
  'src/ui-helpers.js', 'about.html', 'privacy.html', 'src/about.css', 'LICENSE',
  'fonts/fonts.css', 'fonts/libre-caslon-display-400.ttf', 'fonts/public-sans-400.ttf', 'fonts/public-sans-500.ttf', 'fonts/public-sans-600.ttf', 'fonts/public-sans-700.ttf', 'fonts/Libre-Caslon-Display-OFL.txt', 'fonts/Public-Sans-OFL.txt',
  'icons/mark.svg', 'icons/icon16.png', 'icons/icon32.png', 'icons/icon48.png', 'icons/icon128.png'];
for (const file of files) if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing release file: ${file}`);
fs.mkdirSync(path.join(root, 'release'), { recursive: true });
const target = path.join(root, 'release', `still-tab-${manifest.version}.zip`);
// Recreate the generated artifact so removed files cannot linger from an earlier build.
if (fs.existsSync(target)) fs.unlinkSync(target);
execFileSync('/usr/bin/zip', ['-X', '-q', target, ...files], { cwd: root });
console.log(target);
