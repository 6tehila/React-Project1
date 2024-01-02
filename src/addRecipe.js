import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Fragment } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from '@mui/material';
import axios from "axios";




const schema = yup.object({
  // Id: yup.number().positive().integer().required(),
  Name: yup.string().required(),
  //  UserId: yup.string().required(),
  CategoryId: yup.string().required(),
  Img: yup.string().required(),
  Duration: yup.string().required(),
  Difficulty: yup.number().positive().integer().required(),
  Description: yup.string().required(),
  Ingrident: yup.array().of(
    yup.object().shape({
      Name: yup.string().required(),
      Count: yup.number().required(),
      Type: yup.string().nullable(),
    })),
  InstructionsArray: yup.array().of(
    yup.object().shape({
      Instruction: yup.string().required(),
    }),
  )

})
  .required();

export default function AddRecipes() {

  const { state } = useLocation();
  const userId = useSelector(state => state?.user?.Id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });
  const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Ingrident", // unique name for your Field Array
  });
  const { fields: fieldsInstuctions, append: appendInstructions, remove: removeInstructions } = useFieldArray({
    control,
    name: "InstructionsArray",
  });

  const onSubmit = (data) => {
    console.log("submit")
    if (state) {
      const recipe = {
        Id: state.Id,
        Name: data.Name,
        UserId: userId,
        CategoryId: data.CategoryId,
        Img: data.Img,
        Duration: data.Duration,
        Difficulty: data.Difficulty,
        Description: data.Description,
        Ingrident: data.Ingrident,
        Instructions: data.InstructionsArray
      }
      axios.post("http://localhost:8080/api/recipe/edit", recipe)
        .then(res => {
          console.log("edit: ", res.data)
          dispatch({ type: "EDIT_RECIPE", data: res.data })
          navigate("/getAllRecipies")
        })
        .catch(error => {
          console.error(error)
        })
    }
    else {
      const recipie = {
        Name: data.Name,
        UserId: userId,
        CategoryId: data.CategoryId,
        Img: data.Img,
        Duration: data.Duration,
        Difficulty: data.Difficulty,
        Description: data.Description,
        Ingrident: data.Ingrident,
        Instructions: data.InstructionsArray
      }
      axios.post('http://localhost:8080/api/recipe', recipie)
        .then(res => {
          console.log("add", res.data)
          dispatch({ type: "ADD_RECIPE", data: res.data })
          navigate("/getAllRecipies")
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <Fragment>
      <h3>Add-Recipes</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("Name")} slot="text" defaultValue={state ? state.Name : "Enter recipes name"} />
        <p>{errors.Name?.message}</p>
        <input {...register("CategoryId")} defaultValue={state ? state.CategoryId : "Enter recipes categoryId"} />
        <p>{errors.CategoryId?.message}</p>
        <input {...register("Img")} defaultValue={state ? state.Img : "Enter recipes Img"} />
        <p>{errors.Img?.message}</p>
        <input {...register("Duration")} defaultValue={state ? state?.Duration : "Enter recipes duration"} />
        <p>{errors.Duration?.message}</p>
        <input {...register("Difficulty")} defaultValue={state ? state?.Difficulty : "Enter recipes Difficulty"} />
        <p>{errors.Difficulty?.message}</p>
        <input {...register("Description")} defaultValue={state ? state?.Description : "Enter recipes Description"} />
        <p>{errors.Description?.message}</p>
        {fieldsIngrident.map((field, index) => (
          <>
            <hr />
            <input {...register(`Ingrident[${index}].Name`)} defaultValue={state ? state?.Ingrident[index].Name : "Name"} />
            <p>{errors.Ingrident?.[index]?.count?.message}</p>

            <input {...register(`Ingrident[${index}].Count`)} defaultValue={state ? state?.Ingrident[index].Count : "Count"} />
            <p>{errors.Ingrident?.[index]?.Count?.message}</p>

            <input {...register(`Ingrident[${index}].Type`)} defaultValue={state ? state?.Ingrident[index].Type : "Type"} />
            <p>{errors.Ingrident?.[index]?.Type?.message}</p>

            <button onClick={() => removeIngrident(index)}> DeleteProduct</button>
          </>
        ))}
        <button type="button" onClick={() => appendIngrident({})}>AddProduct</button>
        <hr />
        {console.log(state)}
        {fieldsInstuctions && fieldsInstuctions.map((field, index) => (
          <>
            <input {...register(`InstructionsArray[${index}].Instruction`)} defaultValue={state ? state?.Instructions[index] : "Instructions"} />
            <p>{errors.InstructionsArray?.[index]?.InstructionsArray?.message}</p>

            <button onClick={() => removeInstructions(index)}> RemovevInstructions</button>
          </>
        ))}
        <button onClick={() => appendInstructions({Instruction: ""})}> AddInstructions</button>
        <hr />

        <input type="submit" value="Submit" />
      </form>
    </Fragment>
  );

}