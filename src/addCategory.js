import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

const AddCaterory = () => {
    const schema = yup.object({
        Id: yup.string().min(4).required("enter valid id"),
        Name: yup.string().required("Enter valid name"),
    });

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const naving = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/category`, data);
            alert("קטגוריה נוספה בהצלחה");
            // Additional logic or navigation after successful submission
            naving("/getCategory")
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred while trying to add the category.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.entries(errors).map(([fieldName, error]) => (
                <p key={fieldName}>{error.message}</p>
            ))}
            <input {...register("Id")} type="text" placeholder="enter category id" />
            <input {...register("Name")} type="text" placeholder="enter category name" />
            <input type="submit" value="Add Category" />
        </form>
    );
};

export default AddCaterory;
