import React, { useContext } from "react";
import Header from "../header/Header";
import { AppContext } from "../../context/AppState";
import styles from "./home.module.css";

const Home = () => {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className={styles.homePage}>
      <Header isLoggedIn={isLoggedIn} page="home" />
    </div>
  );
};

export default Home;
