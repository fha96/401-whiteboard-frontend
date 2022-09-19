import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default class AddComment extends React.Component {


  render() {
    return (
      <div className="add-form-container">
        <h2>Add Comment</h2>
        <Form onSubmit={this.props.handleAddComment} className="comment">
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter the description" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your name</Form.Label>
            <Form.Control type="text" placeholder="optional" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPostID">
            <Form.Label>Please Enter the number of post</Form.Label>
            <Form.Control type="text" placeholder="required" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
