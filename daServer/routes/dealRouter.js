const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Deals = require('../models/deals');

const dealRouter = express.Router();

dealRouter.use(bodyParser.json());

dealRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.find(req.query).sort({"updatedAt":-1})
            .populate('reviews.author')
            .then((deals) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deals);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.create(req.body)
            .then((deals) => {
                console.log('Deal Created ', deals);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deals);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /deals');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dealRouter.route('/:dealId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .populate('reviews.author')
            .then((deal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deal);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /deals/' + req.params.dealId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findByIdAndUpdate(req.params.dealId, {
            $set: req.body
        }, { new: true })
            .then((deal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deal);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findByIdAndRemove(req.params.dealId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dealRouter;