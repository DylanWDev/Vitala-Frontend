import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/Nav/Nav";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import styles from "./DashboardPage.module.css";
import { faPlus, faMinus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// Health goal options
const HEALTH_GOAL_OPTIONS = {
  MAINTAIN: "maintain",
  GAIN: "gain",
  LOSE: "lose",
};

export default function DashboardPage() {
  let [data, setData] = useState(null);
  const [foodQuery, setFoodQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [foods, setFoods] = useState([]);
  const { state, dispatch } = useGlobalState();
  let [userData, setUserData] = useState(null);
  const [caloricBudget, setCaloricBudget] = useState(null);

  //!============================================
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
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

  //!============================================
  // Fetch user data when user changes
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/users/${state.user.sub}`
        );
        setUserData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserData();
  }, [state.user]);

  //!============================================
  // Fetch user data from local storage on component mount
  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = jwtDecode(userData);
        console.log("User data:", user);  
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  //!============================================
  // Calculate total nutrition values
  const totalProtein = Math.round(
    (data ?? []).reduce((acc, entry) => acc + entry.protein, 0)
  );
  const totalCarbs = Math.round(
    (data ?? []).reduce((acc, entry) => acc + entry.carbs, 0)
  );
  const totalFats = Math.round(
    (data ?? []).reduce((acc, entry) => acc + entry.fats, 0)
  );
  const totalCalories = Math.round(
    (data ?? []).reduce((acc, entry) => acc + entry.calories, 0)
  );

  //!============================================
  // Nutritionix API related constants and functions
  const NUTRITIONIX_APP_ID = "0be43934";
  const NUTRITIONIX_APP_KEY = "5622786a494b005ab83dee42b4282321";
  const nutritionixBaseURL =
    "https://trackapi.nutritionix.com/v2/natural/nutrients";
  const backendBaseURL = "http://127.0.0.1:8000/api/v1/foodlogs/";

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
      setFoods(response.data.foods || []);
      console.log("Nutritionix Response:", response.data);
    } catch (error) {
      console.error("Error fetching data from Nutritionix API:", error);
    }
  };

  //!============================================
  // Handle click event when adding a food log
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
        user_id: parseInt(state.user.sub),
      };

      const totalLoggedCalories = totalCalories + dataToSend.calories;

      if (caloricBudget !== null && totalLoggedCalories <= caloricBudget) {
        // Post the new food log
        const response = await axios.post(backendBaseURL, dataToSend);
        console.log("Backend Response:", response.data);

        // Fetch updated data after successfully posting
        const updatedResponse = await axios.get(
          "http://127.0.0.1:8000/api/v1/foodlogs/all_food_logs"
        );
        setData(updatedResponse.data);
        console.log("Updated Food Logs:", updatedResponse.data);

        // Clear the search result and foods state after adding
        // setSearchResult(null);
        // setFoods([]);
        clearSearchBar();
      } else {
        // Display a message or handle the case where adding the food log exceeds the budget
        console.log('Adding this food log exceeds the caloric budget!');
      }
    } catch (error) {
      console.error("Error posting or fetching data:", error);
    }
  };

  //!============================================

  const handleDeleteEvent = async (foodLogId) => {
    try {
      // Send a request to delete the food log entry
      await axios.delete(`http://127.0.0.1:8000/api/v1/foodlogs/${foodLogId}`);
  
      // Fetch updated data after successful deletion
      const updatedResponse = await axios.get(
        "http://127.0.0.1:8000/api/v1/foodlogs/all_food_logs"
      );
      setData(updatedResponse.data);
      console.log("Updated Food Logs:", updatedResponse.data);
    } catch (error) {
      console.error("Error deleting food log entry:", error);
    }
  };

  //!============================================
  // Handle key press event for fetching data on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData();
    }
  };

  //!============================================
  const clearSearchBar = () => {
    setFoodQuery("")
  }

  // Caloric budget calculation
  const calculateCalorieIntake = () => {
    if (!userData) return;

    const { age, weight, height, gender, health_goals } = userData;

    // Calculate BMR
    let bmr;
    if (gender === "male") {
      bmr = 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
    } else {
      bmr = 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
    }

    // Adjust calories based on health goal from user data
    let adjustedCaloricBudget = bmr;
    if (health_goals === HEALTH_GOAL_OPTIONS.GAIN) {
      adjustedCaloricBudget += 300;
    } else if (health_goals === HEALTH_GOAL_OPTIONS.LOSE) {
      adjustedCaloricBudget -= 300;
    }

    // Set the caloric budget in state
    setCaloricBudget(Math.round(adjustedCaloricBudget));
  };

  useEffect(() => {
    if (userData) {
      calculateCalorieIntake();
    }
  }, [userData]);

  //!===================================================================================

  const calculateProgress = () => {
    // Calculate the percentage of calories consumed
    const percentage = (totalCalories / caloricBudget) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  const progress = calculateProgress()

  const calculateWholeNumberPercentage = () => {
    // Calculate the whole number percentage of calories consumed
    let percentage = Math.round((totalCalories / caloricBudget) * 100);
    if (isNaN(percentage)){
        percentage = 0
    }

    return percentage > 100 ? 100 : percentage;
  };
  
  const wholeNumberPercentage = calculateWholeNumberPercentage();

  //!================================================================================

  const handleSearchClick = () => {
    fetchData();
  };


  //TODO============================================

  return (
    <>
      <div ><Nav /></div>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <div className={styles.gridContainer}>
            {/* Left Column - Macros and Calories */}
            <div className={styles.macroCaloriesContainer}>
              <div className={styles.macros}>
                <div className={styles.columnItem}>
                  
                  <h5>Protein</h5>
                  <p>{totalProtein}g</p>
                </div>
                <div className={styles.columnItem}>
                  <h5>Carbs</h5>
                  <p>{totalCarbs}g</p>
                </div>
                <div className={styles.columnItem}>
                  <h5>Fats</h5>
                  <p>{totalFats}g</p>
                </div>
              </div>

              <div className={styles.columnItem}>
                <CircularProgressbar value={progress} text={`${wholeNumberPercentage}%`} styles={buildStyles({
                   pathColor: '#61cc61',
                   textColor: '#ffff',
                   trailColor: '#ffff'
                })}/>
                <h5>Calories</h5>
                <p>{totalCalories}</p>
              </div>
              <div className={styles.columnItem}>
                <h5>Budget</h5>
                <p>{caloricBudget}</p>
              </div>
            
            </div>

            <div className={styles.searchAndHistory}>
              {/* Right Column - Search Input, API Info, Food Log History */}
              <div className={styles.searchContent}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1" onClick={handleSearchClick}><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                  <input
                    type="text"
                    className={"form-control"}
                    placeholder="Search for a food"
                    value={foodQuery}
                    onChange={(e) => setFoodQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                {searchResult && (
                  <div>
                    {searchResult.foods && searchResult.foods.length > 0 && (
                      <div className={styles.apiInfo}>
                        <h3>
                          <strong>{searchResult.foods[0].food_name}:</strong>
                        </h3>
                        <p>
                          Calories: {searchResult.foods[0].nf_calories}, Serving:{" "}
                          {searchResult.foods[0].serving_qty}{""}
                          {searchResult.foods[0].serving_unit}
                        </p>
                        <button onClick={handleClickEvent}><FontAwesomeIcon icon={faPlus} /></button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Display the history of added food logs */}
              <div className={`${styles.foodLogs}`}>
                <h2>Food Log History</h2>
                <div className={`${styles.history}`}>
                  <ul>
                    {data &&
                      data.map((entry) => (
                        <div className={styles.historyText}>
                          <li key={entry.id}>
                            <b>{entry.food_name}:</b> ‎ Calories: {entry.calories}
                            <button onClick={() => handleDeleteEvent(entry.id)}>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </li>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
