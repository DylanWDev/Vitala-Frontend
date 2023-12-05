import React from "react";
import styles from "./DashboardPage.module.css";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Sidebar from "@/components/nav/Sidebar";
import PageDisplay from "@/components/pageDisplay/PageDisplay";

export default function DashboardPage() {
  let [data, setData] = useState(null);

  const pageName = "Dashbaord";

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/foodlogs/"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      {/* <PageDisplay /> */}
      <div className={styles.dashboardContainer}>
        <main className={styles.mainContent}>
          <div className={styles.macros}>
            <div>
              <h5>Protein</h5>
              <p>100g</p>
            </div>
            <div>
              <h5>Carbs</h5>
              <p>100g</p>
            </div>
            <div>
              <h5>Fats</h5>
              <p>100g</p>
            </div>
            <div>
              <h5>Water</h5>
              <p>5L</p>
            </div>
          </div>
          <div className={styles.flex}>
            <h1>750cal</h1>
          </div>
          <div className={styles.flex}>
            <div className={styles.macros}>
              <div>
                <h5>Breakfast</h5>
                <p>100cal</p>
              </div>
              <div>
                <h5>Lunch</h5>
                <p>100cal</p>
              </div>
              <div>
                <h5>Dinner</h5>
                <p>100cal</p>
              </div>
              <div>
                <h5>Snacks</h5>
                <p>100cal</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
