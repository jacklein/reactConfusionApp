import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent'

class Menu extends Component {

    constructor(props) {
        // Menu is inheriting from React.Component by calling super
        // you are calling the parent element with props parameter
        super(props);

        this.state = { //instance of object
            selectedDish: null,
        }

        console.log('Menu Component constructor invoked')
    }

    onDishSelect(dish) {
        this.setState({selectedDish : dish});
    }

    // only render dish detail if selectedDish != null
    renderDishDetail(){
        if(this.state.selectedDish){
            return (
                <DishDetail selectedDish={this.state.selectedDish} />
            );
        }
    }

    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card tag="li" onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />                      
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );       
        });

        console.log('Menu Component render invoked')

        return ( 
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDishDetail()}
            </div>
        );
           
    }
}

export default Menu;