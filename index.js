const express = require('express');
const server = express();
const port = 8000;

server.get('/', (req, res) => {
  res.send('ehi');
});

server.listen(port);

console.log('Server is listening on port: ' + port);
