const http = require('http');
const app = require('./app');

const database = require('./database');
const config = require('./config');

const server = http.createServer(app);

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

const ready = async () => {
  await database.connect();

  server.listen(config.global.port, () =>
    console.info(
      `> Server is running on port ${config.global.port} (${app.get('env')})`,
    ),
  );
};

ready();
