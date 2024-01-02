import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import DeleteRecipe from "./deleteRecipe";
import axios from 'axios';
import React, { useEffect } from 'react';

const DetailsRecipe = ({ ingredient }) => {
    const { state } = useLocation();
    const Id = state.Id;
    const userId = useSelector((state) => state?.user?.Id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            const addProductToServer = async () => {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/bay",
                        {
                            buylist: [
                                {
                                    name: ingredient.name,
                                    count: ingredient.count,
                                    type: ingredient.type,
                                },
                            ],
                            userId,
                        }
                    );

                    console.log(response.data);
                } catch (error) {
                    console.error("Error adding product:", error);
                }
            };

            addProductToServer(ingredient);
        }
    }, [userId, ingredient]);

    const addToCart = (ingredient) => {
        dispatch({ type: 'ADD_TO_CART', ingredient });
    };
    const editCart = () => {
        navigate("/editCart");
    };
    return (
        <div>
            <h3>Details-Recipe</h3>
            <div>
                <h3>{state.Name}</h3>
                <img src={state.Img} alt={state.Name}></img>
                <h6> זמן ההכנה :{state.Duration}</h6>
                <h6>{state.Description}</h6>
                <h6> דרגת קושי :{state.Difficulty}</h6>
                <div>
                    {state.Ingrident.map((i) => (
                        <div key={i.Id}>
                            <h4>{i.Name}: {i.Count} {i.Type}</h4>
                            <button onClick={() => addToCart(i)}>הוספה לסל קניות</button>
                        </div>
                    ))}
                </div>
                <div>
                    {state.Instructions.map((i) => (
                        <h5 key={i.Id}>{i}</h5>
                    ))}
                </div>
            </div>
            {/* <button onClick={() => onDelete(state.Id)} disabled={myId!==state.UserId}>Delete</button>

         <button onClick={() => nav_edit(state)}disabled={myId!==state.UserId} >Edit</button> */}
            <button onClick={editCart} type="button" >עריכת סל קניות</button>
            {<button onClick={() => navigate(`/deleteRecipe `, { state: Id })} type="button" > מחיקת מתכון</button>}
            {/* {<button onClick={() => navigate(`/editRecipe `,{ state: Id})} type="button" disabled={Id!==state.UserId}>עריכת  מתכון</button>} */}
            {<button onClick={() => navigate(`/addRecipe `, { state: state })} type="button" disabled={userId != state.UserId}>עריכת  מתכון</button>}

        </div>
    );
};

export default DetailsRecipe;

