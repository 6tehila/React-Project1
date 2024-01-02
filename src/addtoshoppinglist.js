


import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../user/HomePage";
const  DisplayRecipe=()=>{
const naving=useNavigate();
const {state}=useLocation();
const selectRecipe= state;
const dispatch = useDispatch();
const userId = useSelector(state => state?.user.Id);

const addtoshoppinglist=(x)=>{

     axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: userId, Count: x.Count, Id: 2 })
     .then(response => {
       dispatch({ type: "ADD_PRODUCT", data: response.data })
     })
     .catch((error) => {
       console.error((error.response.data));
     });
     // console.log("After Added: ",listdata)
   };
  
     /////להעתיק פונקצית מחיקה!!!!!!!!!!!!!!!
  

return(<>
<HomePage></HomePage>
    <div>{state.Name} , {state.UserId} , {state.CategoryId}  , {state.Duration},{state.Difficulty} , {state.Description}
    <img src= {state.Img}></img>
    {state.Ingrident?.map((x)=> (
         <div key={x.Name}>{x.Count},{x.Name}, {x.Type}  
         <button onClick={()=>addtoshoppinglist(x)}>להוספה לרשימת הקניות</button>  </div>

        ))}
        {state.Instructions?.map((x)=> (
         <div key={x}>{x}</div>
        ))}

   </div>
   </>
)}
export default DisplayRecipe
