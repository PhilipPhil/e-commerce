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
        this.toggleLoginOff = this.toggleLoginOff.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
    }


    toggleLoginOff() {
        this.setState({
            isLoginOpen: false
        });
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
        return (
            <React.Fragment>

                <Navbar dark expand className="top-nav">
                    <div className="container">
                        {!this.props.auth.isAuthenticated
                            ?
                            <Nav navbar className="ml-auto">
                                <Button className="nav-link" outline onClick={this.toggleLogin} style={{ "border": "none", "outline": "none" }}><i class="fa fa-sign-in" /> LOGIN</Button>
                                <Button className="nav-link" outline onClick={this.toggleRegister} style={{ "border": "none", "outline": "none" }}>REGISTER</Button>
                            </Nav>
                            :
                            <Nav navbar className="ml-auto">
                                <NavLink className="nav-link" exact to='/favorites' style={{ "border": "none", "outline": "none" }}><i class="fa fa-heart" /> FAVORITES</NavLink>
                                <Button className="nav-link" outline onClick={() => {
                                    this.toggleLoginOff();
                                    this.props.logoutUser();
                                }} style={{ "border": "none", "outline": "none" }}><i class="fa fa-sign-out" /> LOGOUT</Button>
                            </Nav>
                        }
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

                <Modal isOpen={this.state.isLoginOpen && !this.props.auth.isAuthenticated} toggle={this.toggleLogin}>
                    <ModalBody>
                        <Login loginUser={this.props.loginUser} />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegisterOpen} toggle={this.toggleRegister}>
                    <ModalBody>
                        <Register registerUser={this.props.registerUser} toggleRegister={this.toggleRegister} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header