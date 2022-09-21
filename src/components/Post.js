import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddForm from './Add-post-form';
import AddComment from './Add-comment-form';
import { Navigate } from "react-router-dom";
import cookies from 'react-cookies';
export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showPosts: false,
      loggedout:false
      
    };
  }
  async componentDidMount() {
    const token =  cookies.load('token');
    console.log(token);
    if(token){
      const url = `${process.env.REACT_APP_EXPRESS_URL}/post`;
      let postsWithComments = await axios.get(url,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log(postsWithComments.data);
      
      this.setState({
        posts: postsWithComments.data,
        showPosts: true
      });

    }
  }
   handleAddPost = async(e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_EXPRESS_URL}/post`;
    let obj = {
      title:e.target.formBasicTitle.value,
      description:e.target.formBasicDescription.value
    }
    console.log(obj);
    await axios.post(url,obj);
    this.componentDidMount();

  }

  handleAddComment = async(e) => {
    e.preventDefault();
    const userID = cookies.load('userID');
    const obj = {
      description:e.target.formBasicDescription.value,
      postID:e.target.formBasicPostID.value,
      userID:userID
    }
    console.log(obj);
    const url = `${process.env.REACT_APP_EXPRESS_URL}/comment/${obj.postID}/${userID}`;
    const data =await axios.post(url,obj);
    console.log(data.data)
    this.componentDidMount(); 

  }

  handleLogout = () => {
    cookies.remove('userID');
    cookies.remove('userName');
    cookies.remove('email');
    cookies.remove('token');
    this.setState({
      loggedout:true
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleLogout} id='logout'> Logout</button>
      <section className='forms-container'>
      <AddForm handleAddPost={(e)=>this.handleAddPost(e)} />
      
      
      <AddComment handleAddComment={(e) => this.handleAddComment(e)} />
      </section>
      <div className="table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {this.state.showPosts &&
            this.state.posts.map((item,idx) => {
              return (
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  {item.comments.map((item, idx) => {
                    return (
                        <div key={idx}>
                          <Table>
                      <thead>
                        <tr>
                          <th>name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr >
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                      </tr>
                      </tbody>
                      </Table>
                      </div>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
      {
        this.state.loggedout && 
        <Navigate to='/' />
      }
      </div>
      </div>
    );
  }
}
