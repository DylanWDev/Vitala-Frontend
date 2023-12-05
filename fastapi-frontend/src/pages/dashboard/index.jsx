import React from "react";
import Link from "next/link";
import styles from "./DashboardPage.module.css";
import DataService from "@/services/data.service";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalState";
import axios, { Axios } from "axios";
import Nav from "@/components/nav/Nav";


export default function DashboardPage() {
  
  const [localState, setLocalState] =  useState({});
  const [globalState, dispatchEvent] = useGlobalState();

  useEffect( async () => {
    // Get Data and set State
    DataService
      .getData({
        data: "hello",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":"Bearer " + globalState.user.user_id
        }
      })
      .then(async (resp) => {
          if(resp != undefined){
              setLocalState(resp)
              await dispatchEvent({
                type: 'GET_DATA',
                payload: resp,
              });
          }
      })
      .catch((error) => {
          // Handle the error here
          console.error('An error occurred:', error);
      })
      .finally(() => {
          // Code to run regardless of success or failure
          console.log('Get Data request completed');
      });

      DataService
      .sendData({
        data: "something",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":"Bearer " + globalState.user.user_id
        }
      })
      .then(async (resp) => {
          if(resp != undefined){
              setLocalState(resp)
              await dispatchEvent({
                type: 'SET_DATA_COMPLETED',
                payload: resp,
              });
          }
      })
      .catch((error) => {
          // Handle the error here
          console.error('An error occurred:', error);
      })
      .finally(() => {
          // Code to run regardless of success or failure
          console.log('Set Data request completed');
      });
  }, [])
  
  
//==========================================================================================
  
  
  
  let [data, setData] = useState(null);

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
      <Nav />
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
