import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./post.module.css";

const Post = ({ post }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => {
    console.log("Navigating to post details with ID:", post.id); // Debug log
    // Navigate to the PostDetails page with the post's ID
    navigate(`/postdetails/${post.id}`);
  };

  return (
    <div className={styles.postCard} onClick={handleClick}>
      {" "}
      {/* Add onClick handler */}
      {post.thumbnailUrl ? (
        <img
          src={post.thumbnailUrl}
          alt="Thumbnail"
          className={styles.thumbnail}
        />
      ) : (
        <div className={styles.thumbnailPlaceholder}>No Image</div>
      )}
      <h3>{post.title}</h3>
      <div className={styles.labels}>
        {post.postTags?.map((tagObj) => (
          <span key={tagObj.id} className={styles.label}>
            #{tagObj.tag.name}
          </span>
        ))}
      </div>
      <p className={styles.readTime}>Today • 5min read time</p>
      {/* <p>{post.description}</p> */}
      <p>
        <a href={post.articleLink} onClick={(e) => e.stopPropagation()}>
          {" "}
          {/* Prevent navigation on link click */}
          Read more
        </a>
      </p>
      <p>
        <a href={post.videoLink} onClick={(e) => e.stopPropagation()}>
          {" "}
          {/* Prevent navigation on link click */}
          Watch video
        </a>
      </p>
    </div>
  );
};

export default Post;
