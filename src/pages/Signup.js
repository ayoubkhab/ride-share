import React, { useState } from "react";
import { Typography, Paper, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/users/usersSlice";

const Signup = () => {
  const initialValues = {
    displayName: "",
    birthDate: "",
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
    const newUserData = {
      displayName: values.displayName,
      birthDate: values.birthDate,
      email: values.email,
      password: values.password,
    };
    dispatch(signupUser({ newUserData, navigate }));
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
      <Typography variant="h3">Sign Up</Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 3 }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{
              flexGrow: 1,
            }}
            onChange={handleChange}
            value={values.displayName}
            margin="none"
            variant="filled"
            id="displayName"
            required
            name="displayName"
            label="Display Name"
          />
        </Box>
        <TextField
          onChange={handleChange}
          value={values.birthDate}
          margin="normal"
          variant="filled"
          id="birthDate"
          required
          name="birthDate"
          label="Date of birth"
          placeholder="dd/mm/yyyy"
        />
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
            {!loadingUI ? "Sign Up" : "Signing up.."}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Signup;
