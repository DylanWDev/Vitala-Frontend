import React from "react";
import Link from "next/link";
import styles from './nav.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faMagnifyingGlass, faCircleUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons"; 

export default function Nav( { pageName } ) {
  return (
    <>
      <section className={styles.navContainer}>
        <div className={styles.sidebar}>
          <a href="/dashboard" className={styles.nav}><FontAwesomeIcon icon={faBarChart} /></a>
          <a href="/search" className={styles.nav}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a href="" className={styles.nav}><FontAwesomeIcon icon={faCalendarDays} /></a>
          <a href="" className={styles.nav}></a>
        </div>
        <div className={styles.pageDisplay}>
          <div className={styles.centerContent}>
            <h1 className={styles.h1}><strong>{pageName}</strong></h1>
          </div>
          <div className={styles.userIcon}><a className={styles.a} href="user_page"><FontAwesomeIcon icon={faCircleUser} /></a></div>
        </div>
      </section>
    </>
  );
}