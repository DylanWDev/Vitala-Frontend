import React, { useState } from 'react';
import axios from 'axios';

const NutritionixApiExample = () => {
  const [foodQuery, setFoodQuery] = useState('');
  const [error, setError] = useState(null);

  const NUTRITIONIX_APP_ID = '0be43934';
  const NUTRITIONIX_APP_KEY = '5622786a494b005ab83dee42b4282321';
  const baseURL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

  const handleSearch = async () => {
    try {
      const response = await axios.post(baseURL, {
        query: foodQuery,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
      });

      console.log('Nutrition Information:', response.data.foods);
    } catch (error) {
      setError('Error fetching data from Nutritionix API');
      console.error('Error fetching data from Nutritionix API:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={foodQuery}
          onChange={(e) => setFoodQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          placeholder="Enter food query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NutritionixApiExample;
