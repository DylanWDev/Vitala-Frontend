import React from "react";
import styles from "./nav.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass, faDashboard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0" style={{ backgroundColor: "red", width: "100px", height: "100vh", borderRight: "3px solid black" }}>
        <div className="border border-black" style={{ height: "100px" }}></div>
      
        <div className="d-flex flex-column align-items-center">
          <a href="/dashboard" className={styles.navIcons}><FontAwesomeIcon icon={faDashboard} /></a>
          <a href="/search" className={styles.navIcons}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a href="/calendar" className={styles.navIcons}><FontAwesomeIcon icon={faCalendarDays} /></a>
        </div>
      </div>
    </>
  );
}
