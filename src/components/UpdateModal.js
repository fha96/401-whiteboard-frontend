import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
export default class UpdateModal extends Component {
  render() {
    return (
<>
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.props.handleEdit}>
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
        </Modal.Body>
      </Modal>
</>
    )
  }
}
