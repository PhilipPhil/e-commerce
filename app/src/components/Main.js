import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Shop';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Item from './Item';
import Contact from './Contact';
import Cart from './Cart';

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

          const ContactPage = () => {
            return(
                <Contact />
            );
          }

          const ItemWithId = ({match}) => {
            return(
                <Item item={this.state.items.filter((item) => item.id === parseInt(match.params.itemid,10))[0]} />
            );
          };

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path = "/shop" component={() => <Menu items={this.state.items} />} />
                    <Route path='/shop/:itemid' component={ItemWithId} />
                    <Route path='/Contact' component={ContactPage} />
                    <Route path='/Cart' component={Cart} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </div>
        );
    }

}

export default Main;