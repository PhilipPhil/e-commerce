import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Login from './Login'
import Register from './Register'

import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isLoginOpen: false,
            isRegisterOpen: false
        };
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
    }

    toggleLogin() {
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        });
    }

    toggleRegister() {
        this.setState({
            isRegisterOpen: !this.state.isRegisterOpen
        });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        // alert(this.props.auth.isAuthenticated)
        return (
            <React.Fragment>

                <Navbar dark expand className="top-nav">
                    <div className="container">
                        <Nav navbar className="ml-auto">
                            {!this.props.auth.isAuthenticated
                                ? <Button className="nav-link" outline onClick={this.toggleLogin} style={{ "border": "none", "outline": "none" }}><i class="fa fa-sign-in" /> LOGIN</Button>
                                : <span></span>
                            }
                            <Button className="nav-link" outline onClick={this.toggleRegister} style={{ "border": "none", "outline": "none" }}>REGISTER</Button>
                        </Nav>
                    </div>
                </Navbar>

                <Navbar dark expand="md" className="bottom-nav">
                    <div className="container">
                        <NavbarBrand href="/"><img src='/assets/images/logo.png' height="60" width="60" alt='Deal Alchemist' /></NavbarBrand>
                        <NavbarToggler className="ml-auto" onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" exact to='/'>DEALS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/about'>ABOUT</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contact'>CONTACT</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isLoginOpen} toggle={this.toggleLogin}>
                    <ModalBody>
                        <Login auth={this.props.auth}
                            loginUser={this.props.loginUser} />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegisterOpen} toggle={this.toggleRegister}>
                    <ModalBody>
                        <Register />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header