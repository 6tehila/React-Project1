import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as actionsName from './store/action'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
const schema = yup.object({
  //הטופס לא נשלח
  Username: yup.string().required("enter username"),
  Password: yup.string().required("enter password"),
  Name: yup.string().required("eneter name"),
  Phone: yup.string().required("eneter phone"),
  Email: yup.string().email({ domain: ["example.com"], }).required("enete email"),
  Tz: yup.string().required("eneter tz")

}).required();

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = (data) => {
    console.log("onsubmit: ");

    console.log("data: ", data);
    axios.post('http://localhost:8080/api/user/sighin', data)
      .then((res) => {
        dispatch({ type: "SET_USER", data: res.data })

        axios.get("http://localhost:8080/api/recipe")
          .then(response => {
            const fetchData = response.data;
            dispatch({ type: 'GET_RECIPES', data: fetchData })
          })
          .catch(error => {
            console.log('Error fetching data:', error);
          })

        alert("welcome our cookBook");

        navigate('/header');
      }).catch(res => alert("the user exsit"))
  }
  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm({ // פונקציות ונתונים שימושיים מהטופס.
    resolver: yupResolver(schema), // יוצרת טופס ומחברת לו את סכימת הוולידציה.
  })
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          טופס הרשמה
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%', // עשוי להתאים לרוחב של הקומפוננטה
            mt: 3,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="שם משתמש"
            {...register("Username")}
          />
          <p>{errors.Username?.message}</p>

          <TextField
            margin="normal"
            fullWidth
            label="סיסמה"
            type="password"
            {...register("Password")}
          />
          <p>{errors.Password?.message}</p>

          <TextField
            margin="normal"
            fullWidth
            label="שם"
            {...register("Name")}
          />
          <p>{errors.Name?.message}</p>

          <TextField
            margin="normal"
            fullWidth
            label="טלפון"
            {...register("Phone")}
          />
          <p>{errors.Phone?.message}</p>

          <TextField
            margin="normal"
            fullWidth
            label="אימייל"
            type="email"
            {...register("Email")}
          />
          <p>{errors.Email?.message}</p>

          <TextField
            margin="normal"
            fullWidth
            label="תעודת זהות"
            {...register("Tz")}
          />
          <p>{errors.Tz?.message}</p>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            שליחה
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
