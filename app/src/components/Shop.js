import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import SearchBar from './SearchBar'
import Loading from "./Loading"
import { baseUrl } from '../shared/baseUrl'
import Error from './Error';
import Card from "./Card"
class Shop extends Component {

  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      company: false,
      city: false,
      category: false
    };
  }

  setFilter(values) {
    this.setState({
      company: values.company,
      city: values.city,
      category: values.category
    })
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container py-4">
          <SearchBar setFilter={this.setFilter} />
          <div class="row">
            <Loading />
          </div>
        </div>
      )
    } else if (this.props.errMess) {
      return (<Error errMess={this.props.errMess} />);
    }


    else if (this.props.deals != null) {

      const menu = this.props.deals.map((deal) => {
        if ((!this.state.category || this.state.category == 'all' || this.state.category == deal.category) &&
          (!this.state.city || this.state.city == 'any' || this.state.city == deal.city) &&
          (!this.state.company || this.state.company.length == 0 || deal.company.toLowerCase().includes(this.state.company.toLowerCase())  )) {
          return (
            <Card deal={deal}
              auth={this.props.auth}
              favorites={this.props.favorites}
              isFavoritesLoading={this.props.isFavoritesLoading}
              favoriteserrMess={this.props.favoriteserrMess}
              deleteFavorite={this.props.deleteFavorite}
              postFavorite={this.props.postFavorite}
              fromFavorites={false}
              reviews={this.props.reviews.filter((review) => review.deal === deal._id)}
              isReviewsLoading={this.props.reviews.isLoading}
              reviewsErrMess={this.props.reviews.errMess}
            />
          );
        }
      });

      return (
        <div className="container py-4">
          <SearchBar setFilter={this.setFilter} />
          <div class="row">
            {menu}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-4">
          <SearchBar setFilter={this.setFilter} />
          <div class="row">
          </div>
        </div>
      );
    }

  }
}

export default Shop;