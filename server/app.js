const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

const port = 3100;

app.post('/chat', (req, res) => {
  res.send({ "data": "hello world" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

