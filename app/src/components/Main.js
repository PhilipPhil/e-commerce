import React , { Component } from 'react';
import Menu from './Item';
import Header from './include/Header'
import Footer from './include/Footer'

import { ITEMS } from '../shared/items';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ITEMS
          };

    }

    render() {
        return (
            <div>
                <Header />
                <Menu items={this.state.items}/>
                <Footer />
            </div>
        );
    }

}

export default Main;