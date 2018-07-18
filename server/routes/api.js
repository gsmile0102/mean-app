const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://gsmile0102:chboon0102@ds141221.mlab.com:41221/videoplayer"
mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
    if(err) {
        console.log('Error! ', err);
    }
});

router.get('/videos', (req, res) => {
    console.log('Get request for all videos');
    Video.find({}).exec((err, videos) => {
        if (err) {
            console.log("Error retrieving videos");
        }
        else {
            res.json(videos);
        }
    });
});

router.get('/videos/:id', (req, res) => {
    console.log('Get request for a single video');
    Video.findById(req.params.id).exec((err, video) => {
        if (err) {
            console.log("Error retrieving videos");
        }
        else {
            res.json(video);
        }
    });
});

router.post('/video', (req, res) => {
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save((err, insertedVideo) => {
        if (err) {
            console.log('Error saving video');
        }
        else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', (req,res) => {
    console.log('Update a video');
    Video.findByIdAndUpdate(
    // 1st arg - id
    req.params.id, 
    // 2nd arg - data to update
    {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    }, 
    // 3rd arg - is it new video?
    {
        new: true
    }, 
    // 4th arg - callback function
    (err, updatedVideo) => {
        if(err) {
            res.send('Error updating video');
        }
        else {
            res.json(updatedVideo);
        }
    });
});

router.delete('/video/:id', (req, res) => {
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, (err, deletedVideo) => {
        if (err) {
            res.send('Error deleting video');
        }
        else {
            res.json(deletedVideo);
        }
    });
});

module.exports = router;
