import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

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
  render() {
    return (
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
            this.state.posts.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  {item.coments.map((item) => {
                    return (
                        <>
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
                      </>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}