import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_SHOPPINGLIST } from "./store/action";



const ShoppingList = () => {
  const buylist = useSelector((state) => state.buylist);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navig = useNavigate()
  useEffect(() => {
    console.log(user.Id);
    axios
      .get(`http://localhost:8080/api/bay/${user.Id}`)
      .then((x) => {
        dispatch({ type: GET_SHOPPINGLIST, data: x.data });
      })
      .catch((err) => console.error(err))
      .finally();
  }, []);

  const editProduct = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8080/api/bay/edit", data)
      .then((x) => {
        dispatch({ type: "EDIT_PRODUCT", productObj: x.data });
      })
      .catch((err) => console.log(err))
      .finally();
  };
  const deleteProduct = (x) => {
    axios.post(`http://localhost:8080/api/bay/Delete/${x.Id}`)
      .then(response => {
        dispatch({ type: "DELETE_PRODUCT", data: x.Id })
        alert("the product deleted successfuly")
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }
  
  return (
    <Fragment>
  <div>

{buylist && buylist.map((item) => (
  <Paper elevation={3} key={item.Name} style={{ padding: "15px", margin: "10px" }}>
    <Typography variant="h6">
      {item.Name} - {item.Count}
    </Typography>
    <Button onClick={() => editProduct(item)}>Edit product</Button>
    <Button onClick={() => deleteProduct(item)}>Delete product</Button>
  
  </Paper>
))}

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => navig(`/addtoshoppinglist`, { state: { buylist } })}
      >
        הוספת מוצר
      </Button>
      </div>
    </Fragment>
  );
};

export default ShoppingList;


