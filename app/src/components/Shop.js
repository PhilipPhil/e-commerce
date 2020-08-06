import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

const CardComponent = (props) => {
  return (
    <div class="col-md-4">
      <div class="card mb-4">
        <img class="card-img-top" src={props.item.mainimage} alt={props.item.company} />
        <div class="card-body">
          <h5 class="text-center">{props.item.company}</h5>
          <p class="card-text">{props.item.shortdescription}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="align-self-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </div>
            <div className="align-self-center">
              <StarRatings rating={props.item.rating} starDimension="20px" starSpacing="2px" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

class Shop extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const menu = this.props.items.map((item) => {
      return (
        <CardComponent item={item} />
      );
    });

    return (
      <div className="container">
        <div class="row py-5">
          {menu}
        </div>
      </div>
    );
  }
}

export default Shop;