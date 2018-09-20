import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            title: props.title
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        //alert("Current state is: " + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return(
            <div> 
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-pencil fa-lg">{this.state.title}</span>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xl={12}>Rating</Label>
                                <Col xl={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" xl={12}>Your Name</Label>
                                <Col xl={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Jack Klein"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(20)
                                        }}
                                        />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 20 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" xl={12}>Comment</Label>
                                <Col xl={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm> 
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CommentForm;