import styles from './nav.module.css';  // Make sure to adjust the path based on your project structure

const Nav = () => {

  return (
    <nav class={`nav ${styles.nav}`}>
      <p class={`nav ${styles.logo}`} >Vitala</p>
      <a class={`nav ${styles.regularNav}`} href="./dashboard">Dashboard</a>
      <a class={`nav ${styles.regularNav}`} href="./user_page">User</a>
    </nav>
  );
};

export default Nav;
