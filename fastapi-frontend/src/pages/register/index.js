import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { useRouter } from "next/navigation";
import { useGlobalState } from "../../context/GlobalState";
import styles from "./my_register.module.css";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
//------------------------------------------------------------------------------------------------------------------------------
function RegisterPage() {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    passwordConf: "",
    email: "",
    username: "",
  });
  //------------------------------------------------------------------------------------------------------------------------------
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  //------------------------------------------------------------------------------------------------------------------------------
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const resp = await AuthService.register(user);

      if (resp.data.access_token) {
        //let data = jwtDecode(resp.access_token);
        // resp.data.access_token resp.data.user_id
        let data = resp.data;
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
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={`${styles.container} ${styles.overlay}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Sign Up</h1>
        <form>
          <div className={styles.emailFlex}>
            <input
              className={styles.inputEmail}
              placeholder="Email"
              type="text"
              id="email"
              required
              onChange={(e) => {
                let olduser = user;
                olduser.email = e.target.value;
                olduser.username = e.target.value;
                setUser(olduser);
              }}
            />
          </div>
          <div>
            <input
              className={styles.inputPassword}
              placeholder="password"
              type="password"
              id="password"
              required
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div>
            <input
              className={styles.confirmPassword}
              placeholder="confirm password"
              type="password"
              id="passwordConf"
              required
              onChange={(e) => handleChange("passwordConf", e.target.value)}
            />
          </div>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={
              user.password &&
              user.password.length >= 8 &&
              user.password === user.passwordConf &&
              user.email
                ? false
                : true
            }
          >
            Sign Up
          </button>
          <div className={styles.buttonSeperator}></div>
        </form>
        <p className={styles.link}>
          Already have an account?{" "}
          <Link href="/login">
            <u>Log in</u>
          </Link>
        </p>
      </div>
    </div>
  );
  
}

export default RegisterPage;
