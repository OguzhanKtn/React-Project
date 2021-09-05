import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    


} from 'reactstrap';
import CartSummary from '../cart/CartSummary';


 export default class Navi extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

   


    render() {
        return (
            <div>

                <Navbar color="info" light expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink><Link to="/saveproduct">Add product</Link></NavLink>
                            </NavItem>

                            <CartSummary />
                        </Nav>

                    </Collapse>
                </Navbar>


            </div >
        );
    }
}
