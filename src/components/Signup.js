import axios from 'axios';
import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state={
            signedup:false,
            errorMsg:''
        }
    }
    handleSignup = (e) => {
        e.preventDefault();

        let userData = {
            userName:e.target.formBasicusername.value,
            email:e.target.formBasicEmail.value,
            password:e.target.formBasicPassword.value,
            role:e.target.fromBasicSelect.value
        }
        console.log(userData);
        axios.post(`${process.env.REACT_APP_EXPRESS_URL}/signup`,userData).then(res => this.setState({
            signedup:true
        })).catch(reject => this.setState({
            errorMsg:reject.response.data
        }));
    }
   
    


  render() {
    return (
      <div className='sign'>
         <Form onSubmit={this.handleSignup} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicusername">
        <Form.Label>User name</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId='fromBasicSelect'>    
          <Form.Label>Select your role : </Form.Label>
        <Form.Select>
      <option value="user">User</option>
      <option value="admin">Admin</option>
        </Form.Select>
      </Form.Group>
 
      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </Form>
    {
        this.state.signedup &&
        <p>Account has been created succesfully.<br/> Please Signin</p>
    }
    {
        !this.state.signedup &&
        <p>{this.state.errorMsg}</p>
    }
      </div>
    )
  }
}
