import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import base64 from 'base-64';
import axios from "axios";
import { Navigate } from "react-router-dom";
import cookies from 'react-cookies';
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedin:false,
            errorMsg:''
        }
    }


    handleSignin = (e) => {
        e.preventDefault();
        let data = {
            email:e.target.formBasicEmail.value,
            password:e.target.formBasicPassword.value
        }
        const encodedData = base64.encode(`${data.email}:${data.password}`);
        axios.post(`${process.env.REACT_APP_EXPRESS_URL}/signin`, {}, {
            headers: {
                Authorization:`Basic ${encodedData}`
            }
        }).then(resolve =>{
          console.log(resolve.data);
          cookies.save('token',resolve.data.token);
          cookies.save('userID', resolve.data.id);
          cookies.save('email', resolve.data.email);
          cookies.save('userName', resolve.data.userName);
            this.setState({
                loggedin:true
            })
        }).catch(rejected =>{ 
            console.log(rejected.response.data);
            this.setState({errorMsg:rejected.response.data})
        });
    }



  render() {
    return (
      
        <div className="sign">

        <Form onSubmit={this.handleSignin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="Password" />
      </Form.Group>  
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
      
    {
        this.state.loggedin && 
        <>
    
        <Navigate to='/post'/>
        </>
    }
   
    {
        !this.state.loggedin &&
        <p>{this.state.errorMsg}</p>
    }
      </div>
    );
  }
}
