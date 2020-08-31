import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import Review from './Review'
import Loading from './Loading'
import Comments from './Comments'
import { baseUrl } from '../shared/baseUrl'
import Error from './Error';
class Deal extends Component {

  constructor(props) {
    super(props);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderReview = this.renderReview.bind(this);
  }

  renderCategory(category) {
    if (category) {
      return (
        <React.Fragment>
          <span style={{ "background-color": "rgba(0, 123, 255, 0.1)", "border-radius": "6px" }}>
            &nbsp;{category}&nbsp;
          </span>
        &nbsp;
        </React.Fragment>

      )
    }
  }

  renderReview(review) {
    return (
      <div class="mb-4 col-12 col-md-8 offset-md-2 text-center">
        <div class="row mb-2">
          <div class="col-21 col-sm-6 text-left">
            <h4 style={{ marginBottom: 0 }}>{review.user}</h4>
            <small style={{ marginBottom: 0 }} class="text-muted">{review.date}</small>
          </div>
          <div class="col-12 col-sm-6 text-left text-sm-right">
            <StarRatings rating={parseInt(review.rating, 10)} starSpacing="2px" starRatedColor="gold" starDimension="1.5rem" />
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-left">
            <p>{review.comment}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {

    if (this.props.isDealsLoading) {
      return (<div className="container py-4">
        <div class="row">
          <Loading />
        </div>
      </div>)

    } else if (this.props.dealsErrMess) {
      return (<Error errMess={this.props.dealsErrMess} />)
    } else {
      return (
        <React.Fragment>

          <div className="container py-2">

            <div class="row">
              <div class="col" id="breadcrumb-col" >
                <Breadcrumb>
                  <BreadcrumbItem><Link exact to="/">Deals</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.deal.company}</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>

            <div class="row featurette mb-4">
              <div class="col-md-6 text-center mb-2">
                <img class="featurette-image img-fluid mx-auto" src={baseUrl + this.props.deal.mainimage} alt={this.props.deal.company} style={{ "max-height": "100vh" }} />
              </div>
              <div class="col-md-6 align-self-center text-center">
                <img class="featurette-image img-fluid mx-auto mb-2" src={baseUrl + this.props.deal.logoimage} alt="Company Logo" style={{ "max-height": "129px", "max-width": "241px" }} />
                <h3>{this.props.deal.company}</h3>
                <p>{this.props.deal.description}</p>
                <a href="#review-section" style={{ "text-decoration": "none", color: "#212529" }}>
                  <div class="row text-center justify-content-center mb-2">

                    <StarRatings rating={this.props.deal.rating} starSpacing="2px" starRatedColor="gold" />
                    <h1>&nbsp;{this.props.deal.rating.toFixed(1)}</h1>
                  </div>
                </a>
                <Button className="btn btn-outline-danger btn-sm" type="submit" color="outline-danger" outline ><i class="fa fa-heart" /></Button> &nbsp;
              <a className="btn btn-outline-secondary btn-sm" href={this.props.deal.website}>Visit {this.props.deal.company} Website <i className="fa fa-external-link" /></a>


              </div>
            </div>

            <hr class="featurette-divider" />

            <div class="row">
              <div class="col">
                <p class="small"><b>THE FINE PRINT:</b> {this.props.deal.fineprint}</p>
                <p class="small"><b>CITY:</b> {this.renderCategory(this.props.deal.city)}<b>CATEGORY:</b> {this.renderCategory(this.props.deal.categoriesOne)} {this.renderCategory(this.props.deal.categoriesTwo)} {this.renderCategory(this.props.deal.categoriesThree)}</p>
              </div>
            </div>

            <hr class="featurette-divider" />

            <div class="row">
              <div class="col text-center">
                <p>Google Maps</p>
                <p class="small"><b>ADDRESS:</b> {this.props.deal.address} </p>
              </div>
            </div>


            <hr class="featurette-divider" />

            <div class="row" id="review-section">
              {!this.props.auth.isAuthenticated
                ?
                <div class="col text-center">
                  <h4>Reviews</h4>
                  <p>Log in to leave a review.</p>
                </div>
                :
                <div class="col text-center">
                  <Review dealId={this.props.deal._id} postReview={this.props.postReview} />
                </div>
              }

            </div>

            <Comments reviews={this.props.reviews} isReviewsLoading={this.props.isReviewsLoading} reviewsErrMess={this.props.reviewsErrMess} />

          </div>
        </React.Fragment>

      )
    }



  }

}


export default Deal;