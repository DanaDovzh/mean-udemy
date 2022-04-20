const express = require('express');
const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
})
app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: '344j3rkjf4',
      title: 'New one',
      content: 'Smth nice'
    },
    {
      id: 'erev45cvt554',
      title: 'New two',
      content: 'From server'
    }
  ]
  return res.status(200).json({
    message: 'Good',
    posts
  });
})

module.exports = app;
