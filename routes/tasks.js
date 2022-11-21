var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Tasks = require('../models/tasks');

var tasks = express.Router();
tasks.use(bodyParser.json());


tasks.get('/', function(req, res, next) {

  Tasks.find({})
      .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      }, (err) => next(err))
      .catch((err) => next(err))
});
tasks.post('/', function(req, res, next) {
  // var newDish = Dishes({
  //   name: 'Uthappizza',
  //   description: 'test'
  // });
  // newDish.save()
  //     .then((dish) => {
  //       console.log(dish);
  //
  //       return Dishes.find({});
  //     })
  //     .then((dishes) => {
  //       console.log(dishes);
  //
  //       return Dishes.remove({});
  //     })
  //     .then(() => {
  //       return mongoose.connection.close();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  Tasks.create(req.body)
      .then((dish) => {
        console.log('Task Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err))
});
tasks.put('/', function(req, res, next) {
  res.statusCode = 403;
  res.end('PUT operation not supported in Tasks');
});
tasks.delete('/', function(req, res, next) {
  Tasks.remove({})
      .then((resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          // res.json(resp);
        res.end('All Tasks deleted');
      }, (err) => next(err))
      .catch((err) => next(err))

});



tasks.route('/:taskId')
    .get((req, res, next) => {
      Tasks.findById(req.params.taskId)
          .then(task => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(task);
          }, (err) => next(err))
          .catch((err) => next(err))
    })
    .post((req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /tasks/' + req.params.taskId);
    })
    .put((req, res, next) => {
      Tasks.findByIdAndUpdate(req.params.taskId, {
        $set: req.body
      }, {
        new: true
      }).then(task => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(task);
      }, (err) => next(err))
          .catch((err) => next(err))
    })
    .delete((req, res, next) => {
      Tasks.findByIdAndRemove(req.params.taskId).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
          .catch((err) => next(err))
      res.end('Deleting all the dishes!');
    });


module.exports = tasks;
