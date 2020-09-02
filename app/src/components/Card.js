import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import FavoritesButton from "./FavoritesButton"
import { baseUrl } from '../shared/baseUrl'


class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    componentDidMount() {
        if (!this.props.isReviewsLoading && !this.props.reviewsErrMess &&
            !this.props.isFavoritesLoading && !this.props.favoriteserrMess) {
          let rating = 0
          let n = Math.min(this.props.reviews.length, 100);
          for (let i = 0; i < n; i++) {
            rating = rating + this.props.reviews[i].rating
          }
          rating = rating / n
          this.setState({
            rating: 4
          });
        }
    
      }

    render() {
        return (
            <div class="col-md-6 col-lg-4">
                <div class="card mb-4">
                    <Link className="btn btn-sm btn-outline-secondary" color="outline-secondary" outline to={`/deal/${this.props.deal._id}`} className="link-deal">
                        <img class="card-img-top" src={baseUrl + this.props.deal.logoimage} alt={this.props.deal.company} />
                    </Link>
                    <div class="card-body">
                        <h5 class="text-center">{this.props.deal.company}</h5>
                        <p class="card-text" style={{ marginBottom: 0 }}>{this.props.deal.description}</p>
                        <p class="card-text text-right"><small>{this.props.deal.city}</small></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="align-self-center">
                                <div class="btn-group btn-group-sm" role="group" aria-label="...">
                                    <Link className="btn btn-sm btn-outline-secondary" color="outline-secondary" outline to={`/deal/${this.props.deal._id}`} >View</Link>
                                    <FavoritesButton auth={this.props.auth}
                                        dealId={this.props.deal._id}
                                        favorites={this.props.favorites}
                                        isFavoritesLoading={this.props.isFavoritesLoading}
                                        favoriteserrMess={this.props.favoriteserrMess}
                                        deleteFavorite={this.props.deleteFavorite}
                                        postFavorite={this.props.postFavorite}
                                        fromFavorites={this.props.fromFavorites} />
                                </div>
                            </div>
                            <div className="align-self-center">
                                <StarRatings rating={this.state.rating} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default Card;