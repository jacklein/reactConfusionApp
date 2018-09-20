import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
   return {
     dishes: state.dishes,
     comments: state.comments,
     promotions: state.promotions,
     leaders: state.leaders
   } 
}

// ** slightly confusing notation with dispatch param **
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())}
});

// container component, provides data and handles UI
class Main extends Component {

  constructor(props) {
    super(props);

  }

  // good time to fetch data for application
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  /*
  onDishSelect(dishId) {
    this.setState({selectedDish : dishId});
  }
  */

  render() {

    const HomePage = () => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}

                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}

                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    
    // also has parameters location and history
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}

            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentserrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            />
        );  
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// makes these available in Main component as props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
