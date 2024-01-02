import logo from './logo.svg';
import './App.css';
import {Route,Routes}from 'react-router-dom'
import Enterance from './enterance';
import LogIn from './logIn';
import SignUp from './signUp';
import GetAllRecipies from './getAllRecipes';
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import GetCategory from './getCategory';
import AddCategory from './addCategory'
import AddRecipe from './addRecipe';
import DeleteRecipe from './deleteRecipe';
import DetailsRecipe from './detailsRecipe ';
import ShoppingList from './shoppingList';


function App() {
  const user = useSelector(state => state?.user)
  const navig = useNavigate()
  useEffect(() => {
    if (user) {

      navig('/header')
    }
    else {
      navig('/login')
    }

  }, [user])
  

  return (
    <div className="App">
      <h1>Hi my project</h1>
     
      
      <Routes>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/getAllRecipies" element={<GetAllRecipies/>}/>
      <Route path="/header" element={<Header/>}/>
      <Route path="/getCategory" element={<GetCategory/>}/>
      <Route path="/addCategory" element={<AddCategory/>}/>
      <Route path="/addRecipe" element={<AddRecipe/>}/>
      <Route path="/deleteRecipe" element={<DeleteRecipe/>}/>
      <Route path="/detailsRecipe" element={< DetailsRecipe/>}/>
      <Route path="/shoppingList" element={< ShoppingList/>}/>
    

      


      </Routes>
    </div>
  );
}

export default App;
