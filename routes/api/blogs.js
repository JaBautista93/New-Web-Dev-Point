const express = require("express");
const router = express.Router();

// Require all models
const db = require("../../models");

// GET all blogs

router.get("/", (req, res) => {
  db.Blogs.find({})
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});

// get a blog by id
router.get("/:id", (req, res) => {
  db.Blogs.findById({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});

//post a new blog and  save the blog
router.post("/", (req, res) => {
  const newBlog = new db.Blogs({
    topic: req.body.topic,
    author: req.body.author,
    synopsis: req.body.synopsis
    // responses: req.body.responses,
  });

  newBlog.save().then(blog => res.json(blog));
});

// delete a blog

router.delete("/:id", (req, res) => {
  db.Blogs.findById(req.params.id)
    .then(blog => blog.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

//update a blog

router.put("/:id", (req, res) => {
  db.Blogs.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { "responses.userTime": req.body.userTime },
      $push: {
        "responses.responseName": req.body.responseName,
        "responses.responseText": req.body.responseText,
        responseDate: req.body
      }
    }
  )
    .then(blog => {
      console.log(blog);
      res.json(blog);
    })
    .catch(err => res.status(404).json(err));
});



module.exports = router;
