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
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container py-4">
          <SearchBar />
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
        return (
          <Card deal={deal} deleteFavorite={this.props.deleteFavorite} postFavorite={this.props.postFavorite}/>
        );
      });

      return (
        <div className="container py-4">
          <SearchBar />
          <div class="row">
            {menu}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-4">
          <SearchBar />
          <div class="row">
          </div>
        </div>
      );
    }

  }
}

export default Shop;