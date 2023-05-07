import React, { useState, useEffect } from 'react';

const GetPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h4>Posts</h4>
      <ul>
        {posts.map((post) => (
          <li key={post.PostID}>
            <strong>{post.UserName}</strong> - {post.Content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPost;
