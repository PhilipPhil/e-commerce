import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

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
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
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
                        <Nav navbar className="ml-auto">
                            <Button className="nav-link" outline onClick={this.toggleModal} style={{ "border": "none", "outline": "none" }}><i class="fa fa-sign-in" /> LOGIN</Button>
                            <Button className="nav-link" outline onClick={this.toggleModal} style={{ "border": "none", "outline": "none" }}>REGISTER</Button>
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

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><i class="fa fa-sign-in" /> LOGIN</ModalHeader>
                    <ModalBody>


                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={12}>Name</Label>
                                <Col md={12}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name" />

                                </Col>
                            </FormGroup>
                        </Form>
                        
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header