
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const DeleteRecipe = (() => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const naving = useNavigate()
    useEffect(() => {
        axios.post(`http://localhost:8080/api/recipe/delete/${state}`)
            .then(res => {
                console.log("delete: ", res.data)
                dispatch({ type: "DELETE_RECIPE", payload: state })
                console.log("remove recipe")
                alert("remove recipe")
                naving("/getAllRecipies")

            })
            .catch(err => console.error(err))
            .finally()
    }, [])

})

export default DeleteRecipe