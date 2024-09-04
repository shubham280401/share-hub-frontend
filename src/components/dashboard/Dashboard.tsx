import React from "react";
import Header from "../header/Header";
import styles from "./dashboard.module.css";
import { usePosts } from "../../lib/state";
import Post from "../post/Post"; // Import the PostCard component

const Dashboard = () => {
  const { posts, refetchPosts } = usePosts();

  React.useEffect(() => {
    refetchPosts();
  }, [refetchPosts]);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} page="dashboard" />
      <div className={styles.postsContainer}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
