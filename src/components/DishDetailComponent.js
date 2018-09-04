import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

    // formatting for dish image and description
    function RenderDishInfo({dish}){
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    // formatting for dish comments
    function RenderComments({comments}){
        return(
            <div className="col-12 col-md-5 m-1">
                <h1>Comments</h1>
                
                <ul className="list-unstyled">
                {comments.map((comment) => {
                    return(
                        <li key={comment.id}>
                            {comment.comment} <br/>
                             --{comment.author}, {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </li>
                    )
                })}
                </ul>
            </div>
        );
    }

    const DishDetail = (props) => {
        console.log("DishDetail Component render invoked")
        
        // return nothing if no dish selected
        if(!props.selectedDish){
            return <div></div>
        }

        return(
            <div className="row">
                <RenderDishInfo dish = {props.selectedDish} />
                <RenderComments comments = {props.selectedDish.comments} />
            </div>
        );
    }



export default DishDetail;