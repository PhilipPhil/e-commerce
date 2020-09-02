import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import Loading from "./Loading"
import Error from './Error';
import Card from "./Card"
import { Redirect } from 'react-router-dom';

const Tittle = (props) => {
    return (
        <Row className="form-group justify-content-center mb-4" style={{ "backgroundColor": "rgb(0, 123, 255,0.06)", "border": "1px solid rgba(0,0,0,.125)", "padding": "15px", "border-radius": ".05rem" }}>
            <Col className="col-12 text-center">
                <h1>Favorites <img style={{ "vertical-align": "sub" }} src='/assets/images/logo.png' height="60" width="60" alt='Deal Alchemist' /></h1>
                <h2 className="text-muted">{props.username}</h2>
            </Col>
        </Row>

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
            const menu = this.props.favorites.deals.map((deal) => {
                return (
                    <Card deal={deal}
                        auth={this.props.auth}
                        favorites={this.props.favorites}
                        isFavoritesLoading={this.props.isFavoritesLoading}
                        favoriteserrMess={this.props.favoriteserrMess}
                        deleteFavorite={this.props.deleteFavorite}
                        postFavorite={this.props.postFavorite}
                        fromFavorites={true}
                    />
                );
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