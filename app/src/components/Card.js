import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import FavoritesButton from "./FavoritesButton"
import { baseUrl } from '../shared/baseUrl'



const Card = (props) => {
    return (
        <div class="col-md-6 col-lg-4">
            <div class="card mb-4">
                <img class="card-img-top" src={baseUrl + props.deal.logoimage} alt={props.deal.company} />
                <div class="card-body">
                    <h5 class="text-center">{props.deal.company}</h5>
                    <p class="card-text" style={{ marginBottom: 0 }}>{props.deal.description}</p>
                    <p class="card-text text-right"><small>{props.deal.city}</small></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="align-self-center">
                            <div class="btn-group btn-group-sm" role="group" aria-label="...">
                                <Link className="btn btn-sm btn-outline-secondary" color="outline-secondary" outline to={`/deal/${props.deal._id}`} >View</Link>
                                <FavoritesButton auth={props.auth}
                                    dealId = {props.deal._id}
                                    favorites={props.favorites}
                                    isFavoritesLoading={props.isFavoritesLoading}
                                    favoriteserrMess={props.favoriteserrMess}
                                    deleteFavorite={props.deleteFavorite}
                                    postFavorite={props.postFavorite}
                                    fromFavorites={props.fromFavorites} />
                            </div>
                        </div>
                        <div className="align-self-center">
                            <StarRatings rating={props.deal.rating} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Card;