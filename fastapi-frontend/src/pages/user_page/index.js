import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";

function YourComponent() {
  const [age, setAge] = useState(0);
  const [feet, setFeet] = useState("1");
  const [inches, setInches] = useState("1");
  const [weightLbs, setWeightLbs] = useState(0);
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState(0);
  const [healthGoals, setHealthGoals] = useState("");

  const { state, dispatch } = useGlobalState();

  const handleInputChange = (setter) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
  };

  // Convert feet and inches to centimeters
  const heightInCm = () => {
    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    return Math.round(totalInches * 2.54);
  };

  // Convert pounds to kilograms
  const weightInKg = () => {
    return Math.round(parseInt(weightLbs) / 2.205);
  };

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

  const handleUpdate = async (column, value) => {
    try {
      // Convert values before sending to the database
      let convertedValue = value;

      if (column === "height") {
        convertedValue = heightInCm();
      } else if (column === "weight") {
        convertedValue = weightInKg();
      }

      const requestBody = {
        accept: "application/json",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/data/${state.user.sub}?column_name=${column}&column_value=${convertedValue}`,
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
        <button onClick={() => handleUpdate("age", age)}>Update Age</button>
      </div>
      <div>
        <label>Height (feet):</label>
        <select value={feet} onChange={handleInputChange(setFeet)}>
          {Array.from({ length: 6 }, (_, index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Height (inches):</label>
        <select value={inches} onChange={handleInputChange(setInches)}>
          {Array.from({ length: 11 }, (_, index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Weight (lbs):</label>
        <input value={weightLbs} onChange={handleInputChange(setWeightLbs)} />
      </div>
      <button onClick={() => handleUpdate("height", heightInCm())}>Update Height</button>
      <button onClick={() => handleUpdate("weight", weightInKg())}>Update Weight</button>
      <div>
        <label>Gender:</label>
        <input value={gender} onChange={handleInputChange(setGender)} />
        <button onClick={() => handleUpdate("gender", gender)}>Update Gender</button>
      </div>
      <div>
        <label>Activity Level:</label>
        <input value={activityLevel} onChange={handleInputChange(setActivityLevel)} />
        <button onClick={() => handleUpdate("activity_level", activityLevel)}>Update Activity Level</button>
      </div>
      <div>
        <label>Health Goals:</label>
        <input value={healthGoals} onChange={handleInputChange(setHealthGoals)} />
        <button onClick={() => handleUpdate("health_goals", healthGoals)}>Update Health Goals</button>
      </div>
    </>
  );
}

export default YourComponent;
