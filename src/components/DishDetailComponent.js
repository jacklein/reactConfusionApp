import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props){
        super(props);

        console.log("Dish Detail constructor invoked")
    }

    render() {
        console.log("Dish Detail render invoked")
        
        const dish = this.props.selectedDish;

        // formatting for dish image and description
        const dishInfo = 
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>

        // formatting for dish comments
        const comments = 
            <div className="col-12 col-md-5 m-1">
                <h1>Comments</h1>
                
                <ul className="list-unstyled">
                {dish.comments.map((comment) => {
                    return(
                        <li key={comment.id}>
                            {comment.comment} <br/>
                             --{comment.author}
                        </li>
                    )
                })}
                </ul>
            </div>

        return(
            <div className="row">
                {dishInfo}
                {comments}
            </div>
        );
    }

}

export default DishDetail;