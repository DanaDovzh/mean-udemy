const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const PostModule = require('./models/post')
require('dotenv').config()
const url = process.env.MONGO_URI;
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connection successful "))
    .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
})

app.post('/api/post', (req, res, next) => {
  const post = new PostModule({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added'
  });
})
app.get('/api/posts',(req, res, next) => {
  PostModule.find()
    .then(result => {
      res.status(200).json({
        message: 'Good',
        posts: result
      });
      console.log(result)})
    .catch(err => {console.log(err) })

})

app.delete('/api/posts/:id',(req, res, next) => {
  const idDelete  = req.params.id;
  PostModule.deleteOne({_id: idDelete})
  .then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Post is deleted'})
  })
})

module.exports = app;
