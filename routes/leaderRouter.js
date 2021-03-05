const express = require('express')
const router = express.Router()




router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Context-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end("Will provide you detail of all the leaders")
})
.post((req,res) => {
    res.end("will add the leader: "+ req.body.name + " with description: " + req.body.description);
})
.put((req,res) => {
    res.statusCode=403;
    res.end("PUT method for leaders is not supported")
})
.delete((req,res) => {
    res.end("Will delete all leaders for you.")
})


router.route('/:leaderID')
.get((req,res) => {
    res.end("Will provide you with detail of the leader with leaderID: "+ req.params.leaderID)
})
.post((req,res) => {
    res.statusCode=403
    res.end("POST operation for leader: "+ req.params.leaderID +" is not supported");
})
.put( (req,res) => {
    res.write("Update leader: "+ req.params.leaderID)
    res.end("will update the leader: "+ req.body.name + "with description" + req.body.description)
})
.delete((req,res) => {
    res.end("Will delete leader with ID: "+req.params.leaderID)
})

module.exports=router