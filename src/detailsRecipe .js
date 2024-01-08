import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import DeleteRecipe from "./deleteRecipe";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DetailsRecipe = ({ ingredient }) => {
    const { state } = useLocation();
    const Id = state.Id;
    const userId = useSelector((state) => state?.user?.Id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
const [buttonAnimation, setButtonAnimation] = useState(false);
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
  // פונקציה שמפיקה את העמוד להדפסה
  const printRecipe = () => {
    window.print();
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
                            {/* <button onClick={() => addToCart(i)}>הוספה לסל קניות</button> */}
                            <button
    style={{
        backgroundColor:  '#008CBA',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        transform: buttonAnimation ? 'scale(0.95)' : 'scale(1)',
        borderRadius: '5px', // כדי להוסיף פינות מעוגלות
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // כדי להוסיף צל
    }}
    onClick={() => addToCart(i)}
>
    הוספה לסל קניות
</button>

                        </div>
                    ))}
                </div>
                <div>
                    {state.Instructions.map((i) => (
                        <h5 key={i.Id}>{i}</h5>
                    ))}
                </div>
            </div>
            <button
                style={{
                    backgroundColor: '#008CBA',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    transform: buttonAnimation ? 'scale(0.95)' : 'scale(1)',
                }}
                onClick={editCart}
                type="button"
            >
                עריכת סל קניות
            </button>
            <button
                style={{
                    backgroundColor: '#f44336',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    transform: buttonAnimation ? 'scale(0.95)' : 'scale(1)',
                }}
                onClick={() => navigate(`/deleteRecipe `, { state: Id })}
                type="button"
            >
                מחיקת מתכון
            </button>
            <button
                style={{
                    backgroundColor: '#555555',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    transform: buttonAnimation ? 'scale(0.95)' : 'scale(1)',
                }}
                onClick={() => navigate(`/addRecipe `, { state: state })}
                type="button"
                disabled={userId != state.UserId}
            >
                עריכת מתכון
            </button>
            <button
                style={{
                    backgroundColor: '#008CBA',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    transform: buttonAnimation ? 'scale(0.95)' : 'scale(1)',
                }}
                onClick={printRecipe}
                type="button"
            >
                הדפסת מתכון
            </button>
        </div>
    );
};

export default DetailsRecipe;

