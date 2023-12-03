import React from "react";
import Link from "next/link";
import styles from './DashboardPage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; 

export default function DashboardPage() {
  return (
    <>
      <section className={styles.dashboardContainer}>
        <div className={styles.sidebar}>
          <a className={styles.nav}><FontAwesomeIcon icon={faBarChart} /></a>
          <a className={styles.nav}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a className={styles.nav}></a>
          <a className={styles.nav}></a>
        </div>
        <div className={styles.mainContent}>
          {/* Add your main content here */}
        </div>
      </section>
    </>
  );
}