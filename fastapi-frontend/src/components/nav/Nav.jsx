import React from 'react';
import styles from "./nav.module.css";


const Nav = ( activeLink ) => {

  const isDashboard = activeLink === "home";
  const isMake = activeLink === "user";

  return (
    <div className={styles.navContainer}>
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.customNavbar}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.customNavbarBrand}`} href="./dashboard">
          Vitala
        </a>
        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={`nav-link ${styles.customNavLink} ${activeLink === 'home' ? 'chosen': 'notChosen' }`} aria-current="page" href="./dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeLink === 'user' ? 'chosen': 'notChosen' } ${styles.customNavLink}`} href="./user_page">
                User
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Nav;
