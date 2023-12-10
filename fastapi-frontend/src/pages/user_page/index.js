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
  const [healthGoals, setHealthGoals] = useState("");

  const { state, dispatch } = useGlobalState();
  const [checkedFields, setCheckedFields] = useState([]);

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

  const handleUpdateAll = async () => {
    // Prepare an object with all the fields to be updated
    const updatedFields = {
      age: checkedFields.includes("age") ? age : undefined,
      height: checkedFields.includes("height") ? heightInCm() : undefined,
      weight: checkedFields.includes("weight") ? weightInKg() : undefined,
      gender: checkedFields.includes("gender") ? gender : undefined,
      health_goals: checkedFields.includes("health_goals") ? healthGoals : undefined,
    };

    try {
      const requestBody = {
        accept: "application/json",
        data: updatedFields,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/data/${state.user.sub}`,
        requestBody
      );

      console.log("Backend Response for Update All:", response.data);
    } catch (error) {
      console.error("Error updating all fields:", error);
    }
  };

  const handleCheckboxChange = (field) => {
    setCheckedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  return (
    <>
      <div className="container d-flex flex-column gap-3 justify-content-center align-items-center">
        <div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
              value={age}
              onChange={handleInputChange(setAge)}
            />
            <button onClick={() => handleUpdate("age", age)}>Update Age</button>
          </div>
        </div>
        <div>
          <label>Height (feet):</label>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <select value={feet} onChange={handleInputChange(setFeet)} className="form-select">
              {Array.from({ length: 6 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button onClick={() => handleUpdate("height", heightInCm())}>Update Height</button>
          </div>
        </div>
        <div>
          <label>Height (inches):</label>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <select value={inches} onChange={handleInputChange(setInches)} className="form-select">
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button onClick={() => handleUpdate("height", heightInCm())}>Update Height</button>
          </div>
        </div>
        <div>
          <label>Weight (lbs):</label>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={weightLbs}
              onChange={handleInputChange(setWeightLbs)}
            />
            <button onClick={() => handleUpdate("weight", weightInKg())}>Update Weight</button>
          </div>
        </div>
        <div>
          <label>Gender:</label>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={handleInputChange(setGender)}
            />
            <button onClick={() => handleUpdate("gender", gender)}>Update Gender</button>
          </div>
        </div>
        <div>
          <label>Health Goals:</label>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={healthGoals}
              onChange={handleInputChange(setHealthGoals)}
            />
            <button onClick={() => handleUpdate("health_goals", healthGoals)}>
              Update Health Goals
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourComponent;
