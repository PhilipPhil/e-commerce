import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Error404 from './Error404';

import Shop from './Shop';
import Deal from './Deal';

import { ITEMS } from '../shared/items';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ITEMS
          };

    }


    render() {

          const ContactPage = () => {
            return(
                <Contact />
            );
          }

          const DealWithId = ({match}) => {
            return(
                <Deal item={this.state.items.filter((item) => item.id === parseInt(match.params.dealid,10))[0]} />
            );
          };

        return (
            <div>
                <div className="main-container">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path='/Contact' component={ContactPage} />
                    <Route path='/about' component={About} />
                    <Route path='/error404' component={Error404} />

                    <Route exact path = "/deals" component={() => <Shop items={this.state.items} />} />
                    <Route path='/deals/:dealid' component={DealWithId} />

                    <Redirect to="/error404" />
                </Switch>
                </div>   
                <Footer />
            </div>
        );
    }

}

export default Main;