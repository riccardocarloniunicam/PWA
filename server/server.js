const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require ('./app/models/index');
const cors = require('cors');
const app = express();
const autMiddleware = require ('./app/middleware/authMiddeware');
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const routes = require('./app/routes/routes');
routes(app);
app.use(cors());
app.use(autMiddleware);
db.sequelize.sync({ force: true }).then(() => {
  
  // inside our db sync callback, we start the server
  // this is our way of making sure the server is not listening 
  // to requests if we have not made a db connection
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});