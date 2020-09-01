const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate')
const Favorites = require('../models/favorite');
const cors = require('./cors');


const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .populate('user')
            .populate('deals')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

favoriteRouter.route('/:dealId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
        .populate('user')
        .populate('deals')
            .then((favorites) => {
                if (!favorites) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "exists": false, "favorites": favorites });
                }
                else {
                    if (favorites.deals.indexOf(req.params.dealId) < 0) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": false, "favorites": favorites });
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": true, "favorites": favorites });
                    }
                }

            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id }, (err, favorite) => {
            if (err) { return next(err); }
            if (!favorite) {
                Favorites.create({ user: req.user._id })
                    .then((favorite) => {
                        favorite.deals.push(req.params.dealId);
                        favorite.save()
                            .then((favorite) => {
                                Favorites.findById(favorite._id)
                                .populate('user')
                                .populate('deals')
                                .then((favorite) => {
                                    console.log('favorite Created ', favorite);
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favorite);
                                })
                            });
                    }, (err) => next(err))
                    .catch((err) => next(err));
            } else {
                if (favorite.deals.indexOf(req.params.dealId) < 0) {
                    favorite.deals.push(req.params.dealId);
                    favorite.save()
                        .then((favorite) => {
                            Favorites.findById(favorite._id)
                            .populate('user')
                            .populate('deals')
                            .then((favorite) => {
                                console.log('favorite added ', favorite);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            })

                        });
                } else {
                    res.statusCode = 200;
                    res.json(favorite);
                }
            }
        });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/' + req.params.dealId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite) {
                    index = favorite.deals.indexOf(req.params.dealId);
                    if (index >= 0) {
                        favorite.deals.splice(index, 1);
                        favorite.save()
                            .then((favorite) => {
                                Favorites.findById(favorite._id)
                                .populate('user')
                                .populate('deals')
                                .then((favorite) => {
                                    console.log('Favorite Deleted ', favorite);
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favorite);
                                })
                            }, (err) => next(err));
                    }
                    else {
                        err = new Error('Deal ' + req.params.dealId + ' not found');
                        err.status = 404;
                        return next(err);
                    }
                }
                else {
                    err = new Error('Favorites not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;