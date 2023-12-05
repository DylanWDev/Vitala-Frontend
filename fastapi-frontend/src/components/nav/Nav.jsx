import React from "react";
import styles from "./nav.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass, faHome, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav() {
  return (
    <>
      <div className={styles.navContainer} >
        <div className={styles.logo}></div>
      
        <div className="d-flex flex-row align-items-center">
          <a href="/dashboard" className={styles.navIcons}><FontAwesomeIcon icon={faHome} /></a>
          <a href="/search" className={styles.navIcons}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a href="/calendar" className={styles.navIcons}><FontAwesomeIcon icon={faCalendarDays} /></a>
        </div>
      </div>
    </>
  );
}
