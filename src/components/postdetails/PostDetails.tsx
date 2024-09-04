import { useParams, useNavigate } from "react-router-dom";
import { usePostDetails } from "../../lib/state"; // Assuming this is a custom hook
import Header from "../header/Header";
import styles from "./postdetails.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const { post, error, isLoading } = usePostDetails(Number(postId));
  const postData = post?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching post details:", error);
    return <div>Error loading post details</div>;
  }

  if (!postData) {
    return <div>No post found</div>;
  }

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} page="postdetails" />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FiArrowLeft />
          </button>
          <h2 className={styles.postTitle}>{postData.title}</h2>
          {postData.thumbnailUrl && (
            <img
              src={postData.thumbnailUrl}
              alt="thumbnail"
              className={styles.thumbnail}
            />
          )}
        </div>

        <div className={styles.hashtags}>
          {postData.postTags?.map((tagObj) => (
            <span key={tagObj.id} className={styles.tag}>
              #{tagObj.tag.name}
            </span>
          ))}
        </div>

        <div className={styles.userInfo}>
          <div className={styles.profile}>
            <div className={styles.avatar}></div>
            <div className={styles.userName}>
              {postData.user
                ? `${postData.user.firstName} ${postData.user.lastName}`
                : "Anonymous"}
            </div>
          </div>
        </div>

        <div className={styles.descriptionBox}>
          <p>{postData.description}</p>
          <div className={styles.links}>
            <a
              href={postData.articleLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Article Link
            </a>
            <a
              href={postData.videoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Link
            </a>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <CiHeart /> Add to favorite
          </button>
          <button className={styles.actionButton}>
            <IoShareSocialOutline /> Share
          </button>
        </div>
      </div>
      <div className={styles.commentsSection}>{/* Render comments here */}</div>
    </div>
  );
};

export default PostDetails;
