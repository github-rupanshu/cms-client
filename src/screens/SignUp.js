import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [dob, setdob] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState({
    password: "",
    text: "",
  });

  const handleNameChange = (e) => {
    setname(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setphone(e.target.value);
  };

  const handleDOBChange = (e) => {
    e.preventDefault();
    setdob(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setpassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    setconfirmPassword({ ...confirmPassword, password: e.target.value });
  };
  useEffect(() => {
    if (confirmPassword.password !== password) {
      setconfirmPassword({ ...confirmPassword, text: "password dont match" });
    } else {
      setconfirmPassword({ ...confirmPassword, text: "" });
    }
  }, [confirmPassword.password, password ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res=await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/user/logIn",
      data: {
        phone,
        password,
      },
    });
    console.log(res);

  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={handleNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={phone}
                variant="outlined"
                required
                fullWidth
                id="phonr"
                label="Mobile Number"
                name="phone"
                autoComplete="phone"
                type="number"
                onChange={handlePhoneChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={dob}
                id="date"
                label="Birth Date"
                type="date"
                required
                //defaultValue="2000-01-01"
                className={classes.textField}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDOBChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword.password}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                helperText={confirmPassword.text}
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
