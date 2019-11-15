const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');

const Users = require('../models/users.js');

router.get('/', (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        res.json(foundUsers);
    });
});

router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Users.create(req.body, (err, createdUser)=>{
        res.status(201).json({
            status:201,
            message: "user created"
        });
    });
});

router.post('/sessions', (req, res)=>{
    Users.findOne({ username: req.body.username }, (err, foundUser)=>{
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            req.session.loggedin = true;
            res.status(201).json({
                status:201,
                message:'session created'
            });
        } else {
            res.status(401).json({
                status:401,
                message:'login failed'
            });
        }
    });
});

router.delete('/sessions', (req, res)=>{
    req.session.destroy(()=>{
        res.status(200).json({
            status:200,
            message:'logout complete'
        });
    });
})

router.get('/sessionUser', (req, res)=>{
    if(req.session.currentUser){
        res.json(req.session.currentUser);
    } else {
        res.status(401).json({
            status:401,
            message:'not logged in'
        });
    }
});

router.delete('/:id', (req, res)=>{
    Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
        res.json(deletedUser);

    });
});

router.put('/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
        res.json(updatedUser);
    });
});

module.exports = router;
