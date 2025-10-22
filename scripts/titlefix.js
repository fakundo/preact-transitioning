const fs = require('fs');

const INDEX_PATH = 'docs/index.html';
const DEFAULT_TITLE = '@storybook/core - Storybook';
const NEW_TITLE = 'preact-transitioning ⋅ Docs';

const indexHtml = fs.readFileSync(INDEX_PATH, { encoding: 'utf-8' });
const changedHtml = indexHtml.replace(new RegExp(DEFAULT_TITLE), NEW_TITLE);
fs.writeFileSync(INDEX_PATH, changedHtml);
