const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Promotions = require('../models/promotions')
const bodyParser = require('body-parser')

router.use(bodyParser.json())


router.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotions)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log("Promotion Created")
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res) => {
    res.statusCode=403;
    res.end("PUT method for promotions is not supported")
})
.delete((req,res) => {
    Promotions.remove({})
    .then((promotions) => {
        console.log("All records get deleted")
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotions)
    }, (err) => next(err))
    .catch((err) => next(err))
    
})


router.route('/:promotionID')
.get((req,res) => {
    Promotions.findById(req.params.promotionID)
    .then((promotion) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res) => {
    res.statusCode=403
    res.end("POST operation for promotion: "+ req.params.promotionID +" is not supported");
})
.put( (req,res) => {
    // res.write("Update promotion: "+ req.params.promotionID)
    // res.end("will update the promotion: "+ req.body.name + "with description" + req.body.description)
    Promotions.findByIdAndUpdate(req.params.promotionID, {
        $set: req.body
    }, { new: true})
    .then((promotion) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req,res) => {
    Promotions.findByIdAndRemove(req.params.promotionID)
    .then((promotion) => {
        res.statusCode=200
        res.header('Context-type', 'application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports=router