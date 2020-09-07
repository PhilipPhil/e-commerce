import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import Home from './Home';
import Contact from './Contact';
import Error from './Error';
import Shop from './Shop';
import Deal from './Deal';
import Favorites from './Favorites'
import ScrollToTop from './ScrollToTop';
import { actions } from 'react-redux-form';
import {
    postReview, fetchDeals, fetchReviews, loginUser, logoutUser,
    registerUser, fetchFavorites, postFavorite, deleteFavorite,
    postEmailForm, deleteReview, editReview
} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        deals: state.deals,
        reviews: state.reviews,
        comments: state.comments,
        favorites: state.favorites,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    postReview: (dealId, rating, comment) => dispatch(postReview(dealId, rating, comment)),
    deleteReview: (reviewId) => dispatch(deleteReview(reviewId)),
    editReview: (dealId, rating, comment, reviewId) => dispatch(editReview(dealId, rating, comment, reviewId)),
    fetchReviews: () => { dispatch(fetchReviews()) },
    fetchDeals: () => { dispatch(fetchDeals()) },
    resetEmailForm: () => { dispatch(actions.reset('emailform')) },
    loginUser: (creds) => dispatch(loginUser(creds)),
    registerUser: (user) => dispatch(registerUser(user)),
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dealId) => dispatch(postFavorite(dealId)),
    deleteFavorite: (dealId) => dispatch(deleteFavorite(dealId)),
    postEmailForm: (emailform) => dispatch(postEmailForm(emailform)),
    logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDeals();
        this.props.fetchReviews();
        this.props.fetchFavorites();
    }

    render() {

        const DealsPage = () => {
            return (
                <Shop deals={this.props.deals.deals}
                    isLoading={this.props.deals.isLoading}
                    errMess={this.props.deals.errMess}
                    auth={this.props.auth}
                    favorites={this.props.favorites.favorites}
                    isFavoritesLoading={this.props.favorites.isLoading}
                    favoriteserrMess={this.props.favorites.errMess}
                    deleteFavorite={this.props.deleteFavorite}
                    postFavorite={this.props.postFavorite}
                    reviews={this.props.reviews.reviews}
                    isReviewsLoading={this.props.reviews.isLoading}
                    reviewsErrMess={this.props.reviews.errMess}
                />
            );
        }

        const FavoritesPage = () => {
            return (
                <Favorites
                    auth={this.props.auth}
                    favorites={this.props.favorites.favorites}
                    isLoading={this.props.favorites.isLoading}
                    errMess={this.props.favorites.errMess}
                    deleteFavorite={this.props.deleteFavorite}
                    postFavorite={this.props.postFavorite}
                    reviews={this.props.reviews.reviews}
                    isReviewsLoading={this.props.reviews.isLoading}
                    reviewsErrMess={this.props.reviews.errMess}
                />
            );
        }

        const DealWithId = ({ match }) => {
            return (
                <Deal
                    deal={this.props.deals.deals.filter((deal) => deal._id == match.params.dealId)[0]}
                    isDealsLoading={this.props.deals.isLoading}
                    dealsErrMess={this.props.deals.errMess}
                    reviews={this.props.reviews.reviews.filter((review) => review.deal === match.params.dealId)}
                    isReviewsLoading={this.props.reviews.isLoading}
                    reviewsErrMess={this.props.reviews.errMess}
                    postReview={this.props.postReview}
                    deleteReview={this.props.deleteReview}
                    editReview={this.props.editReview}
                    auth={this.props.auth}
                    favorites={this.props.favorites.favorites}
                    isFavoritesLoading={this.props.favorites.isLoading}
                    favoriteserrMess={this.props.favorites.errMess}
                    deleteFavorite={this.props.deleteFavorite}
                    postFavorite={this.props.postFavorite}
                />
            );
        };

        return (
            <div>
                <div className="main-container">
                    <Header auth={this.props.auth}
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser}
                        registerUser={this.props.registerUser} />
                    <ScrollToTop>
                        <Switch>

                            <Route exact path="/" component={DealsPage} />

                            <Route exact path='/deal'>
                                <Redirect exact path="/" />
                            </Route>
                            <Route path='/deals'>
                                <Redirect exact path="/" />
                            </Route>

                            <Route path='/deal/:dealId' component={DealWithId} />
                            <Route path='/about' component={Home} />
                            <Route path='/contact' component={() => <Contact resetEmailForm={this.props.resetEmailForm} postEmailForm={this.props.postEmailForm} />} />
                            <Route path='/favorites' component={FavoritesPage} />
                            <Route path='/error' component={() => <Error errMess="Error 404: Not Found" />} />
                            <Redirect to='/error' />
                        </Switch>
                    </ScrollToTop>
                </div>
                <Footer />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));