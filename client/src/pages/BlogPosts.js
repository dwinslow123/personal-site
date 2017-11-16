
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class BlogPosts extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: 'This is a FAKE blog post title',
        _id: '234lj23kjh',
        content: 'This is some FAKE content',
        author: 'ObjectID(lakjsdlfkj)',
        comments: [
          {text:'This is a FAKE comment', author: 'Stanley Yelnats'},
      ]},
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3030/posts')
      .then((data) => {
        this.setState({posts: data.data});
      })
      .catch((err) => {
        console.log('You still need to implement the `POSTS` `GET`', err);
      });
  }

  render() {
    const { posts } = this.state;
    console.log(this.state);
    if (!posts) return (<div></div>);
    return (
      <div>
      <Link to='/new-post'><button className="btn btn-default btn-sm">Create New Post</button></Link>
        {posts.map((post) => {
          return (
              <div key={post._id}>
                <Link to={`posts/${post._id}`}>{post.title}</Link>
              </div>
            )
        })}
      </div>
    );
  }
}