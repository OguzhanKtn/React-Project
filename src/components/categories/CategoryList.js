import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, Button } from 'reactstrap'
import { bindActionCreators } from "redux"
import * as categoryActions from "../../redux/actions/categoryActions"
import * as productAction from "../../redux/actions/productAction"

class CategoryList extends Component {

    componentDidMount() {
        this.props.actions.getCategories()
    }

    selectCategory = (category) => {
        this.props.actions.changeCategory(category)
        this.props.actions.getProducts(category.id)
    }
    render() {
        return (
            <div>
                <h3>Categories </h3>
                <ListGroup>

                    {this.props.categories.map(category => (
                        <Button onClick={() => this.selectCategory(category)}
                            color="dark"
                            key={category.id}>
                            {category.categoryName}
                        </Button>
                    ))}

                </ListGroup>
               
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
            changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
            getProducts: bindActionCreators(productAction.getProducts, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)