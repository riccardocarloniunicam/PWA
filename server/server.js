const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require ('./app/models/index');
const cors = require('cors');
const app = express();
const routes = require('./app/routes/routes');
const { Gender } = require('./app/models');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.use(cors());
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});