// // import React from "react";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { GET_USER } from "./store/action";
// // import { useSelector } from 'react-redux';
// // import { useLocation } from "react-router-dom";

// // // function GetBuyList({userId}) {
// // //     const dispatch = useDispatch();
// // //     const [data, setData] = useState([]);
// // //     // const naving = useNavigate();
// // //     useEffect(() => {
// // //         axios.get(`http://localhost:8080/api/buy/${userId}`)
        
// // //             .then(response => {
// // //                 const fetchData = response.data;
// // //                 setData(fetchData);
// // //                 dispatch({ type: 'GET_BUYLIST', data: fetchData })
// // //             })
// // //             .catch(error => {
// // //                 console.log('Error fetching data:', error);
// // //             })
// // //     }, [userId]
// // //     )
// // //     return (<>
// // //         <div>{data?.map((x) => (
// // //             <div key={x.Id}>
// // //                 {x.Name}
// // //                 {x.Count}
// // //                 {/* <img src={x.Img}></img> */}

// // //             </div>
// // //         ))}
// // //         </div></>
// // //     )
// // // }

// // // export default GetBuyList;


// // function GetBuyList() {
// //     const { state } = useLocation();

// //     const dispatch = useDispatch();
// //     const userId = useSelector(state => state.user?.id); // השימוש ב-?. יוודא שאם state.user לא מוגדר, אז userId יהיה undefined
// //     const [data, setData] = useState([]);

// //     useEffect(() => {
// //         if (userId) {
// //             axios.get(`http://localhost:8080/api/buy/${userId}`)
// //                 .then(response => {
// //                     const fetchData = response.data;
// //                     setData(fetchData);
// //                     dispatch({ type: 'GET_BUYLIST', data: fetchData });
// //                 })
// //                 .catch(error => {
// //                     console.log('Error fetching data:', error);
// //                 });
// //         }
// //     }, [userId, dispatch]);

// //     return (
// //         <>
// //             <div>{data?.map((x) => (
// //                 <div key={x.Id}>
// //                     {x.Name}
// //                     {x.Count}
// //                 </div>
// //             ))}
// //             </div>
// //         </>
// //     );
// // }

// // export default GetBuyList;

// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import React from "react";
// import { useState } from "react";
// import HomePage from "../user/HomePage";

// const ShoppingList = () => {
//   const dispatch = useDispatch();
//   const { state } = useLocation();
//   const selectProduct = state;
//   const userId = useSelector(state => state?.user.Id);
//   const listdata = useSelector((state) => state?.shoppingList)
//   const [checked, setChecked] = useState([]);
//   const [count, setCount] = useState(0);
//   const [editCountProduct, seteditCountProduct] = useState(0);


//   // useEffect(() => {
//   //   seteditCountProduct2()
//   // }, [count])
//   const deleteProduct = (x) => {
//     axios.post(`http://localhost:8080/api/bay/Delete/${x.Id}`)
//       .then(response => {
//         dispatch({ type: "DELETE_PRODUCT", data: x.Id })
//         alert("the product deleted successfuly")
//       })
//       .catch(error => {
//         console.log('Error fetching data:', error);
//       });
//   }
//   // const editProduct = (x) => {

//   //   axios.post(`http://localhost:8080/api/bay/edit`, { Name: x.Name, UserId: userId, Count: x.Count, Id: 2 })
//   //     .then(response => {

//   //       dispatch({ type: "DELETE_PRODUCT", data: x.Id })

//   //       dispatch({ type: "ADD_PRODUCT", data: response.data })
//   //     })
//   //     .catch((error) => {
//   //       console.error((error.response.data));
//   //     });
//   //   // console.log("After Added: ",listdata)

//   // }
//   const editProductCount = (x) => {
//     axios.post(`http://localhost:8080/api/bay/delete/${x.Id}`)
//       .then(response => {
// console.log("x.editCountProduct",editCountProduct)
//         dispatch({ type: "DELETE_PRODUCT", data: x.Id })
//         axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: userId, Count: editCountProduct, Id: 2 })
//           .then(response => {
//             console.log("response.data",response.data)
//             dispatch({ type: "ADD_PRODUCT", data: response.data })
//           })

//           .catch((error) => {
//             console.error((error.response.data));

//           })
//           .catch((error) => {
//             console.error((error.response.data));
//           })

//       });
//     // console.log("After Added: ",listdata)


//   }
//   const handleChangeCheckbox = (index, product) => {
//     const newChecked = [...checked];
//     if (newChecked[index]) {
//       { deleteProduct(product) }
//       newChecked.splice(index, 1);
//       setChecked(newChecked)
//     }
//     else {
//       newChecked[index] = !newChecked[index]
//       setChecked(newChecked);
//     }
//   }

//   return (
//     <>
//     <HomePage></HomePage>

//       {listdata?.map((x, index) => (
//         <div key={x.Id}>{x.Name}
//           {x.Count}
//           <button onClick={() => deleteProduct(x)}>מחיקה</button>
//           <input type="number" defaultValue="הכנס עדכון כמות" onChange={(e) => seteditCountProduct(e.target.value)} />
//           <button onClick={() => editProductCount(x)}>עדכון כמות </button>

//           {/* <button onClick={() => editProduct(x)}>עדכון הרשימה </button>  */}

//           <div>
//             <input type="checkbox"
//               checked={checked[index] || false}
//               onChange={() => handleChangeCheckbox(index, x)}
//               value="checked"
//             ></input>
//           </div>
//         </div>

//       ))
//       }
//     </>
//   )
// }
// export default ShoppingList



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

  const deleteProduct = (data) => {
    console.log(data)
    axios
      .post(`http://localhost:8080/api/bay/delete/${data.Id}`)
      .then((x) => {
        dispatch({ type: "DELETE_PRODUCT", x: data.Id });
      })
      .catch((err) => console.log(err))
      .finally();
  };
  // const deleteProduct = (productId) => {
  //   console.log(productId)
  //   axios
  //     .post(`http://localhost:8080/api/bay/delete/${productId}`)
  //     .then((response) => {
  //       dispatch({ type: "DELETE_PRODUCT", productId: productId });
  //     })
  //     .catch((err) => console.log(err))
  //     .finally();
  // };
  
  
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
    {/* <Button onClick={() => deleteProduct(item.Id)}>Delete product</Button> */}

  </Paper>
))}


      {/* <Button onClick={}>Add product</Button> */}
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


