import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import AuthService from "../../services/auth.service";
import { jwtDecode } from "jwt-decode";
import styles from "./my_login.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //------------------------------------------------------------------------------------------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    const username = email;
    AuthService.login(username, password)
      .then(async (resp) => {
        if (resp != undefined) {
          if (resp.access_token) {
            //let data = jwtDecode(resp.access_token);
            let data = jwtDecode(resp.access_token, { header: true });
            await dispatch({
              type: "SET_USER",
              payload: data,
            });
            console.log("Login success");
            router.push("/");
          } else {
            console.log("Login failed");
            dispatch({ type: "LOGOUT_USER" });
          }
        }
      })
      .catch((error) => {
        // Handle the error here
        console.error("An error occurred:", error);
        // Optionally, dispatch a logout or error action
        dispatch({ type: "LOGOUT_USER" });
      })
      .finally(() => {
        // Code to run regardless of success or failure
        console.log("Login request completed");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.emailFlex}>
            <input
              className={styles.inputEmail}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className={styles.inputPassword}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <button className={styles.loginButton}>Login</button>
          <div className={styles.buttonSeperator}></div>
        </form>
        <p className={styles.link}>
          Not a member?{" "}
          <Link href="/my_register">
            <u>Sign up now</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
