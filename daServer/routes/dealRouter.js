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
            .populate('comments.author')
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
            .populate('comments.author')
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

dealRouter.route('/:dealId/comments')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .populate('comments.author')
            .then((deal) => {
                if (deal != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(deal.comments);
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
                    deal.comments.push(req.body);
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('comments.author')
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
            + req.params.dealId + '/comments');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null) {
                    for (var i = (deal.comments.length - 1); i >= 0; i--) {
                        deal.comments.id(deal.comments[i]._id).remove();
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

dealRouter.route('/:dealId/comments/:commentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(deal.comments.id(req.params.commentId));
                }
                else if (deal == null) {
                    err = new Error('Deal ' + req.params.dealId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /deals/' + req.params.dealId
            + '/comments/' + req.params.commentId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.comments.id(req.params.commentId) != null) {

                    if (!deal.comments.id(req.params.commentId).author._id.equals(req.user._id)) {
                        err = new Error('You are not authorized to edit this comment');
                        err.status = 403;
                        return next(err);
                    }

                    if (req.body.rating) {
                        deal.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        deal.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('comments.author')
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
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals.findById(req.params.dealId)
            .then((deal) => {
                if (deal != null && deal.comments.id(req.params.commentId) != null) {

                    if (!deal.comments.id(req.params.commentId).author._id.equals(req.user._id)) {
                        err = new Error('You are not authorized to edit this comment');
                        err.status = 403;
                        return next(err);
                    }

                    deal.comments.id(req.params.commentId).remove();
                    deal.save()
                        .then((deal) => {
                            Deals.findById(deal._id)
                                .populate('comments.author')
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
                    err = new Error('Comment ' + req.params.commentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dealRouter;