import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import SearchBar from './SearchBar'
import Loading from "./Loading"
import { baseUrl } from '../shared/baseUrl'
import Error from './Error';

const CardComponent = (props) => {
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
                <Link className="btn btn-sm btn-outline-secondary" color="outline-secondary" outline to={`/deal/${props.deal.id}`} >View</Link>
                <Button className="btn btn-sm btn-outline-danger" type="submit" color="outline-danger" outline ><i class="fa fa-heart" /></Button>
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
          <CardComponent deal={deal} />
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