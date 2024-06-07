//create web server
const express = require('express');
const app = express();
const port = 3000;
//create a comment
//this is a comment
app.get('/comment', (req, res) => {
  res.send('This is a comment');
});
//start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
//comment.js