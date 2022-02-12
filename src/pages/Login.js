import React, { useState } from "react";
import { Typography, Paper, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/users/usersSlice";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();
  const loadingUI = useSelector((state) => state.users.loadingUI);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginUser({ userData, navigate }));
  };

  return (
    <Paper
      sx={{
        gridColumn: "col-start 2 / col-end 5",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Login</Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 3 }}
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={handleChange}
          value={values.email}
          margin="normal"
          variant="filled"
          id="email"
          required
          name="email"
          label="Email"
          placeholder="example@email.com"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          value={values.password}
          margin="normal"
          variant="filled"
          id="password"
          required
          name="password"
          type="password"
          label="Password"
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Button
            disabled={loadingUI}
            variant="contained"
            color="primary"
            type="submit"
          >
            {!loadingUI ? "Login" : "Loging in.."}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
