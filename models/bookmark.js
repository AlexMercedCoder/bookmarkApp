const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
title: String,
url: String,
username: String
});

const Bookmarks = mongoose.model('bookmarks', bookmarkSchema);

module.exports = Bookmarks;
