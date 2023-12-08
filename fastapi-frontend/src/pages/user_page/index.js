import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";

function YourComponent() {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState(0);
  const [healthGoals, setHealthGoals] = useState("");
  
  const { state, dispatch } = useGlobalState();

  const handleInputChange = (setter) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
  };

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

  const handleUpdate = async (column, value) => {
    try {
      const requestBody = {
        accept: "application/json",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/data/${state.user.sub}?column_name=${column}&column_value=${value}`,
        requestBody
      );

      console.log(`Backend Response for ${column}:`, response.data);
    } catch (error) {
      console.error(`Error updating ${column}:`, error);
    }
  };

  return (
    <>
      <div>
        <label>Age:</label>
        <input value={age} onChange={handleInputChange(setAge)} />
        <button onClick={() => handleUpdate('age', age)}>Update Age</button>
      </div>
      <div>
        <label>Height:</label>
        <input value={height} onChange={handleInputChange(setHeight)} />
        <button onClick={() => handleUpdate('height', height)}>Update Height</button>
      </div>
      <div>
        <label>Weight:</label>
        <input value={weight} onChange={handleInputChange(setWeight)} />
        <button onClick={() => handleUpdate('weight', weight)}>Update Weight</button>
      </div>
      <div>
        <label>Gender:</label>
        <input value={gender} onChange={handleInputChange(setGender)} />
        <button onClick={() => handleUpdate('gender', gender)}>Update Gender</button>
      </div>
      <div>
        <label>Activity Level:</label>
        <input value={activityLevel} onChange={handleInputChange(setActivityLevel)} />
        <button onClick={() => handleUpdate('activity_level', activityLevel)}>Update Activity Level</button>
      </div>
      <div>
        <label>Health Goals:</label>
        <input value={healthGoals} onChange={handleInputChange(setHealthGoals)} />
        <button onClick={() => handleUpdate('health_goals', healthGoals)}>Update Health Goals</button>
      </div>
    </>
  );
}

export default YourComponent;
