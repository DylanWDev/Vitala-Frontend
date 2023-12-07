import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";

function YourComponent() {
  const [age, setAge] = useState(0);
  const { state, dispatch } = useGlobalState();

  const handleAgeChange = (event) => {
    const inputAge = parseFloat(event.target.value);
    setAge(isNaN(inputAge) ? 0 : inputAge);
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

  const handleClickEvent = async () => {
    try {
      const requestBody = {
        accept: "application/json",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/data/${state.user.sub}?column_name=age&column_value=${age}`,
        requestBody
      );

      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Error posting data to the backend:', error);
    }
  };

  return (
    <>
      <div>
        <input value={age} onChange={handleAgeChange} />
        <button onClick={handleClickEvent}>Submit</button>
      </div>
    </>
  );
}

export default YourComponent;
