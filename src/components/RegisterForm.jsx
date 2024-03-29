import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCall from "../hooks/useAuthCall";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  btnStyle,
  flexBoxRow,
  icon,
  registerContainer,
} from "../styles/globalStyles";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { register } = useAuthCall();
  const [visible, setVisible] = useState(true);
  const setPass = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();

  let loginScheme = object({
    email: string()
      .email("Please enter a valid email")
      .required("This field is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/\d+/, "There must be at least 1 number")
      .matches(/[a-z]/, "There must be at least one lower case")
      .matches(/[A-Z]/, "There must be at least one capital case")
      .matches(
        /[!,?{}><%&$#+-.]/,
        "There must be at least one spacial character"
      ),
    username: string()
      .min(2, "Username must at least 2 characters")
      .required("This field is required"),
  });

  return (
    <Box sx={registerContainer}>
      <Typography
        sx={{
          fontWeight: "700",
          fontFamily: "Ruwudu, serif",
          fontSize: "1.5rem",
          m: "auto",
        }}
      >
        REGISTER
      </Typography>

      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
          image: "",
          bio: "",
        }}
        validationSchema={loginScheme}
        onSubmit={(values, action) => {
          register({ ...values, password2: values.password });
          action.resetForm();
          action.setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  id="firstName"
                  label="Name"
                  name="firstName"
                  type="text"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  sx={{ width: "90%", margin: "0.5rem" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  type="text"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  sx={{ width: "90%", margin: "0.5rem" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  id="username"
                  type="text"
                  label="Username"
                  name="username"
                  required
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "90%", margin: "0.5rem" }}
                  error={touched.username && Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  required
                  variant="standard"
                  type="email"
                  sx={{ width: "90%", margin: "0.5rem" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="image"
                  label="Image"
                  placeholder="Image"
                  name="image"
                  variant="standard"
                  type="url"
                  required
                  sx={{ width: "90%", margin: "0.5rem" }}
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.image && Boolean(errors.image)}
                  helperText={errors.image}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  {visible ? (
                    <Box
                      sx={{
                        width: "95%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="password"
                        required
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          margin: "0.5rem",
                          width: "90%",
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={errors.password}
                      />
                      <VisibilityOffIcon
                        onClick={setPass}
                        sx={{ width: "10%" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "95%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="password"
                        required
                        label="Password"
                        name="password"
                        type="text"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          margin: "0.5rem",
                          width: "90%",
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={errors.password}
                      />
                      <VisibilityIcon onClick={setPass} sx={{ width: "10%" }} />
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="bio"
                  label="Bio"
                  name="bio"
                  variant="standard"
                  type="text"
                  required
                  sx={{ width: "90%", margin: "0.5rem" }}
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bio && Boolean(errors.bio)}
                  helperText={errors.bio}
                />
              </Grid>
            </Grid>
            <Button type="submit" sx={btnStyle}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Typography
        onClick={() => navigate("/login")}
        sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
      >
        Do you have an account?
      </Typography>

      <Box sx={flexBoxRow}>
          <Link to="https://github.com/Umutplvn">
            
            <GitHubIcon sx={icon} />
          </Link>
          <Link to="https://www.linkedin.com/in/umut-pehlivan-817b28174/">
            
            <LinkedInIcon sx={icon} />
          </Link>
          <Link to="https://www.instagram.com/umutpehlivan35/">
            
            <InstagramIcon sx={icon} />
          </Link>
        </Box>
    </Box>
  );
};

export default RegisterForm;
