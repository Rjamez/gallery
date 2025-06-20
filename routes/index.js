const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

// Fix for the GET route - using async/await
router.get('/', async (req, res, next) => {
  try {
    const images = await Image.find({});
    res.render('index', { images: images, msg: req.query.msg });
  } catch (err) {
    next(err);
  }
});

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.redirect(`/?msg=${err}`);
    } else {
      console.log(req.file);
      if (req.file == undefined) {
        res.redirect('/?msg=Error: No file selected!');
      } else {
        // create new image
        let newImage = new Image({
          name: req.file.filename,
          size: req.file.size,
          path: 'images/' + req.file.filename,
        });

        // save the uploaded image to the database
        newImage.save();

        res.redirect('/?msg=File uploaded successfully');
      }
    }
  });
});

module.exports = router;
