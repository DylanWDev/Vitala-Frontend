import React from "react";
import styles from "./page.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { faMagnifyingGlass, faDashboard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PageDisplay({ PageDisplay }) {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0" style={{ backgroundColor: "red", width: "100vw", height: "100px", borderRight: "3px solid black" }}>
                <div className="border border-black" style={{ height: "100px" }}></div>
            </div>
    </>
    )
}