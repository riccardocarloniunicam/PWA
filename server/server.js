
// const http = require('http');
// const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const db = require ('./app/models/index');
const cors = require('cors');
// const fs = require('fs');
// const credentials = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const express = require('express');
const app = express();
const routes = require('./app/routes/routes');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.use(cors());
app.use(express.static('public/'));

// const server = https.createServer(credentials, app);
// server.listen(PORT, () => {
//   console.log(`App listening on PORT ${PORT}`);
// });
//  db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`App listening on PORT ${PORT}`);
//   });
//  });