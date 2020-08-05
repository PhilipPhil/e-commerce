import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>

                <Navbar dark expand className="top-nav">
                    <div className="container">
                        <Nav navbar className="ml-auto">
                            <NavLink className="nav-link" exact to='/login'><i class="fa fa-sign-in" /> LOGIN</NavLink>
                            <NavLink className="nav-link" exact to='/register'>REGISTER</NavLink>
                        </Nav>
                    </div>
                </Navbar>

                <Navbar dark expand="md" className="bottom-nav">
                    <div className="container">
                        <NavbarBrand href="/"><img src='/assets/images/logo.png' height="60" width="60" alt='Sleepy Sheep' /></NavbarBrand>
                        <NavbarToggler className="ml-auto" onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" exact to='/'>HOME</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/deals'>DEALS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contact'>CONTACT</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/about'>ABOUT</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                
            </React.Fragment>
        )
    }
}

export default Header