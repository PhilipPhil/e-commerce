const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Emailform = require('../models/Emailform');
const cors = require('./cors');


const emailformRouter = express.Router();

emailformRouter.use(bodyParser.json());

emailformRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Emailform.find({})
    .then((emailform) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emailform);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    Emailform.create(req.body)
    .then((emailform) => {
        console.log('Emailform Created ', emailform);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emailform);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /emailform');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /emailform');
});

module.exports = emailformRouter;