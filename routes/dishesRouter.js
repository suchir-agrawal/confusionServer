const express = require('express')
const { NotExtended } = require('http-errors')
const router = express.Router()
const Dishes = require('../models/dishes')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

router.use(bodyParser.json());


router.route('/')
.get((req,res) => {
    // res.end("Will provide you detail of all the dishes")
    Dishes.find({})
    .then((dishes) => {
        res.statusCode=200;
        res.header('Content-type', 'application/json');
        res.json(dishes)
    }, (err) =>  next(err) )
    .catch((err) => next(err) );

})
.post((req,res) => {
    // res.end("will add the dish: "+ req.body.name + " with description: " + req.body.description);
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish created ', dish)
        res.statusCode=200;
        res.header('Content-type', 'application/json');
        res.json(dish)
    }, (err) =>  {console.log(err)} )
    .catch((err) =>  {console.log(err)} )
})
.put((req,res) => {
    res.statusCode=403;
    res.end("PUT method for dishes is not supported")
})
.delete((req,res) => {
    // res.end("Will delete all dishes for you.")
    Dishes.remove({})
    .then((dish) => {
        console.log("Dish delted: ",dish)
        res.statusCode=200;
        res.header('Content-type', 'application/json');
        res.json(dish)
    }, (err) => { next(err) })
    .catch((err) => { next(err) })
})


router.route('/:dishID')
.get((req,res) => {
    // res.end("Will provide you with detail of the dish with dishID: "+ req.params.dishID)
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        res.statusCode=200;
        res.header('Content-type', 'application/json');
        res.json(dish)
    }, (err) =>  {console.log(err)} )
    .catch((err) =>  {console.log(err)})
})
.post((req,res) => {
    res.statusCode=403
    res.end("POST operation for dish: "+ req.params.dishID +" is not supported");
})
.put( (req,res) => {
    // res.write("Update dish: "+ req.params.dishID)
    // res.end("will update the dish: "+ req.body.name + "with description" + req.body.description)
    Dishes.findByIdAndUpdate(req.params.dishID, {
        $set: req.body
    },{ new: true})
    .then((dish) => {
        console.log("Dish label updated: ", dish)
        res.statusCode=200;
        res.header('Content-type', 'application/json');
        res.json(dish)
    }, (err) =>  {console.log(err)} )
    .catch((err) =>  {console.log(err)})
})
.delete((req,res) => {
    // res.end("Will delete dish with ID: "+req.params.dishID)
    Dishes.findByIdAndRemove(req.params.dishID)
    .then((dish) => {
        res.statusCode=200;
            res.header('Content-type', 'application/json');
            res.json(dish)
    }, (err) =>  {console.log(err)} )
    .catch((err) =>  {console.log(err)})

})

module.exports=router