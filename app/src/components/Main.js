import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Contact from './Contact';
import Error from './Error';
import Shop from './Shop';
import Deal from './Deal';
import { actions } from 'react-redux-form';
import { postReview, fetchDeals, fetchReviews } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        deals: state.deals,
        reviews: state.reviews,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    postReview: (dealId, rating, comment, user) => dispatch(postReview(dealId, rating, comment, user)),
    fetchReviews: () => {dispatch(fetchReviews())},
    fetchDeals: () => {dispatch(fetchDeals())},
    resetEmailForm: () => { dispatch(actions.reset('emailform'))}  });

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDeals();
        this.props.fetchReviews();
    }

    render() {

        const DealsPage = () => {
            return (
                <Shop deals={this.props.deals.deals} 
                    isLoading={this.props.deals.isLoading}
                    errMess={this.props.deals.errMess}
                />
            );
        }

        const DealWithId = ({ match }) => {
            // alert(JSON.stringify(this.props.deals.deals[0]))
            return (
                <Deal 
                    deal={this.props.deals.deals[0]}
                    isDealsLoading={this.props.deals.isLoading}
                    dealsErrMess={this.props.deals.errMess}
                    // reviews={this.props.reviews.reviews.filter((review) => review.dealId === match.params.dealId)}
                    // isReviewsLoading={this.props.reviews.isLoading}
                    // reviewsErrMess={this.props.reviews.errMess}
                    // postReview={this.props.postReview}
                    />
            );
        };

        return (
            <div>
                <div className="main-container">
                    <Header />
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
                        <Route path='/Contact' component={() => <Contact resetEmailForm={this.props.resetEmailForm} />} />
                        <Route path='/error' component={() => <Error errMess="Error 404: Not Found" />} />
                        <Redirect to='/error' />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));