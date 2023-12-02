import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useGlobalState } from '../../context/GlobalState';
import AuthService from '../../services/auth.service';
import { jwtDecode } from "jwt-decode";
import styles from './my_login.module.css'
import Link from 'next/link';

function LoginPage() {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div>
            <p className={styles.inputText}>Email</p>
            <input />
          </div>
          <div>
            <p className={styles.inputText}>Password</p>
            <input />
          </div>
          <button>Login</button>
        </div>
      </div>
    );
  }
  

export default LoginPage