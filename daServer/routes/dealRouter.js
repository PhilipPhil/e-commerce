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
        Deals.find({})
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

dealRouter.route('/:dealId/reviews')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .populate('reviews.author')
            .then((deal) => {
                if (deal != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(deal.reviews);
                }
                else {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null) {
                    req.body.author = req.user._id;

                    for (var i = (deal.reviews.length - 1); i >= 0; i--) {
                        if(deal.reviews[i].author._id.equals(req.user._id)){
                            deal.reviews.id(deal.reviews[i]._id).remove();
                        }  
                    }

                    deal.reviews.push(req.body);
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('reviews.author')
                                .then((deal) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(deal);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /deals/'
            + req.params.dealId + '/reviews');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null) {
                    for (var i = (deal.reviews.length - 1); i >= 0; i--) {
                        deal.reviews.id(deal.reviews[i]._id).remove();
                    }
                    deal.save()
                        .then((deal) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(deal);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dealRouter.route('/:dealId/reviews/:reviewId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.reviews.id(req.params.reviewId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(deal.reviews.id(req.params.reviewId));
                }
                else if (deal == null) {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('review ' + req.params.reviewId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /deals/' + req.params.dealId
            + '/reviews/' + req.params.reviewId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.reviews.id(req.params.reviewId) != null) {

                    if (!deal.reviews.id(req.params.reviewId).author._id.equals(req.user._id)) {
                        err = new Error('You are not authorized to edit this review');
                        err.status = 403;
                        return next(err);
                    }

                    if (req.body.rating) {
                        deal.reviews.id(req.params.reviewId).rating = req.body.rating;
                    }
                    if (req.body.review) {
                        deal.reviews.id(req.params.reviewId).review = req.body.review;
                    }
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('reviews.author')
                                .then((deal) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(deal);
                                })
                        }, (err) => next(err));
                }
                else if (deal == null) {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Review ' + req.params.reviewId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.reviews.id(req.params.reviewId) != null) {

                    if (!deal.reviews.id(req.params.reviewId).author._id.equals(req.user._id)) {
                        err = new Error('You are not authorized to edit this review');
                        err.status = 403;
                        return next(err);
                    }

                    deal.reviews.id(req.params.reviewId).remove();
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('reviews.author')
                                .then((deal) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(deal);
                                })
                        }, (err) => next(err));
                }
                else if (deal == null) {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Review ' + req.params.reviewId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dealRouter;