import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "./store/action";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GetAllRecipies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.resipes);

  return (
    <>
      <div style={recipeListContainerStyle}>
        {data?.map((x) => (
          <div key={x.Id} style={recipeContainerStyle}>
            <h3 style={recipeNameStyle}>{x.Name}</h3>
            <div style={imageContainerStyle}>
              <img src={x.Img} alt={x.Name} style={recipeImageStyle} />
            </div>
            <button onClick={() => navigate(`/detailsRecipe`, { state: x })} type="button" style={buttonStyle}>
              פרטי מתכון
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

const recipeListContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  marginTop: '20px',
};

const recipeContainerStyle = {
  border: '1px solid #000',
  padding: '10px',
  margin: '10px',
  borderRadius: '8px',
  textAlign: 'center',
  width: '30%', // Display three recipes in a row
};

const recipeNameStyle = {
  margin: '5px 0',
};

const imageContainerStyle = {
  padding: '10px',
  borderRadius: '10px',
  height: '200px', // Set a fixed height for all images
  overflow: 'hidden',
};

const recipeImageStyle = {
  maxWidth: '100%', // Full width for the image
  height: '100%', // Full height for the image
  borderRadius: '10px',
  objectFit: 'cover', // Maintain aspect ratio and cover the container
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default GetAllRecipies;
