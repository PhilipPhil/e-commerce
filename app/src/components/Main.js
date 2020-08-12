import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Contact from './Contact';
import Error404 from './Error404';
import Shop from './Shop';
import Deal from './Deal';

import { addReview } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        deals: state.deals,
        reviews: state.reviews,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    addReview: (dealId, rating, comment, user) => dispatch(addReview(dealId, rating, comment, user))
  });

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const DealsPage = () => {
            return (
                <Shop deals={this.props.deals} />
            );
        }

        const DealWithId = ({ match }) => {
            return (
                <Deal deal={this.props.deals.filter((deal) => deal.id === parseInt(match.params.dealId, 10))[0]}
                    reviews={this.props.reviews.filter((review) => review.dealId === parseInt(match.params.dealId, 10))}
                    addReview={this.props.addReview} />
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
                        <Route path='/Contact' component={Contact} />
                        <Route path='/error404' component={Error404} />
                        <Redirect to='/error404' />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));