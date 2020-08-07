import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './include/Header'
import Footer from './include/Footer'
import Home from './Home';
import Contact from './Contact';
import Error404 from './Error404';
import Shop from './Shop';
import Deal from './Deal';

import { ITEMS } from '../shared/items';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deals: ITEMS
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
                <Deal item={this.state.deals.filter((item) => item.id === parseInt(match.params.dealid,10))[0]} />
            );
          };

        return (
            <div>
                <div className="main-container">
                <Header />
                <Switch>
                    
                    <Route exact path="/" component={() => <Shop deals={this.state.deals} />} />
                    
                    <Route exact path='/deal'>
                        <Redirect exact path="/" />
                    </Route>
                    <Route path='/deals'>
                        <Redirect exact path="/" />
                    </Route>

                    <Route path='/deal/:dealid' component={DealWithId} />
                    <Route path='/about' component={Home} />
                    <Route path='/Contact' component={ContactPage} />
                    <Route path='/error404' component={Error404} />
                    <Redirect to='/error404' />
                </Switch>
                </div>   
                <Footer />
            </div>
        );
    }

}

export default Main;