import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

const CardComponent = (props) => {
  return (
    <div class="col-md-6 col-lg-4">
      <div class="card mb-4">
        <img class="card-img-top" src={props.deal.logoimage} alt={props.deal.company}/>
        <div class="card-body">
          <h5 class="text-center">{props.deal.company}</h5>
          <p class="card-text">{props.deal.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="align-self-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </div>
            <div className="align-self-center">
              <StarRatings rating={props.deal.rating} starDimension="20px" starSpacing="2px" />
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
    const menu = this.props.deals.map((deal) => {
      return (
        <CardComponent deal={deal} />
      );
    });

    return (
      <div className="container py-5">
        <div class="row">
          {menu}
        </div>
      </div>
    );
  }
}

export default Shop;