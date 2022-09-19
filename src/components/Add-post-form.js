import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export default class AddForm extends React.Component {


    render(){

        return(
            <div className="add-form-container">
                <h2>Add Post</h2>
            <Form onSubmit={this.props.handleAddPost} className="post">
      <Form.Group className="mb-4" controlId="formBasicTitle">
        <Form.Label>Title of the post</Form.Label>
        <Form.Control type="text" placeholder="Enter the title" />
  
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter the description" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> 
    </div>
        )
    }
}