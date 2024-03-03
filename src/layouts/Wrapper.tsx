import React, { PropsWithChildren } from "react";
import styles from "./Wrapper.module.css";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.container}>
      <div className={styles.headerContainer}></div>
      <div className={styles.bodyContainer}>
        <div className={styles.sideBarContainer}>
          <Sidebar />
        </div>
        <div className={styles.contentContainer}> {children}</div>
      </div>
    </Layout>
  );
};

export default Wrapper;
