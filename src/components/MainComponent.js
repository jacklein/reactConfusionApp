import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

// container component, provides data and handles UI
class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      //selectedDish: null
    };
  }

  /*
  onDishSelect(dishId) {
    this.setState({selectedDish : dishId});
  }
  */

  render() {
    return (
      <div>
        <Header />
        <div className="container">
            <Menu dishes={this.state.dishes}
                onClick={(dishId) => this.onDishSelect(dishId)}/>
            <DishDetail 
                selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
