const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello, World!',
    numbers: [1, 2, 3]
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
