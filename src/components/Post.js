import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddForm from './Add-post-form';
import AddComment from './Add-comment-form';


export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showPosts: false,
    };
  }
  async componentDidMount() {
    const url = `${process.env.REACT_APP_EXPRESS_URL}/post`;
    let postsWithComments = await axios.get(url);
    
    this.setState({
      posts: postsWithComments.data,
      showPosts: true,
    });
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
    const obj = {
      description:e.target.formBasicDescription.value,
      name:e.target.formBasicName.value,
      postID:e.target.formBasicPostID.value
    }
    console.log(obj);
    const url = `${process.env.REACT_APP_EXPRESS_URL}/comment/${obj.postID}`;
    await axios.post(url,obj);
    this.componentDidMount(); 

  }
  render() {
    return (
      <div>
      <section className='forms-container'>
      <AddForm handleAddPost={(e)=>this.handleAddPost(e)} />
      <AddComment handleAddComment={(e) => this.handleAddComment(e)} />
      </section>
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
                  {item.coments.map((item, idx) => {
                    return (
                        <div key={idx}>
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
                      </div>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
      </div>
    );
  }
}
