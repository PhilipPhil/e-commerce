import React, { Component } from 'react';
import SearchBar from './SearchBar'
import Loading from "./Loading"
import Error from './Error';
import Card from './Card'

class Shop extends Component {

  constructor(props) {
    super(props);
    // this.setFilter = this.setFilter.bind(this);
    // this.state = {
    //   company: false,
    //   city: false,
    //   category: false,
    //   rating: 0
    // };
  }

  // setFilter(values) {
  //   this.setState({
  //     company: values.company,
  //     city: values.city,
  //     category: values.category,
  //     rating: values.rating
  //   })
  // }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container py-4">
          <SearchBar setFilter={this.props.setFilter} />
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
        if (!this.props.isReviewsLoading && !this.props.reviewsErrMess) {
          var rating = 0
          var reviewsWithId = this.props.reviews.filter((review) => review.deal === deal._id)
          var n = Math.min(reviewsWithId.length, 100);
          if (n > 0) {
            for (let i = 0; i < n; i++) {
              rating = rating + reviewsWithId[i].rating
            }
            rating = rating / n
          }
          if ((!this.props.state.category || this.props.state.category == 'any' || this.props.state.category == deal.category) &&
            (!this.props.state.city || this.props.state.city == 'any' || this.props.state.city == deal.city)  &&
            (!this.props.state.rating || this.props.state.rating <= rating) &&
            (!this.props.state.company || this.props.state.company.length == 0 || deal.company.toLowerCase().includes(this.props.state.company.toLowerCase()))) {
            return (
              <Card deal={deal}
                auth={this.props.auth}
                favorites={this.props.favorites}
                isFavoritesLoading={this.props.isFavoritesLoading}
                favoriteserrMess={this.props.favoriteserrMess}
                deleteFavorite={this.props.deleteFavorite}
                postFavorite={this.props.postFavorite}
                fromFavorites={false}
                rating={rating}
              />
            );
          }
        }

      }
      );

      return (
        <div className="container py-4">
          <SearchBar setFilter={this.props.setFilter} />
          <div class="row">
            {menu}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-4">
          <SearchBar setFilter={this.props.setFilter} />
          <div class="row">
          </div>
        </div>
      );
    }

  }
}

export default Shop;