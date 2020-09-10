const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Reviews = require('../models/reviews');

const reviewRouter = express.Router();

reviewRouter.use(bodyParser.json());

reviewRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Reviews.find(req.query).sort({"updatedAt":-1})
            .populate('author')
            .then((reviews) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reviews);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Reviews.findOne({ author: req.user._id, deal : req.body.deal }, (err, review) => {
            if (err) { return next(err); }
            if (!review && req.body != null) {
                req.body.author = req.user._id;
                Reviews.create(req.body)
                    .then((review) => {
                        Reviews.findById(review._id)
                            .populate('author')
                            .then((review) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(review);
                            })
                    }, (err) => next(err))
                    .catch((err) => next(err));
            } else {
                err = new Error('Review not found');
                err.status = 404;
                return next(err);
            }

        })

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /reviews');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Reviews.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

reviewRouter.route('/:reviewId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Reviews.findById(req.params.reviewId)
            .then((review) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(review);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /reviews/' + req.params.reviewId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Reviews.findById(req.params.reviewId)
            .then((review) => {
                if (review != null) {
                    if (!review.author.equals(req.user._id)) {
                        var err = new Error('Not authorized to update this review');
                        err.status = 403;
                        return next(err);
                    }
                    req.body.author = req.user._id;
                    Reviews.findByIdAndUpdate(req.params.reviewId, {
                        $set: req.body
                    }, { new: true })
                        .then((review) => {
                            Reviews.findById(review._id)
                                .populate('author')
                                .then((review) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(review);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('review ' + req.params.reviewId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Reviews.findById(req.params.reviewId)
            .then((review) => {
                if (review != null) {
                    if (!review.author.equals(req.user._id)) {
                        var err = new Error('Not authorized to delete this review');
                        err.status = 403;
                        return next(err);
                    }
                    Reviews.findByIdAndRemove(req.params.reviewId)
                        .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else {
                    err = new Error('review ' + req.params.reviewId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = reviewRouter;