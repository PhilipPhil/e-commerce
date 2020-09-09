import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Loading from "./Loading"
import Card from "./Card"

const Tittle = (props) => {
    return (
        <React.Fragment>
            <Row className="form-group justify-content-center" style={{ paddingLeft: "15px", paddingRight:"15px" }}>
                <h1 className="col-12 text-center">Favorites <img style={{ "vertical-align": "sub" }} src='/assets/images/logo.png' height="60" width="60" alt='Deal Alchemist' /></h1>
                <h4 className="text-muted" style={{ marginBottom: 0, paddingBottom: 0 }}>{props.username}</h4>
            </Row>
            <hr class="featurette-divider" />
        </React.Fragment>
    )
}



class Favorites extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container py-4">
                    <Tittle username={"Loading..."} />
                    <div class="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.errMess) {
            return (<Redirect exact to='/' />);
        }


        else if (this.props.favorites != null) {
            const menu = this.props.favorites.deals.reverse().map((deal) => {
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
                    return (
                        <Card deal={deal}
                            auth={this.props.auth}
                            favorites={this.props.favorites}
                            isFavoritesLoading={this.props.isFavoritesLoading}
                            favoriteserrMess={this.props.favoriteserrMess}
                            deleteFavorite={this.props.deleteFavorite}
                            postFavorite={this.props.postFavorite}
                            fromFavorites={true}
                            rating={rating}
                        />
                    );
                }


            });
            return (
                <div className="container py-4">
                    <Tittle username={this.props.favorites.user.name} />
                    <div class="row">
                        {menu}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container py-4">
                    <Tittle username={""} />
                    <div class="row">
                    </div>
                </div>
            );
        }

    }
}

export default Favorites;