import React from "react";
import Link from "next/link";
import styles from './DashboardPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faMagnifyingGlass, faCircleUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Nav from "@/components/nav";

export default function DashboardPage() {
  const pageName = "Dashbaord"
  return (
    <>
      <section className={styles.navContainer}>
        <div className={styles.sidebar}>
          <a href="/dashboard" className={styles.nav}><FontAwesomeIcon icon={faBarChart} /></a>
          <a href="/search" className={styles.nav}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a href="" className={styles.nav}><FontAwesomeIcon icon={faCalendarDays} /></a>
          <a href="" className={styles.nav}></a>
        </div>
        <div className={styles.pageDisplayDiv}>
        <div className={styles.pageDisplay}>
          <div className={styles.centerContent}>
            <h1 className={styles.h1}><strong>{pageName}</strong></h1>
          </div>
          <div className={styles.userIcon}><a className={styles.a} href="user_page"><FontAwesomeIcon icon={faCircleUser} /></a></div>
        <div className={styles.middle}></div>
        </div>
        <div className={styles.mainContent}>
        <div className={styles.macros}>
          <div>
            <h5>Protein</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Carbs</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Fats</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Water</h5>
            <p>5L</p>
          </div>
        </div>
          <div className={styles.flex}>
            <h1>hi</h1>
          </div>
          <div className={styles.flex}>
          <div className={styles.macros}>
          <div>
            <h5>Protein</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Carbs</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Fats</h5>
            <p>100g</p>
          </div>
          <div>
            <h5>Water</h5>
            <p>5L</p>
          </div>
        </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}