import React from "react";
import { Input, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../ui/ButtonComp";
import styles from "./header.module.css"; // Import your CSS module

const { Search } = Input;

interface HeaderProps {
  isLoggedIn: boolean;
  page:
    | "home"
    | "signup"
    | "login"
    | "dashboard"
    | "createpost"
    | "postdetails";
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, page }) => {
  const onSearch = (value: string) => console.log(value);
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (isLoggedIn) {
      navigate("/createpost"); // Navigate to the post page for logged-in users
    } else {
      navigate("/signup"); // Navigate to the signup page for non-logged-in users
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h2>ShareHub</h2>
      </div>
      {page === "home" && (
        <>
          <Search
            placeholder="Search your course here..."
            onSearch={onSearch}
            style={{ width: 300 }}
            className={styles.inputStyle}
          />
          <ButtonComp
            type="primary"
            className={styles.btn}
            onClick={handlePostClick}
          >
            Create Post
          </ButtonComp>
        </>
      )}
      {isLoggedIn && (page === "dashboard" || page === "createpost") && (
        <>
          <Search
            placeholder="Search your course here..."
            onSearch={onSearch}
            style={{ width: 300 }}
            className={styles.inputStyle}
          />
          <ButtonComp
            type="primary"
            className={styles.btn}
            onClick={handlePostClick}
          >
            Create Post
          </ButtonComp>
          <Avatar
            style={{ color: "#000000", backgroundColor: "white" }} // Customize the style here
            className={styles.avatar}
          >
            U
          </Avatar>
        </>
      )}
    </div>
  );
};

export default Header;

// import React from "react";
// import { Input, Avatar } from "antd";
// import { useNavigate } from "react-router-dom";
// import ButtonComp from "../ui/ButtonComp";
// import styles from "./header.module.css"; // Import your CSS module

// const { Search } = Input;

// interface HeaderProps {
//   isLoggedIn: boolean;
//   page: "home" | "signup" | "login" | "dashboard";
// }

// const Header: React.FC<HeaderProps> = ({ isLoggedIn, page }) => {
//   const onSearch = (value: string) => console.log(value);
//   const navigate = useNavigate();

//   const handlePostClick = () => {
//     if (isLoggedIn) {
//       navigate("/create-post");
//     } else {
//       navigate("/signup");
//     }
//   };

//   return (
//     <div className={styles.header}>
//       <div className={styles.logo}>
//         <h2>ShareHub</h2>
//       </div>
//       {page === "home" && (
//         <>
//           <Search
//             placeholder="Search your course here..."
//             onSearch={onSearch}
//             style={{ width: 300 }}
//             className={styles.inputStyle}
//           />
//           <ButtonComp
//             type="primary"
//             className={styles.btn}
//             onClick={handlePostClick}
//           >
//             Create Post
//           </ButtonComp>
//         </>
//       )}
//       {isLoggedIn && page === "dashboard" && (
//         <>
//           <Search
//             placeholder="Search your course here..."
//             onSearch={onSearch}
//             style={{ width: 300 }}
//             className={styles.inputStyle}
//           />
//           <ButtonComp
//             type="primary"
//             className={styles.btn}
//             onClick={handlePostClick}
//           >
//             Create Post
//           </ButtonComp>
//           <Avatar
//             style={{ color: "#000000", backgroundColor: "white" }} // Customize the style here
//             className={styles.avatar}
//           >
//             U
//           </Avatar>
//         </>
//       )}
//     </div>
//   );
// };

// export default Header;
