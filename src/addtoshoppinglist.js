


// import { useLocation } from "react-router-dom"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import HomePage from "../user/HomePage";
// const  DisplayRecipe=()=>{
// const naving=useNavigate();
// const {state}=useLocation();
// const selectRecipe= state;
// const dispatch = useDispatch();
// const userId = useSelector(state => state?.user.Id);

// const addtoshoppinglist=(x)=>{

//      axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: userId, Count: x.Count, Id: 2 })
//      .then(response => {
//        dispatch({ type: "ADD_PRODUCT", data: response.data })
//      })
//      .catch((error) => {
//        console.error((error.response.data));
//      });
//      // console.log("After Added: ",listdata)
//    };
  
//      /////להעתיק פונקצית מחיקה!!!!!!!!!!!!!!!
  

// return(<>
// <HomePage></HomePage>
//     <div>{state.Name} , {state.UserId} , {state.CategoryId}  , {state.Duration},{state.Difficulty} , {state.Description}
//     <img src= {state.Img}></img>
//     {state.Ingrident?.map((x)=> (
//          <div key={x.Name}>{x.Count},{x.Name}, {x.Type}  
//          <button onClick={()=>addtoshoppinglist(x)}>להוספה לרשימת הקניות</button>  </div>

//         ))}
//         {state.Instructions?.map((x)=> (
//          <div key={x}>{x}</div>
//         ))}

//    </div>
//    </>
// )}
// export default DisplayRecipe

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Input, Button, Typography, Paper } from "@mui/material";
import { ADD_PRODUCT } from "./store/action";

const Addtoshoppinglist = () => {
  const schema = yup.object({
    Name: yup.string().required(),
    UserId: yup.number().positive().integer().required(),
    Count: yup.number().required(),
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8080/api/bay`, data)
      .then((x) => {
        alert('👍');
        dispatch({ type: ADD_PRODUCT, data: x.data });
       
      })
      .catch((err) => console.error(err))
      .finally();
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("Name")} placeholder="Name of Product" />
        <p>{errors.Name?.message}</p>
        <Input {...register("Count")} placeholder="Count" />
        <p>{errors.Count?.message}</p>
        <Input {...register("UserId")} placeholder="UserId" />
        <p>{errors.UserId?.message}</p>
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </Paper>
  );
};

export default Addtoshoppinglist;