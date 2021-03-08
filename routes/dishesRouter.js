const express = require('express')
const bodyParser = require('body-parser')
const { NotExtended } = require('http-errors')
const router = express.Router()
const Dishes = require('../models/dishes')
const mongoose = require('mongoose')



router.use(bodyParser.json())


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
.put( (req,res,next) => {
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
.delete((req,res,next) => {
    // res.end("Will delete dish with ID: "+req.params.dishID)
    Dishes.findByIdAndRemove(req.params.dishID)
    .then((dish) => {
        res.statusCode=200;
            res.header('Content-type', 'application/json');
            res.json(dish)
    }, (err) =>  {console.log(err)} )
    .catch((err) =>  {console.log(err)})

})

//following is for comment


router.route('/:dishID/comments')
.get((req,res,next) => {
    // res.end("Will provide you detail of all the dishes")
    Dishes.findById(req.params.dishID)
    .then((dishes) => {
        if(dishes!=null){
            res.statusCode=200;
            res.header('Content-type', 'application/json');
            res.json(dishes.comments)
        }
        else{
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err) )
    .catch((err) => next(err) );

})
.post((req,res,next) => {
    // res.end("will add the dish: "+ req.body.name + " with description: " + req.body.description);
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null){
            dish.comments.push(req.body)
            dish.save()
            .then((dish) => {
                res.statusCode=200;
                res.header('Content-type', 'application/json');
                res.json(dish.comments)
            }, (err) => next(err))
        }
        else {
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err) )
    .catch((err) =>  next(err) )
})
.put((req,res) => {
    res.statusCode=403;
    res.end("PUT method for dishes is not supported")
})
.delete((req,res) => {
    // res.end("Will delete all dishes for you.")
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null){
            for(var i= (dish.comments.length-1); i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove()
            }
            dish.save()
            .then((dish) => {
                res.statusCode=200;
                res.header('Content-type', 'application/json');
                res.json(dish.comments)
            }, (err) => next(err))
        }
        else {
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err) )
    .catch((err) => { next(err) })
})


router.route('/:dishID/comments/:commentID')
.get((req,res,next) => {
    // res.end("Will provide you with detail of the dish with dishID: "+ req.params.dishID)
    Dishes.findById(req.params.dishID)
    .then((dishes) => {
        if(dishes!=null && dishes.comments.id(req.params.commentID) != null){
            res.statusCode=200;
            res.header('Content-type', 'application/json');
            res.json(dishes.comments.id(req.params.commentID))
        }
        else if(dishes==null){
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
        else{
            err = new Error("Comment with ID: " +req.params.commentID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err) )
    .catch((err) =>  {console.log(err)})
})
.post((req,res) => {
    res.statusCode=403
    res.end("POST operation for dish: "+ req.params.dishID +" is not supported");
})
.put( (req,res) => {
    // res.write("Update dish: "+ req.params.dishID)
    // res.end("will update the dish: "+ req.body.name + "with description" + req.body.description)
    Dishes.findById(req.params.dishID)
    .then((dishes) => {
        if(dishes!=null && dishes.comments.id(req.params.commentID) != null){
            if(req.body.rating){
                dishes.comments.id(req.params.commentID).rating = req.body.rating
            }
            if(req.body.comment){
                dishes.comments.id(req.params.commentID).comment = req.body.comment
            }
            dishes.save()
            .then((dish) => {
                res.statusCode=200;
                res.header('Content-type', 'application/json');
                res.json(dish.comments.id(req.params.commentID))
            })
            
        }
        else if(dishes==null){
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
        else{
            err = new Error("Comment with ID: " +req.params.commentID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err))
    .catch((err) =>  {console.log(err)})
})
.delete((req,res) => {
    // res.end("Will delete dish with ID: "+req.params.dishID)
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null && dish.comments.id(req.params.commentID) != null){
            dish.comments.id(req.params.commentID).remove()
            dish.save()
            .then((dish) => {
                res.statusCode=200;
                res.header('Content-type', 'application/json');
                res.json(dish.comments)
            })
            
        }
        else if(dishes==null){
            err = new Error("Dish with ID: " +req.params.dishID+ " is not found" )
            err.status=404
            return next(err)
        }
        else{
            err = new Error("Comment with ID: " +req.params.commentID+ " is not found" )
            err.status=404
            return next(err)
        }
    }, (err) =>  next(err) )
    .catch((err) =>  {console.log(err)})

})



module.exports=router