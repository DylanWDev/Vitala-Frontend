import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import Nav from "@/components/Nav/Nav";

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

  const handleBatchUpdate = async () => {
    checkedFields.forEach(async (field) => {
      switch (field) {
        case "age":
          await handleUpdate("age", age);
          break;
        case "height":
          await handleUpdate("height", heightInCm());
          break;
        case "weight":
          await handleUpdate("weight", weightInKg());
          break;
        case "gender":
          await handleUpdate("gender", gender);
          break;
        case "health_goals":
          await handleUpdate("health_goals", healthGoals);
          break;
        default:
          break;
      }
    });
  };

  return (
    <>
    <Nav/>
      <div className="container d-flex flex-column gap-3 justify-content-center align-items-center">
        <div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                checked={checkedFields.includes("age")}
                onChange={() => toggleCheckedField("age")}
              />
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
              value={age}
              onChange={handleInputChange(setAge)}
              style={{ width: "150px" }} // Set the width here
            />
          
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
                checked={checkedFields.includes("height")}
                onChange={() => toggleCheckedField("height")}
              />
            </div>
            <select
              value={feet}
              onChange={handleInputChange(setFeet)}
              className="form-select"
              style={{ width: "150px" }} // Set the width here
            >
              {Array.from({ length: 6 }, (_, index) => (
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
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                checked={checkedFields.includes("height")}
                onChange={() => toggleCheckedField("height")}
              />
            </div>
            <select
              value={inches}
              onChange={handleInputChange(setInches)}
              className="form-select"
              style={{ width: "150px" }} // Set the width here
            >
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </option>
              ))}
            </select>
          
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
                checked={checkedFields.includes("weight")}
                onChange={() => toggleCheckedField("weight")}
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={weightLbs}
              onChange={handleInputChange(setWeightLbs)}
              style={{ width: "150px" }} // Set the width here
            />
            
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
                checked={checkedFields.includes("gender")}
                onChange={() => toggleCheckedField("gender")}
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={handleInputChange(setGender)}
              style={{ width: "150px" }} // Set the width here
            />
            
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
                checked={checkedFields.includes("health_goals")}
                onChange={() => toggleCheckedField("health_goals")}
              />
            </div>
            <input
              type="text"
              className="form-control"
              value={healthGoals}
              onChange={handleInputChange(setHealthGoals)}
              style={{ width: "150px" }} // Set the width here
            />
            
          </div>
        </div>
        <div>
          <button onClick={handleBatchUpdate}>Update Checked Fields</button>
        </div>
      </div>
    </>
  );
}

export default YourComponent;
