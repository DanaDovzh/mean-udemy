const express = require('express');
const router = express.Router();
const PostModule = require('../models/post');

router.post('', (req, res, next) => {
  const post = new PostModule({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added'
    });
  });
})

router.get('',(req, res, next) => {
  PostModule.find()
    .then(result => {
      res.status(200).json({
        message: 'Good',
        posts: result
      });
     })
    .catch(err => {console.log(err); })

})

router.delete('/:id',(req, res, next) => {
  const idDelete  = req.params.id;
  PostModule.deleteOne({_id: idDelete})
  .then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Post is deleted'})
  })
})

router.get('/:id', (req, res, next) => {
  PostModule.findById(req.params.id).then((post) => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found '});
    }
  })
})

router.put('/:id', (req, res, next) => {
  const post = new PostModule({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  console.log(11111, req.params, req.body);
  PostModule.updateOne({ _id: req.params.id}, post)
  .then((result) => {
    res.status(200).json({ message: 'Post is updated'})
  })
})


module.exports = router;
