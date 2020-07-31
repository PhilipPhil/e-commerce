import React , { Component } from 'react';

import { Navbar, NavbarBrand } from 'reactstrap'

import Menu from './Item';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Sleepy Sheep</NavbarBrand>
                    </div>
                </Navbar>
                <Menu />
            </div>
        );
    }

}

export default Main;