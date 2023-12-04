import React from "react";
import Link from "next/link";
import styles from "./nav.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass, faDashboard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar({ pageName }) {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: "100px", height: "100vh" }}>
        <div className="border border-black" style={{ height: "100px" }}></div>
      
        <div className="d-flex flex-column align-items-center">
          <a className={styles.navIcons}><FontAwesomeIcon icon={faDashboard} /></a>
          <a className={styles.navIcons}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a className={styles.navIcons}><FontAwesomeIcon icon={faCalendarDays} /></a>
        </div>
      </div>
    </>
  );
}
