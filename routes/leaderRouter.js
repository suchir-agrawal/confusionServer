const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Leaders = require('../models/leaders')
const bodyParser = require('body-parser')

router.use(bodyParser.json())


router.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log("Leader Created")
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res) => {
    res.statusCode=403;
    res.end("PUT method for Leaders is not supported")
})
.delete((req,res) => {
    Leaders.remove({})
    .then((leaders) => {
        console.log("All records get deleted")
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err))
    
})


router.route('/:leaderID')
.get((req,res) => {
    Leaders.findById(req.params.leaderID)
    .then((leader) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res) => {
    res.statusCode=403
    res.end("POST operation for pleader: "+ req.params.leaderID +" is not supported");
})
.put( (req,res) => {
    // res.write("Update promotion: "+ req.params.promotionID)
    // res.end("will update the promotion: "+ req.body.name + "with description" + req.body.description)
    Leaders.findByIdAndUpdate(req.params.leaderID, {
        $set: req.body
    }, { new: true})
    .then((leader) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req,res) => {
    Leaders.findByIdAndRemove(req.params.leaderID)
    .then((leader) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports=router