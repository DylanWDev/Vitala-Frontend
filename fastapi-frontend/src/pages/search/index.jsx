import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './NutritionixApiExample.module.css';
import { API_URL } from "@/services/auth.constants";

const NutritionixApiExample = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const NUTRITIONIX_APP_ID = "0be43934";
  const NUTRITIONIX_APP_KEY = "5622786a494b005ab83dee42b4282321";
  const nutritionixBaseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
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
      console.log("Nutritionix Response:", response.data);
    } catch (error) {
      setError("Error fetching data from Nutritionix API");
      console.error("Error fetching data from Nutritionix API:", error);
    }
  };

  const handleClickEvent = async () => {
    try {
      const dataToSend = {
        meal_type: "Breakfast",
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
            <button onClick={handleClickEvent}>Send to Backend</button>
          </div>
          {searchResult && (
            <div>
              {searchResult.foods && searchResult.foods.length > 0 && (
                <div className={styles.apiInfo}>
                  <h3><strong>{searchResult.foods[0].food_name}:</strong></h3>
                  <p>Calories: {searchResult.foods[0].nf_calories}, Serving: {searchResult.foods[0].serving_qty} {searchResult.foods[0].serving_unit}</p>
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
