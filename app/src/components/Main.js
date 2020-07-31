import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Item';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';

import { ITEMS } from '../shared/items';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ITEMS
          };

    }

    render() {
        const HomePage = () => {
            return(
                <Home />
            );
          }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path = "/items" component={() => <Menu items={this.state.items} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }

}

export default Main;