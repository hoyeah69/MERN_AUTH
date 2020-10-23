const express = require('express')

const router = express.Router()
var app = express()
const mongoose = require('mongoose')


var Usermodel = mongoose.model('users', {name:String, username:String, password:String})

mongoose.connect('mongodb://localhost:27017/mernauth', {useNewUrlParser:true, useUnifiedTopology:true}, 
    (err)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Mongo DB connected successfully');
        }
    })


router.post('/registeruser', (req, res) => {
    
    var newuser = new Usermodel({name:req.body.name, username:req.body.username, password:req.body.password})

    newuser.save((err)=>{
        if (err) {
            res.send('something went wrong');
        } else {
            res.send('user registered successfully');
        }
    })
})

router.post('/login', (req, res) => {
    Usermodel.find({
        username: req.body.username,
        password: req.body.password
    }, (err, doc) => {
        if (err) {
            res.send('something went wrong')
        } else {
            if (doc.length == 0) {
                res.send('Login Failed');
            } else {
                res.send('Login succeeded');
            }
        }
    })
})

router.post('/getusers', (req, res) => {
    Usermodel.find({}, (err, doc) => {
        if (err) {
            res.send('something went wrong')
        } else {
            res.send(doc);
        }
    })
})

module.exports = router