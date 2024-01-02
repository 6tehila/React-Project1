import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as actionsName from './store/action'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const schema = yup.object({
  //התופס לא נשלח
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input placeholder="Username" {...register("Username")} />
        <p>{errors.username?.message}</p>

        <input placeholder="password" {...register("Password")} />
        <p>{errors.password?.message}</p>

        <input placeholder="name" {...register("Name")} />
        <p>{errors.name?.message}</p>

        <input placeholder="phone" {...register("Phone")} />
        <p>{errors.phone?.message}</p>

        <input placeholder="email" {...register("Email")} />
        <p>{errors.email?.message}</p>

        <input placeholder="tz" {...register("Tz")} />
        <p>{errors.tz?.message}</p>

        <input type="submit" />
      </form>
    </>)
}
export default SignUp;