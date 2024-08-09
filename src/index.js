const express = require('express');
const cors = require('cors');

const routes = require('./app/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(8080, () => {
  console.log('');
  console.log('🌐 Server running at http://localhost:8080 🌐');
  console.log('');
});
