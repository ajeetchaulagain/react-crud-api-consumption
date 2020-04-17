import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    //pending / resolved(succes) OR rejected (failure)
    const { data: posts, status } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    console.log("Add");
    const obj = {
      title: "a",
      body: "b"
    };
    // Server will respond with newly created post!
    const { data: post } = await http.post(config.apiEndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    console.log(post);
  };

  // Method responsible for updating post
  handleUpdate = async post => {
    post.title = "UPDATED";

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });

    try {
      await http.put(`${config.apiEndPoint}/${post.id}`, post.id);
    } catch (ex) {
      console.log("EXCEPTION IN HANDLEUPDATE", ex);
    }
  };

  // Deleting a post
  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      const deletedPost = await http.delete(
        "s" + config.apiEndPoint + "/" + post.id
      );
      console.log("DELETED POST: ", deletedPost);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("this post has already been deleted");
        console.log("Exception object:", ex.response);
      }

      this.setState({ posts: originalPosts });
    }
  };

  // Responsible for rendering view
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
