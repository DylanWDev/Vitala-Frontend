import React from "react";
import styles from "./page.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass, faDashboard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PageDisplay({ pageName }) {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0" style={{ backgroundColor: "red", width: "100%", height: "100px", borderRight: "3px solid black" }}>
                <div className="border border-black" style={{ height: "100px", display: "flex", justifyContent: "center"}}><h1 className={styles.h1}>{pageName}</h1></div>
            </div>
        </>
    )
}