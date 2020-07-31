import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap'
import { Media } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Sleepy Sheep</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Sleepy Sheep</h1>
                            </div>
                            <div className="col-12 col-sm-6">
                                <p>Sleep is very important. We sell prodcuts that get you the best night sleep. So you can be as productive as possible.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header