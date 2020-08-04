import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Shop';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Item from './Item';
import Contact from './Contact';
import About from './About';
import Error404 from './Error404';

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
                <div className="main-container">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path = "/shop" component={() => <Menu items={this.state.items} />} />
                    <Route path='/shop/:itemid' component={ItemWithId} />
                    <Route path='/Contact' component={ContactPage} />
                    <Route path='/about' component={About} />
                    <Route path='/error404' component={Error404} />
                    <Redirect to="/error404" />
                </Switch>
                </div>   
                <Footer />
            </div>
        );
    }

}

export default Main;