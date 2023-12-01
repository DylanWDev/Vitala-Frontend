import React, { useEffect, useState } from "react";
import axios from "axios";

const NutritionixApiExample = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const NUTRITIONIX_APP_ID = "0be43934";
  const NUTRITIONIX_APP_KEY = "5622786a494b005ab83dee42b4282321";
  const baseURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";

  const fetchData = async () => {
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

      setSearchResult(response.data);
    } catch (error) {
      setError("Error fetching data from Nutritionix API");
      console.error("Error fetching data from Nutritionix API:", error);
    }
  };

  useEffect(() => {
    if (foodQuery.trim() !== "") {
      fetchData();
    }
  }, [foodQuery]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData();
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          value={foodQuery}
          onChange={(e) => setFoodQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter food query"
        />
      </div>
      {error && <p>{error}</p>}
      {searchResult && (
        <div>
          <h2>Search Result:</h2>
          {searchResult.foods && searchResult.foods.length > 0 && (
            <div>
              <h3><strong>{searchResult.foods[0].food_name}:</strong></h3>
              <p>Calories: {searchResult.foods[0].nf_calories}, Serving: {searchResult.foods[0].serving_qty} {searchResult.foods[0].serving_unit}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionixApiExample;
