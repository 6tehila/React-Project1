import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "./store/action";
// import RecipeIcon from '@mui/icons-material/Recipe';

function GetCategory() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const recipies = useSelector(state => state?.resipes)
    // const naving = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/api/category")
            .then(response => {
                const fetchData = response.data;
                setData(fetchData);
                dispatch({ type: 'GET_CATEGORY', data: fetchData })
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            })
    }, [])

    const handleCategoryChange = (event) => {
        const selected = event.target.value
        setSelectedCategory(selected);
        console.log(selected)
        displayFiltered()
    }
    // const displayFiltered = () => {
    //     // return (recipies.map((recipe) => {
    //     //     {
    //     //         recipe.CategoryId == selectedCategory && <div>
    //     //             {recipe.Name}
    //     //         </div>
    //     //     }
    //     // }))
    //     return recipe.CategoryId === selectedCategory && (
    //         <div key={recipe.Id}>{recipe.Name}</div>
    //       );
    // }
    const displayFiltered = () => {
        return (
          <div>
            {recipies.map((recipe) => {
              // השוואה בין מזהה הקטגוריה שנבחרה למזהה הקטגוריה של המתכון
              return recipe.CategoryId === selectedCategory && (
                <div key={recipe.Id}>{recipe.Name}</div>
              );
            })}
          </div>
        );
      };
      
    return (<>
        <select onChange={handleCategoryChange}>
            {data.map((category) => (
                <option key={category.Id} value={category.Id}> {category.Name}</option>
            ))}
        </select>

    </>
    )
}

export default GetCategory
