import { createServer } from 'https';
import fs from 'fs';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Read the certificate and key files
const options = {
  cert: fs.readFileSync('localhost.crt'), // Path to your certificate file
  key: fs.readFileSync('localhost.key'), // Path to your private key file
};

app.prepare().then(() => {
  const server = createServer(options, async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
