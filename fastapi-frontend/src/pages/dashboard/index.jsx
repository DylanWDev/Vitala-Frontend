import React from "react";
import Link from "next/link";
import styles from "./DashboardPage.module.css";
import DataService from "@/services/data.service";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalState";
import axios, { Axios } from "axios";
import Nav from "@/components/Nav/Nav";
import { jwtDecode } from "jwt-decode";


export default function DashboardPage() {



  

//!------------------------------------------------------------------

  
  let [data, setData] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/foodlogs/all_food_logs"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total values
  const totalProtein = Math.round((data ?? []).reduce((acc, entry) => acc + entry.protein, 0));
  const totalCarbs = Math.round((data ?? []).reduce((acc, entry) => acc + entry.carbs, 0));
  const totalFats = Math.round((data ?? []).reduce((acc, entry) => acc + entry.fats, 0));



//!------------------------------------------------------------------



const [foodQuery, setFoodQuery] = useState("");
const [error, setError] = useState(null);
const [searchResult, setSearchResult] = useState(null);
const [foods, setFoods] = useState([]);

const NUTRITIONIX_APP_ID = "0be43934";
const NUTRITIONIX_APP_KEY = "5622786a494b005ab83dee42b4282321";
const nutritionixBaseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
const backendBaseURL = "http://127.0.0.1:8000/api/v1/foodlogs/";


const { state, dispatch} = useGlobalState();

useEffect(() => {
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = jwtDecode(userData);
      console.log('User data:', user);
      dispatch({
        type: 'SET_USER',
        payload: user
      });
    }
  };
  getUserFromLocalStorage();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.post(
      nutritionixBaseURL,
      {
        query: foodQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": NUTRITIONIX_APP_ID,
          "x-app-key": NUTRITIONIX_APP_KEY,
        },
      }
    );

    setSearchResult(response.data);
    setFoods(response.data.foods || []); // Assuming the array of foods is in response.data.foods
    console.log("Nutritionix Response:", response.data);
  } catch (error) {
    setError("Error fetching data from Nutritionix API");
    console.error("Error fetching data from Nutritionix API:", error);
  }
};

const handleClickEvent = async () => {
  try {
    const dataToSend = {
      servings: foods[0]?.serving_qty || 0,
      date_logged: foods[0]?.consumed_at || new Date().toISOString(),
      calories: foods[0]?.nf_calories || 0.0,
      protein: foods[0]?.nf_protein || 0.0,
      carbs: foods[0]?.nf_total_carbohydrate || 0.0,
      fats: foods[0]?.nf_total_fat || 0.0,
      serving_unit: foods[0]?.serving_unit || "unit",
      serving_weight_grams: foods[0]?.serving_weight_grams || 0.0,
      meal_type: foods[0]?.meal_type || 0,
      food_name: foods[0]?.food_name || "name",
      user_id: parseInt(state.user.sub)
    };

    const response = await axios.post(backendBaseURL, dataToSend);

    console.log('Backend Response:', response.data);
  } catch (error) {
    console.error('Error posting data to the backend:', error);
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchData();
  }
};


//!------------------------------------------------------------------

useEffect(() => {
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = jwtDecode(userData);
      console.log('User data:', user);
      dispatch({
        type: 'SET_USER',
        payload: user
      });
    }
  };
  getUserFromLocalStorage();
}, []);

//*------------------------------------------------------------------

let [userData, setUserData] = useState(null);

useEffect(() => {
  let getUserData = async () => {
    try {
      const response = await axios.get(

        `http://127.0.0.1:8000/api/v1/users/${state.user.sub}`,
        
      );
      setUserData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getUserData();
}, [state.user]);



//!===================================================================================================

const calculateCalorieIntake = () => {
  const { age, weight, height, gender, activity_level, health_goals } = userData;

  // Calculate BMR
  let bmr;
  if (gender === "male") {
    bmr = 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
  } else {
    bmr = 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
  }

  // Adjust for Activity Level
  let activityMultiplier;
  switch (activity_level) {
    case 1:
      activityMultiplier = 1.2;
      break;
    case 2:
      activityMultiplier = 1.375;
      break;
    case 3:
      activityMultiplier = 1.55;
      break;
    case 4:
      activityMultiplier = 1.725;
      break;
    case 5:
      activityMultiplier = 1.9;
      break;
    default:
      activityMultiplier = 1.2;
  }

  const totalCalories = bmr * activityMultiplier;

  // Adjust for Health Goals
  let calorieBudget;
  if (health_goals === "losing") {
    calorieBudget = 0.8 * totalCalories;
  } else if (health_goals === "gaining") {
    calorieBudget = 1.2 * totalCalories;
  } else {
    calorieBudget = totalCalories;
  }

  // Display the calculated values
  console.log("Caloric Budget:", Math.round(calorieBudget));
  console.log("Protein Goal:", Math.round(calorieBudget * 0.3));
  console.log("Carbs Goal:", Math.round(calorieBudget * 0.4));
  console.log("Fats Goal:", Math.round(calorieBudget * 0.3));
};

// Call the function after fetching user data
useEffect(() => {
  if (userData) {
    calculateCalorieIntake();
  }
}, [userData]);




  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.dashboardContainer}>
        <main className={styles.mainContent}>
          <div>
            <h5>Total Protein</h5>
            <p>{totalProtein}g</p>
          </div>
          <div>
            <h5>Total Carbs</h5>
            <p>{totalCarbs}g</p>
          </div>
          <div>
            <h5>Total Fats</h5>
            <p>{totalFats}g</p>
          </div>
        </main>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.mainContent}>
          <div>
            <input
              type="text"
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter food query"
              className={styles.input}
            />
            
          </div>
          {searchResult && (
            <div>
              {searchResult.foods && searchResult.foods.length > 0 && (
                <div className={styles.apiInfo}>
                  <h3><strong>{searchResult.foods[0].food_name}:</strong></h3>
                  <p>Calories: {searchResult.foods[0].nf_calories}, Serving: {searchResult.foods[0].serving_qty} {searchResult.foods[0].serving_unit}</p>
                  <button onClick={handleClickEvent}>+</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
