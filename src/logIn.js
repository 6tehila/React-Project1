// import './LogIn.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios';
// import Header from './Header';
import { useNavigate } from 'react-router-dom';
// import reducer from './UserStore/Reducer'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { Grid, Paper, Typography, TextField, Box, Button } from '@mui/material';


const schema = yup.object({
    Username: yup.string(),
    Password: yup.string()
})

const LogIn = () => {
    const dispatch = useDispatch();
    const naving = useNavigate();

    const { register, handleSubmit } = useForm({
        yupResolver: schema
    });
    const onSubmit = (data) => {
        console.log(data)

        axios.post(`http://localhost:8080/api/user/login`, data)
            .then(x => {
                dispatch({ type: "SET_USER", data: x.data })
                axios.get("http://localhost:8080/api/recipe")
                    .then(response => {
                        const fetchData = response.data;
                        dispatch({ type: 'GET_RECIPES', data: fetchData })
                        naving("/header")
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                    })
            })
            .catch(error => {
                // Handle error response
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    alert(error.response.data);
                    naving("/signUp")
                }
            }
            )
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 400 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" component="div" gutterBottom>
                  Login
                </Typography>
                <TextField
                  {...register('Username')}
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  {...register('Password')}
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
    };

export default LogIn
