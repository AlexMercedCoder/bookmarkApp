const express = require('express');
const router = express.Router();

const Bookmarks = require('../models/bookmark.js');

router.get('/:user', (req, res)=>{
    Bookmarks.find({username:req.params.user}, (err, foundBookmarks)=>{
        res.json(foundBookmarks);
    });
});

router.post('/', (req, res)=>{
    Bookmarks.create(req.body, (err, createdBookmark)=>{
        res.json(createdBookmark);
    });
});

router.delete('/:id', (req, res)=>{
    Bookmarks.findByIdAndRemove(req.params.id, (err, deletedBookmark)=>{
        res.json(deletedBookmark);
    });
});

router.put('/:id', (req, res)=>{
    Bookmarks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBookmark)=>{
        res.json(updatedBookmark);
    });
});

module.exports = router;
