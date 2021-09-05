import React, { Component } from 'react'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem, NavLink, Button
} from "reactstrap"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as cartActions from "../../redux/actions/cartActions"
import { BiCart } from 'react-icons/bi'
import { Link } from "react-router-dom"
import alertify from 'alertifyjs'

class CartSummary extends Component {

    renderEmpty() {
        return (
            <NavItem>
                <NavLink>Empty cart <BiCart size="1.50em" /></NavLink>
            </NavItem>
        )
    }

    removeFromCart(product){
        this.props.actions.removeFromCart(product)
        alertify.error(product.productName + " removed from cart")
    }

    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Your cart <BiCart size="1.50em" />
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.id}>
                                <Button color="danger"
                                    onClick={() => this.removeFromCart(cartItem.product)}>
                                    x
                                </Button>
                                {cartItem.product.productName} - {cartItem.quantity}
                            </DropdownItem>
                        ))
                    }

                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to={"/cart"}>
                            Go to cart
                        </Link>

                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
    render() {
        return (
            <div>
                {
                    this.props.cart.length > 0 ? this.renderSummary()
                        : this.renderEmpty()
                }

            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)