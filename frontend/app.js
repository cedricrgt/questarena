'use strict';
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const dir = path.join(__dirname);
const app = next({ dev, dir });
const handle = app.getRequestHandler();

if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(typeof(PhusionPassenger) !== 'undefined' ? 'passenger' : 3000, (err) => {
    if (err) throw err;
    console.log('> Ready');
  });
}).catch((err) => {
  console.error('Error starting Next.js:', err);
  process.exit(1);
});