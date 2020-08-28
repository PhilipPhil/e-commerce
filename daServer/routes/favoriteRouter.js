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
    .get(cors.cors, (req, res, next) => {
        Favorites.find({})
            .populate('deal')
            .populate('user')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                if (favorite == null) {
                    Favorites.create()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            for (const i in req.body) {
                                favorite.deals.push(req.body[i]);
                            }
                            favorite.save()
                            res.json(favorite);
                        }, (err) => next(err));
                } else {
                    for (const i in req.body) {
                        Favorites.findOne({user: newFavorite.user})
                            .then((oldFavorite) => {
                                if (oldFavorite == null) {
                                    favorite.deals.push(req.body[i]);
                                }
                            });
                    }
                    favorite.save();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json(favorite);
                }
            })
            .catch((err) => next(err));
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:favoriteId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {

        Favorites.findById(req.params.favoriteId)
            .then((favorite) => {
                if (!(favorite.user.equals(req.user._id))) {
                    var err = new Error('Only creator can perform this');
                    err.status = 401;
                    return next(err);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findById(req.body._id)
            .then((favorite) => {
                if (favorite == null) {
                    let newFavorite = {};
                    newFavorite.user = req.user._id;
                    Favorites.create(newFavorite)
                        .then((favorite) => {
                            console.log('Favorite Created ', newFavorite);
                            favorite.deal.push(req.params.favoriteId)
                            favorite.save()
                                .then((favorite) => {
                                    Deal.findById(favorite._id)
                                        .then((favorite) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(favorite);
                                        })
                                }, (err) => next(err));
                        }, (err) => next(err))
                        .catch((err) => next(err));
                } else {
                    err = new Error('Deal ' + req.params.dealId + ' already exist');
                    err.status = 404;
                    return next(err);
                }
            })
    })
    .put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findByIdAndUpdate(req.params.favoriteId, {
            $set: req.body
        }, {new: true})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                favorite.deals.remove(req.params.favoriteId);
                favorite.save()
                    .then((deal) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err));
            })
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;