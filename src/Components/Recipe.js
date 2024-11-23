import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const [data, setData] = useState(null); // Initialize data as null
  const [loading, setLoading] = useState(true); // Add a loading state
  const { meal } = useParams(); // Get the meal ID from the URL

  // Use useEffect to handle side effects like fetching data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
        );
        const jsonData = await response.json();

        if (jsonData.meals && jsonData.meals.length > 0) {
          setData(jsonData.meals[0]); // Set the fetched data
        } else {
          setData(null); // Handle no results
        }
      } catch (error) {
        console.error("Error fetching the recipe:", error);
        setData(null); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipe();
  }, [meal]); // Re-run the effect if the meal ID changes

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show a loading message while data is being fetched
      ) : !data ? (
        <p>Not Found</p> // Show "Not Found" if no data is retrieved
      ) : (
        <div className="msg">
          <img src={data.strMealThumb} alt={data.strMeal} />
          <div className="info">
            <h1>Recipe Details</h1>
            <button>{data.strMeal}</button>
            <h3>Instructions:</h3>
            <p>{data.strInstructions}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;
