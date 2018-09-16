import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
         Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';


    // component for dish image and description
    function RenderDish({dish}){
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                       <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    // component for dish comments
    function RenderComments({comments, addComment, dishId}){
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

                <CommentForm title="Submit Comment" addComment={addComment} dishId={dishId}/>
            </div>
        );
    }



    const DishDetail = (props) => {
        
        if(props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments = {props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id} />
                    </div>
                </div>
            );
        else
            return <div></div>   
}



export default DishDetail;