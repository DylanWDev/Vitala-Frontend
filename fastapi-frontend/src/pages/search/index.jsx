import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from './NutritionixApiExample.module.css';
import { API_URL } from "@/services/auth.constants";
import Nav from "@/components/Nav/Nav";
import { useGlobalState } from "@/context/GlobalState";

const NutritionixApiExample = () => {
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

  return (
    <>
    <Nav/>
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
    </>
  );
};

export default NutritionixApiExample;
