import React, { useState } from "react";
import axios from "axios";

const NutritionixApiExample = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [error, setError] = useState(null);

  const NUTRITIONIX_APP_ID = "0be43934";
  const NUTRITIONIX_APP_KEY = "5622786a494b005ab83dee42b4282321";
  const baseURL = "https://trackapi.nutritionix.com/v2/search/instant/";

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        baseURL,
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

      console.log("response.data", response.data);
    } catch (error) {
      setError("Error fetching data from Nutritionix API");
      console.error("Error fetching data from Nutritionix API:", error);
    }
  };

  const handleKeyPress = (e) => {
    setFoodQuery(e.target.value);
    if (e.target.value.length > 3) {
      handleSearch();
    }
  };

  //e.target.value > 4 then return result

  return (
    <div className="container">
      <div>
        <input
          type="text"
          value={foodQuery}
          onChange={handleKeyPress}
          placeholder="Enter food query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NutritionixApiExample;
