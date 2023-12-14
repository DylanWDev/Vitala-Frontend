import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import Nav from "@/components/Nav/Nav";
import toast, { Toaster } from 'react-hot-toast';

function YourComponent() {
  const [age, setAge] = useState(0);
  const [feet, setFeet] = useState("1");
  const [inches, setInches] = useState("1");
  const [weightLbs, setWeightLbs] = useState(0);
  const [gender, setGender] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const [checkedFields, setCheckedFields] = useState([]);
  const { state, dispatch } = useGlobalState();

  const handleInputChange = (setter) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
  };

  const GENDER_OPTIONS = ["Male", "Female"];
  const HEALTH_GOAL_OPTIONS = ["Maintain", "Gain", "Lose"];

  const toggleCheckedField = (field) => {
    setCheckedFields((prevCheckedFields) =>
      prevCheckedFields.includes(field)
        ? prevCheckedFields.filter((item) => item !== field)
        : [...prevCheckedFields, field]
    );
  };

  const heightInCm = () => {
    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    return Math.round(totalInches * 2.54);
  };

  const weightInKg = () => {
    return Math.round(parseInt(weightLbs) / 2.205);
  };

  const kgToLbs = (weightInKg) => {
    return Math.round(weightInKg * 2.205);
  };

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = jwtDecode(userData);
        console.log("User data:", user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });

        // Fetch user data from the backend using the user's sub (subject) ID
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/users/${user.sub}`
          );
          const userData = response.data;
          setAge(userData.age || 0);
          setFeet(userData.height ? Math.floor(userData.height / 30.48) : "1");
          setInches(
            userData.height ? Math.round((userData.height % 30.48) / 2.54) : "1"
          );
          setWeightLbs(userData.weight ? kgToLbs(userData.weight) : 0);
          setGender(userData.gender || "");
          setHealthGoals(userData.health_goals || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    getUserFromLocalStorage();
  }, [dispatch]);

  const handleUpdate = async (column, value) => {
    try {
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
      // toast.success("Saved Successfully")
    } catch (error) {
      console.error(`Error updating ${column}:`, error);
    }
  };

  const handleBatchUpdate = async () => {
    const updatePromises = [];
    // Use forEach to iterate over all fields without checking if they are included in checkedFields
    ["age", "height", "weight", "gender", "health_goals"].forEach((field) => {
      switch (field) {
        case "age":
          updatePromises.push(handleUpdate("age", age));
          break;
        case "height":
          updatePromises.push(handleUpdate("height", heightInCm()));
          break;
        case "weight":
          updatePromises.push(handleUpdate("weight", weightInKg()));
          break;
        case "gender":
          updatePromises.push(("gender", gender));
          break;
        case "health_goals":
          updatePromises.push(("health_goals", healthGoals));
          break;
        default:
          break;
      }
    });

    try {
      await Promise.all(updatePromises);
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Error updating fields:", error);
    }

  };
  
  return (
    <div style={{ backgroundColor: "#212223", minHeight: "100vh" }}>
      <Nav activeLink="user" />
      <div className="container d-flex flex-column gap-2 justify-content-center align-items-center p-5 fw-bold mt-5" style={{ backgroundColor: "#2f3031", color: "white" }}>
        {/* ... (existing code) */}
        <div>
          <label>Age:</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Text input"
              value={age}
              onChange={handleInputChange(setAge)}
              style={{ width: "150px" }}
            />
          </div>
        </div>
        <div>
          <label>Height (feet):</label>
          <div className="input-group mb-3">
            <select
              value={feet}
              onChange={handleInputChange(setFeet)}
              className="form-select"
              style={{ width: "150px" }}
            >
              {Array.from({ length: 8 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Height (inches):</label>
          <div className="input-group mb-3">
            <select
              value={inches}
              onChange={handleInputChange(setInches)}
              className="form-select"
              style={{ width: "150px" }}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Weight (lbs):</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={weightLbs}
              onChange={handleInputChange(setWeightLbs)}
              style={{ width: "150px" }}
            />
          </div>
        </div>
        <div>
          <label>Gender:</label>
          <div className="input-group mb-3">
            <select
              value={gender}
              onChange={handleInputChange(setGender)}
              className="form-select"
              style={{ width: "150px" }}
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Health Goals:</label>
          <div className="input-group mb-3">
            <select
              value={healthGoals}
              onChange={handleInputChange(setHealthGoals)}
              className="form-select"
              style={{ width: "150px" }}
            >
              {HEALTH_GOAL_OPTIONS.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleBatchUpdate} style={{ width: "150px", backgroundColor: "#61cc61", border: "none", boxShadow: "0 0 8px rgba(114, 238, 114, 0.8)" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
